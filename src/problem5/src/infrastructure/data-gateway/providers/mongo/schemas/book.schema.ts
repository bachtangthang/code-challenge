import { Document, model, Schema } from "mongoose";
import { BookEntity } from "../../../../../entities/book.entity";
import { v4 as uuidv4 } from "uuid";

export enum BookGenreEnum {
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
  OTHER = "other",
}

export enum BookStatusEnum {
  AVAILABLE = "available",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}

export interface IBookDocument extends Document {
  id: string;
  title: string;
  author: string;
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

export const BookSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    author: {
      type: String,
      required: true,
      index: true,
    },
    genre: {
      type: String,
      enum: Object.values(BookGenreEnum),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BookStatusEnum),
      default: BookStatusEnum.AVAILABLE,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    publication_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    publisher: {
      type: String,
    },
    page_count: {
      type: Number,
      min: 1,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "create_time", updatedAt: "update_time" },
  }
);

export const Book = model<IBookDocument>("books", BookSchema);
