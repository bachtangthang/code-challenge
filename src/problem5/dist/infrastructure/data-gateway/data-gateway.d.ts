import { BookEntity } from "src/entities";
import { mongoProvider } from "src/infrastructure/data-gateway/providers/mongo/mongodb";
import { CreateBookPayload, GetBookPayload, ListBooksPayload, UpdateBookPayload } from "src/infrastructure/data-gateway/providers/mongo/methods/book.method";
export declare class DataGateway {
    client: {
        mongoDb?: mongoProvider;
    };
    CreateBook: (payload: CreateBookPayload, metadata: any) => Promise<BookEntity>;
    CountBooks: ({ condition, filter }: any, metadata: any) => Promise<number>;
    UpdateBook: ({ condition, payload }: UpdateBookPayload, metadata: any) => Promise<BookEntity>;
    ListBooks: ({ condition, filter, pagination, pick }: ListBooksPayload, metadata: any) => Promise<BookEntity[]>;
    DeleteBook: ({ condition }: any, metadata: any) => Promise<void>;
    GetBook: ({ condition, pick }: GetBookPayload, metadata: any) => Promise<BookEntity>;
    DataGateway: any;
    /**
     * Initialize DataGateway with MongoDB and cache clients.
     * @param options.client.mongoDb - MongoDB provider.
     */
    constructor(options: {
        client: {
            mongoDb: mongoProvider;
        };
    });
}
//# sourceMappingURL=data-gateway.d.ts.map