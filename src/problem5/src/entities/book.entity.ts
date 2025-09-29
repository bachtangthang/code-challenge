import { v4 as uuidv4 } from "uuid";
export enum BookStatusEnum {
  AVAILABLE = "available",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}

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
export interface BookEntityProps {
  id?: string;
  title: string;
  author: string;
  genre: BookGenreEnum;
  status?: BookStatusEnum;
  price: number;
  publication_date: Date;
  description?: string;
  publisher?: string;
  page_count?: number;
  create_time?: Date;
  update_time?: Date;
}

export class BookEntity {
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

  constructor(props: BookEntityProps) {
    this.validateProps(props);

    this.id = props.id || uuidv4();
    this.title = props.title.trim();
    this.author = props.author.trim();
    this.genre = props.genre;
    this.status = props.status || BookStatusEnum.AVAILABLE;
    this.price = props.price;
    this.publication_date = new Date(props.publication_date);
    this.description = props.description?.trim();
    this.publisher = props.publisher?.trim();
    this.page_count = props.page_count;
    this.create_time = props.create_time || new Date();
    this.update_time = props.update_time || new Date();
  }

  // Query methods
  isAvailable(): boolean {
    return this.status === BookStatusEnum.AVAILABLE;
  }

  isOutOfStock(): boolean {
    return this.status === BookStatusEnum.OUT_OF_STOCK;
  }

  isDiscontinued(): boolean {
    return this.status === BookStatusEnum.DISCONTINUED;
  }

  private validateProps(props: BookEntityProps): void {
    this.validateTitle(props.title);
    this.validateAuthor(props.author);
    this.validatePrice(props.price);
    this.validatePublicationDate(props.publication_date);

    if (props.page_count !== undefined) {
      this.validatePageCount(props.page_count);
    }
  }

  private validateTitle(title: string): void {
    if (!title || typeof title !== "string") {
      throw new Error("Title is required and must be a string");
    }
    if (title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    if (title.length > 255) {
      throw new Error("Title must be 255 characters or less");
    }
  }

  private validateAuthor(author: string): void {
    if (!author || typeof author !== "string") {
      throw new Error("Author is required and must be a string");
    }
    if (author.trim().length === 0) {
      throw new Error("Author cannot be empty");
    }
    if (author.length > 255) {
      throw new Error("Author must be 255 characters or less");
    }
  }

  private validatePrice(price: number): void {
    if (typeof price !== "number" || isNaN(price)) {
      throw new Error("Price must be a valid number");
    }
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    if (price > 999999.99) {
      throw new Error("Price cannot exceed 999,999.99");
    }
  }

  private validatePublicationDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Publication date must be a valid date");
    }

    const minDate = new Date("1000-01-01");
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10); // Allow up to 10 years in the future

    if (date < minDate || date > maxDate) {
      throw new Error(
        "Publication date must be between year 1000 and 10 years in the future"
      );
    }
  }

  private validatePageCount(pageCount: number): void {
    if (typeof pageCount !== "number" || isNaN(pageCount)) {
      throw new Error("Page count must be a valid number");
    }
    if (pageCount < 1) {
      throw new Error("Page count must be at least 1");
    }
    if (pageCount > 50000) {
      throw new Error("Page count cannot exceed 50,000");
    }
  }
}
