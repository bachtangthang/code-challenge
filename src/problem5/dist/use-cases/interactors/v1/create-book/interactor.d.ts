import { BookGenreEnum, BookStatusEnum } from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/entities/options.entity";
export interface CreateBookRequest {
    title: string;
    author: string;
    isbn: string;
    genre: BookGenreEnum;
    status?: BookStatusEnum;
    price: number;
    publication_date: Date;
    description?: string;
    publisher?: string;
    page_count?: number;
}
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
export declare class CreateBook {
    private readonly dataGateway;
    constructor(options: Options);
    execute(request: CreateBookRequest): Promise<BookResponse>;
    private validateCreateBookRequest;
    private mapEntityToResponse;
}
//# sourceMappingURL=interactor.d.ts.map