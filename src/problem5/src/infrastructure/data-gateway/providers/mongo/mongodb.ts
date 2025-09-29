import { connect, connection, set, Connection, disconnect } from "mongoose";

import { Book } from "./schemas/book.schema";

export class mongoProvider {
  Book: typeof Book;
  mongoUri: string;
  name: string;
  conn: Connection | null;

  constructor(options: { mongoUri: string; name: string }) {
    this.conn = null;
    this.mongoUri = options.mongoUri;
    this.name = options.name;
    this.Book = Book;
  }

  async connect() {
    await connect(this.mongoUri);
    this.conn = connection;
  }

  async disconnect() {
    if (this.conn) {
      await disconnect();
      this.conn = null;
    }
  }
}
