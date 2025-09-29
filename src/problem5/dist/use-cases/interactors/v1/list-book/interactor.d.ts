import { BookGenreEnum, BookStatusEnum } from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";
import { Options } from "src/entities/options.entity";
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
export interface ListBooksResponse {
    books: BookResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface BookStatisticsResponse {
    totalBooks: number;
    availableBooks: number;
    outOfStockBooks: number;
    discontinuedBooks: number;
    genreDistribution: Record<string, number>;
}
export declare class ListBooks {
    private readonly dataGateway;
    constructor(options: Options);
    execute(request: ListBooksRequest): Promise<ListBooksResponse>;
    private mapEntityToResponse;
}
//# sourceMappingURL=interactor.d.ts.map