import { DataGateway } from "src/configuration/infrastructure.config";
import { BookEntity } from "src/entities";
import {
  BookGenreEnum,
  BookStatusEnum,
} from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/interface/options.interface";

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  price?: number;
  status?: BookStatusEnum;
  description?: string;
  publisher?: string;
  page_count?: number;
}

export class UpdateBook {
  private readonly dataGateway: DataGateway;
  constructor(options: Options) {
    if (!options.infra.dataGateway) {
      throw new Error("DataGateway is required");
    }
    this.dataGateway = options.infra.dataGateway;
  }

  async execute(id: string, request: UpdateBookRequest): Promise<BookEntity> {
    try {
      // Validate inputs
      if (!id?.trim()) {
        throw new Error("Book ID is required");
      }

      this.validateUpdateRequest(request);

      // Update the book
      const book = await this.dataGateway.UpdateBook(
        {
          condition: { id },
          payload: request,
        },
        {}
      );

      return book;
    } catch (error: any) {
      throw new Error(
        `Failed to update book: ${error?.message || "Unknown error"}`
      );
    }
  }

  private validateUpdateRequest(request: UpdateBookRequest): void {
    if (request.title !== undefined && !request.title?.trim()) {
      throw new Error("Title cannot be empty");
    }
    if (request.author !== undefined && !request.author?.trim()) {
      throw new Error("Author cannot be empty");
    }
    if (
      request.price !== undefined &&
      (request.price < 0 || isNaN(request.price))
    ) {
      throw new Error("Price must be a non-negative number");
    }
    if (
      request.page_count !== undefined &&
      (request.page_count < 1 || isNaN(request.page_count))
    ) {
      throw new Error("Page count must be a positive number");
    }
  }
}
