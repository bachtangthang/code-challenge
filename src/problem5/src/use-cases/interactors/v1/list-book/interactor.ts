import { DataGateway } from "src/configuration/infrastructure.config";
import { BookEntity } from "src/entities";
import {
  BookGenreEnum,
  BookStatusEnum,
} from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/interface/options.interface";

export interface ListBooksRequest {
  page?: number;
  limit?: number;
  genre?: BookGenreEnum;
  status?: BookStatusEnum;
  author?: string;
  publisher?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class ListBooks {
  private readonly dataGateway: DataGateway;
  constructor(options: Options) {
    if (!options.infra.dataGateway) {
      throw new Error("DataGateway is required");
    }
    this.dataGateway = options.infra.dataGateway;
  }

  async execute(request: ListBooksRequest): Promise<{
    books: BookEntity[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      // Set defaults
      const page = Math.max(1, request.page || 1);
      const limit = Math.min(100, Math.max(1, request.limit || 10));

      // Build condition
      const condition: any = {};

      if (request.genre) condition.genre = request.genre;
      if (request.status) condition.status = request.status;
      if (request.author) condition.author = request.author;
      if (request.publisher) condition.publisher = request.publisher;

      // Handle price range
      if (request.minPrice !== undefined || request.maxPrice !== undefined) {
        condition.price_range = {};
        if (request.minPrice !== undefined)
          condition.price_range.min = request.minPrice;
        if (request.maxPrice !== undefined)
          condition.price_range.max = request.maxPrice;
      }

      let books: BookEntity[];

      if (request.search) {
        // Use search functionality - add search term to condition
        condition.$text = { $search: request.search };
        books = await this.dataGateway.ListBooks(
          {
            condition,
            pagination: { page, limit },
          },
          {}
        );
      } else {
        // Use regular list functionality
        books = await this.dataGateway.ListBooks(
          {
            condition,
            pagination: { page, limit },
          },
          {}
        );
      }

      // Get total count for pagination
      const total = await this.dataGateway.CountBooks({ condition }, {});
      const totalPages = Math.ceil(total / limit);

      return {
        books: books,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error: any) {
      throw new Error(
        `Failed to list books: ${error?.message || "Unknown error"}`
      );
    }
  }
}
