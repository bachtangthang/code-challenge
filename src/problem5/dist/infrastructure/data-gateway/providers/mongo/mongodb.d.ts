import { Connection } from "mongoose";
import { Book } from "./schemas/book.schema";
export declare class mongoProvider {
    Book: typeof Book;
    mongoUri: string;
    name: string;
    conn: Connection | null;
    constructor(options: {
        mongoUri: string;
        name: string;
    });
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=mongodb.d.ts.map