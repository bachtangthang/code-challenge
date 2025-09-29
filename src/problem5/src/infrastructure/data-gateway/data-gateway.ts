import { BookEntity } from "src/entities";
import { mongoProvider } from "src/infrastructure/data-gateway/providers/mongo/mongodb";
import {
  CountBooks,
  CreateBook,
  CreateBookPayload,
  GetBook,
  GetBookPayload,
  ListBooks,
  ListBooksPayload,
  UpdateBook,
  UpdateBookPayload,
  DeleteBook,
} from "src/infrastructure/data-gateway/providers/mongo/methods/book.method";

export class DataGateway {
  client: {
    mongoDb?: mongoProvider;
  };

  // --- Book methods ---
  CreateBook!: (
    payload: CreateBookPayload,
    metadata: any
  ) => Promise<BookEntity>;
  CountBooks!: ({ condition, filter }: any, metadata: any) => Promise<number>;
  UpdateBook!: (
    { condition, payload }: UpdateBookPayload,
    metadata: any
  ) => Promise<BookEntity>;
  ListBooks!: (
    { condition, filter, pagination, pick }: ListBooksPayload,
    metadata: any
  ) => Promise<BookEntity[]>;
  DeleteBook!: ({ condition }: any, metadata: any) => Promise<void>;
  GetBook!: (
    { condition, pick }: GetBookPayload,
    metadata: any
  ) => Promise<BookEntity>;
  DataGateway: any;
  /**
   * Initialize DataGateway with MongoDB and cache clients.
   * @param options.client.mongoDb - MongoDB provider.
   */
  constructor(options: { client: { mongoDb: mongoProvider } }) {
    this.client = options.client;
  }
}

// --- Method assignments ---
// Each method below is assigned from its implementation file for modularity and maintainability.

DataGateway.prototype.CreateBook = CreateBook;
DataGateway.prototype.CountBooks = CountBooks;
DataGateway.prototype.UpdateBook = UpdateBook;
DataGateway.prototype.GetBook = GetBook;
DataGateway.prototype.ListBooks = ListBooks;
DataGateway.prototype.DeleteBook = DeleteBook;
