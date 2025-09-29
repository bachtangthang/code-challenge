import { Options } from "src/entities/options.entity";
import { BookGenreEnum, BookStatusEnum } from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
export interface BookResponse {
    id: string;
    title: string;
    author: string;
    isbn: string;
    genre: BookGenreEnum;
    status: BookStatusEnum;
    price: number;
    publication_date: Date;
    description?: string;
    publisher?: string;
    page_count?: number;
    create_time: Date;
    update_time: Date;
}
export declare class GetBook {
    private readonly dataGateway;
    constructor(options: Options);
    getById(id: string): Promise<BookResponse>;
    getByIsbn(isbn: string): Promise<BookResponse>;
    private mapEntityToResponse;
}
//# sourceMappingURL=interactor.d.ts.map