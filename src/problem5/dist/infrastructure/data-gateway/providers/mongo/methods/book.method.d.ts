import { BookEntity } from "../../../../../entities/book.entity";
import { BookGenreEnum, BookStatusEnum } from "../schemas/book.schema";
export interface Pagination {
    page: number;
    limit: number;
}
export interface Filter {
    [key: string]: any;
}
export type CountBooksCondition = {
    status?: BookStatusEnum;
    genre?: BookGenreEnum;
    author?: string;
};
export type CreateBookPayload = {
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
};
export type UpdateBookPayload = {
    condition?: {
        id?: string;
        isbn?: string;
    };
    payload?: {
        title?: string;
        author?: string;
        price?: number;
        status?: BookStatusEnum;
        description?: string;
        publisher?: string;
        page_count?: number;
        update_time?: Date | string;
    };
};
export type GetBookPayload = {
    condition?: {
        id?: string;
        isbn?: string;
        title?: string;
        author?: string;
        genre?: BookGenreEnum;
        status?: BookStatusEnum;
    };
    pick?: string[];
};
export type ListBooksPayload = {
    condition?: {
        genre?: BookGenreEnum;
        status?: BookStatusEnum;
        author?: string;
        publisher?: string;
        price_range?: {
            min?: number;
            max?: number;
        };
        publication_year?: number;
    };
    pagination?: Pagination;
    filter?: Filter;
    pick?: string[];
    sort?: Record<string, 1 | -1>;
};
export type SearchBooksPayload = {
    query: string;
    condition?: {
        genre?: BookGenreEnum;
        status?: BookStatusEnum;
    };
    pagination?: Pagination;
    pick?: string[];
};
export declare const CreateBook: (payload: CreateBookPayload) => Promise<BookEntity>;
export declare const CountBooks: ({ condition, }: {
    condition?: CountBooksCondition;
    filter?: Filter;
}) => Promise<number>;
export declare const UpdateBook: ({ condition, payload, }: UpdateBookPayload) => Promise<BookEntity>;
export declare const GetBook: ({ condition, pick, }: GetBookPayload) => Promise<BookEntity>;
export declare const ListBooks: ({ condition, pagination, filter, pick, sort, }: ListBooksPayload) => Promise<BookEntity[]>;
export declare const SearchBooks: ({ query, condition, pagination, pick, }: SearchBooksPayload) => Promise<BookEntity[]>;
export declare const DeleteBook: ({ condition, }: {
    condition: {
        id: string;
    };
}) => Promise<void>;
export declare const GetBooksByGenre: (genre: BookGenreEnum, pagination?: Pagination) => Promise<BookEntity[]>;
export declare const GetBooksByAuthor: (author: string, pagination?: Pagination) => Promise<BookEntity[]>;
export declare const GetAvailableBooks: (pagination?: Pagination) => Promise<BookEntity[]>;
export declare const UpdateBookStatus: (bookId: string, status: BookStatusEnum) => Promise<BookEntity>;
export declare const GetBooksByPriceRange: (minPrice: number, maxPrice: number, pagination?: Pagination) => Promise<BookEntity[]>;
export declare function CheckBooksExistByIsbn(isbns: string[]): Promise<{
    isbn: string;
    exists: boolean;
}[]>;
export declare function BulkUpdateBookStatus(bookIds: string[], status: BookStatusEnum): Promise<{
    modifiedCount: number;
}>;
export declare function GetBookStatistics(): Promise<{
    totalBooks: number;
    availableBooks: number;
    outOfStockBooks: number;
    discontinuedBooks: number;
    genreDistribution: Record<string, number>;
}>;
//# sourceMappingURL=book.method.d.ts.map