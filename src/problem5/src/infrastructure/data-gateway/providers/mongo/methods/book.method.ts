import { BookEntity } from "../../../../../entities/book.entity";
import {
  BookGenreEnum,
  BookStatusEnum,
  IBookDocument,
  Book,
} from "../schemas/book.schema";

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

export const CreateBook = async function (
  payload: CreateBookPayload
): Promise<BookEntity> {
  const bookData = {
    ...payload,
    create_time: new Date(),
    update_time: new Date(),
  };

  const result: IBookDocument = await Book.create(bookData);

  return new BookEntity({
    id: result.id,
    title: result.title,
    author: result.author,
    genre: result.genre,
    status: result.status,
    price: result.price,
    publication_date: result.publication_date,
    description: result.description,
    publisher: result.publisher,
    page_count: result.page_count,
    create_time: result.create_time,
    update_time: result.update_time,
  });
};

export const CountBooks = async function ({
  condition,
}: {
  condition?: CountBooksCondition;
  filter?: Filter;
}): Promise<number> {
  const query = condition || {};
  return Book.countDocuments(query);
};

export const UpdateBook = async function ({
  condition,
  payload,
}: UpdateBookPayload): Promise<BookEntity> {
  if (!condition || !condition.id) {
    throw new Error("Book ID is required for update");
  }

  const updateData = {
    ...payload,
    update_time: new Date(),
  };

  const result: IBookDocument | null = await Book.findOneAndUpdate(
    condition,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new Error("Book not found");
  }

  return new BookEntity({
    id: result.id,
    title: result.title,
    author: result.author,
    genre: result.genre,
    status: result.status,
    price: result.price,
    publication_date: result.publication_date,
    description: result.description,
    publisher: result.publisher,
    page_count: result.page_count,
    create_time: result.create_time,
    update_time: result.update_time,
  });
};

export const GetBook = async function ({
  condition,
  pick,
}: GetBookPayload): Promise<BookEntity> {
  if (!condition || Object.keys(condition).length === 0) {
    throw new Error("Search condition is required");
  }

  let query = Book.findOne(condition);

  if (pick && pick.length > 0) {
    const selectFields = pick.join(" ");
    query = query.select(selectFields);
  }

  const result: IBookDocument | null = await query.exec();

  if (!result) {
    throw new Error("Book not found");
  }

  return new BookEntity({
    id: result.id,
    title: result.title,
    author: result.author,
    genre: result.genre,
    status: result.status,
    price: result.price,
    publication_date: result.publication_date,
    description: result.description,
    publisher: result.publisher,
    page_count: result.page_count,
    create_time: result.create_time,
    update_time: result.update_time,
  });
};

export const ListBooks = async function ({
  condition = {},
  pagination = { page: 1, limit: 10 },
  filter,
  pick = [],
  sort = { create_time: -1 },
}: ListBooksPayload): Promise<BookEntity[]> {
  let query: any = { ...condition };

  // Handle price range filter
  if (condition.price_range) {
    query.price = {};
    if (condition.price_range.min !== undefined) {
      query.price.$gte = condition.price_range.min;
    }
    if (condition.price_range.max !== undefined) {
      query.price.$lte = condition.price_range.max;
    }
    delete query.price_range;
  }

  // Handle publication year filter
  if (condition.publication_year) {
    const startOfYear = new Date(condition.publication_year, 0, 1);
    const endOfYear = new Date(condition.publication_year + 1, 0, 1);
    query.publication_date = {
      $gte: startOfYear,
      $lt: endOfYear,
    };
    delete query.publication_year;
  }

  let mongoQuery = Book.find(query);

  // Apply pagination
  const skip = (pagination.page - 1) * pagination.limit;
  mongoQuery = mongoQuery.skip(skip).limit(pagination.limit);

  // Apply sorting
  mongoQuery = mongoQuery.sort(sort);

  // Apply field selection
  if (pick && pick.length > 0) {
    const selectFields = pick.join(" ");
    mongoQuery = mongoQuery.select(selectFields);
  }

  const results: IBookDocument[] = await mongoQuery.exec();

  return results.map(
    (result) =>
      new BookEntity({
        id: result.id,
        title: result.title,
        author: result.author,
        genre: result.genre,
        status: result.status,
        price: result.price,
        publication_date: result.publication_date,
        description: result.description,
        publisher: result.publisher,
        page_count: result.page_count,
        create_time: result.create_time,
        update_time: result.update_time,
      })
  );
};

export const SearchBooks = async function ({
  query,
  condition = {},
  pagination = { page: 1, limit: 10 },
  pick = [],
}: SearchBooksPayload): Promise<BookEntity[]> {
  const searchCondition: any = {
    ...condition,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { publisher: { $regex: query, $options: "i" } },
    ],
  };

  return ListBooks({
    condition: searchCondition,
    pagination,
    pick,
  });
};

export const DeleteBook = async function ({
  condition,
}: {
  condition: { id: string };
}): Promise<void> {
  if (!condition || !condition.id) {
    throw new Error("Book ID is required for deletion");
  }

  const result = await Book.findOneAndDelete({ id: condition.id });

  if (!result) {
    throw new Error("Book not found");
  }
};
