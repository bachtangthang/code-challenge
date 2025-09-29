import { DataGateway } from "src/configuration/infrastructure.config";
import { BookEntity } from "src/entities";
import {
  BookGenreEnum,
  BookStatusEnum,
} from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/interface/options.interface";

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: BookGenreEnum;
  status?: BookStatusEnum;
  price: number;
  publication_date: Date;
  description?: string;
  publisher?: string;
  page_count?: number;
}

export class CreateBook {
  private readonly dataGateway: DataGateway;
  constructor(options: Options) {
    if (!options.infra.dataGateway) {
      throw new Error("DataGateway is required");
    }
    this.dataGateway = options.infra.dataGateway;
  }

  async execute(request: CreateBookRequest): Promise<BookEntity> {
    try {
      // Validate the request
      this.validateCreateBookRequest(request);

      // Create the book
      return await this.dataGateway.CreateBook(request, {});
    } catch (error: any) {
      throw new Error(
        `Failed to create book: ${error?.message || "Unknown error"}`
      );
    }
  }

  private validateCreateBookRequest(request: CreateBookRequest): void {
    if (!request.title?.trim()) {
      throw new Error("Title is required");
    }
    if (!request.author?.trim()) {
      throw new Error("Author is required");
    }
    if (!request.genre) {
      throw new Error("Genre is required");
    }
    if (request.price == null || request.price < 0) {
      throw new Error("Price must be a non-negative number");
    }
    if (!request.publication_date) {
      throw new Error("Publication date is required");
    }
  }
}
