import { BookGenreEnum, BookStatusEnum } from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/entities/options.entity";
export interface UpdateBookRequest {
    title?: string;
    author?: string;
    price?: number;
    status?: BookStatusEnum;
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
export declare class UpdateBook {
    private readonly dataGateway;
    constructor(options: Options);
    execute(id: string, request: UpdateBookRequest): Promise<BookResponse>;
    private validateUpdateRequest;
    private mapEntityToResponse;
}
//# sourceMappingURL=interactor.d.ts.map