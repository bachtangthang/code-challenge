import { Document, Schema } from "mongoose";
export declare enum BookGenreEnum {
    FICTION = "fiction",
    NON_FICTION = "non_fiction",
    MYSTERY = "mystery",
    ROMANCE = "romance",
    SCIENCE_FICTION = "science_fiction",
    FANTASY = "fantasy",
    THRILLER = "thriller",
    HORROR = "horror",
    BIOGRAPHY = "biography",
    HISTORY = "history",
    SELF_HELP = "self_help",
    BUSINESS = "business",
    TECHNOLOGY = "technology",
    HEALTH = "health",
    COOKING = "cooking",
    TRAVEL = "travel",
    CHILDREN = "children",
    YOUNG_ADULT = "young_adult",
    POETRY = "poetry",
    DRAMA = "drama",
    OTHER = "other"
}
export declare enum BookStatusEnum {
    AVAILABLE = "available",
    OUT_OF_STOCK = "out_of_stock",
    DISCONTINUED = "discontinued"
}
export interface IBookDocument extends Document {
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
export declare const BookSchema: Schema;
export declare const Book: import("mongoose").Model<IBookDocument, {}, {}, {}, Document<unknown, {}, IBookDocument, {}, {}> & IBookDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=book.schema.d.ts.map