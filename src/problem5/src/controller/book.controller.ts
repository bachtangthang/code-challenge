import { Request, Response, Router } from "express";
import {
  CreateBook,
  GetBook,
  UpdateBook,
  DeleteBook,
  ListBooks,
} from "src/configuration/usecase";
import {
  BookGenreEnum,
  BookStatusEnum,
} from "src/infrastructure/data-gateway/providers/mongo/schemas/book.schema";

export class BookController {
  public path = "/books";
  public router = Router();

  private createBookInteractor: CreateBook;
  private getBookInteractor: GetBook;
  private updateBookInteractor: UpdateBook;
  private deleteBookInteractor: DeleteBook;
  private listBookInteractor: ListBooks;

  constructor() {
    // Initialize interactors
    this.createBookInteractor = new CreateBook();
    this.getBookInteractor = new GetBook();
    this.updateBookInteractor = new UpdateBook();
    this.deleteBookInteractor = new DeleteBook();
    this.listBookInteractor = new ListBooks();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}`, this.createBook.bind(this));
    this.router.get(`${this.path}`, this.listBooks.bind(this));
    this.router.get(`${this.path}/:id`, this.getBookById.bind(this));
    this.router.put(`${this.path}/:id`, this.updateBook.bind(this));
    this.router.delete(`${this.path}/:id`, this.deleteBook.bind(this));
  }

  /**
   * Create a new book
   * POST /books
   */
  public async createBook(req: Request, res: Response): Promise<void> {
    try {
      const {
        title,
        author,
        genre,
        status,
        price,
        publication_date,
        description,
        publisher,
        page_count,
      } = req.body;

      // Validate required fields
      if (
        !title ||
        !author ||
        !genre ||
        price === undefined ||
        !publication_date
      ) {
        res.status(400).json({
          success: false,
          message:
            "Missing required fields: title, author, genre, price, publication_date",
        });
        return;
      }

      // Validate enum values
      if (!Object.values(BookGenreEnum).includes(genre)) {
        res.status(400).json({
          success: false,
          message: "Invalid genre value",
          validGenres: Object.values(BookGenreEnum),
        });
        return;
      }

      if (status && !Object.values(BookStatusEnum).includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid status value",
          validStatuses: Object.values(BookStatusEnum),
        });
        return;
      }

      // Prepare request for interactor
      const createRequest = {
        title,
        author,
        genre,
        status: status || BookStatusEnum.AVAILABLE,
        price: parseFloat(price),
        publication_date: new Date(publication_date),
        description,
        publisher,
        page_count: page_count ? parseInt(page_count) : undefined,
      };

      // Call interactor
      const book = await this.createBookInteractor.execute(createRequest);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error: any) {
      console.error("Create book error:", error);
      res.status(500).json({
        success: false,
        message: error?.message || "Failed to create book",
      });
    }
  }

  /**
   * Get book by ID
   * GET /books/:id
   */
  public async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Book ID is required",
        });
        return;
      }

      // Call interactor
      const book = await this.getBookInteractor.getById(id);

      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error: any) {
      console.error("Get book error:", error);

      if (error?.message?.includes("not found")) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      } else {
        res.status(500).json({
          success: false,
          message: error?.message || "Failed to get book",
        });
      }
    }
  }

  /**
   * Update book
   * PUT /books/:id
   */
  public async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Book ID is required",
        });
        return;
      }

      // Validate enum values if provided
      if (
        updateData.status &&
        !Object.values(BookStatusEnum).includes(updateData.status)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid status value",
          validStatuses: Object.values(BookStatusEnum),
        });
        return;
      }

      if (
        updateData.genre &&
        !Object.values(BookGenreEnum).includes(updateData.genre)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid genre value",
          validGenres: Object.values(BookGenreEnum),
        });
        return;
      }

      // Prepare request for interactor
      const updateRequest = {
        id,
        ...updateData,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        page_count: updateData.page_count
          ? parseInt(updateData.page_count)
          : undefined,
        publication_date: updateData.publication_date
          ? new Date(updateData.publication_date)
          : undefined,
      };

      // Call interactor
      const book = await this.updateBookInteractor.execute(id, updateRequest);

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error: any) {
      console.error("Update book error:", error);

      if (error?.message?.includes("not found")) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      } else {
        res.status(500).json({
          success: false,
          message: error?.message || "Failed to update book",
        });
      }
    }
  }

  /**
   * Delete book
   * DELETE /books/:id
   */
  public async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Book ID is required",
        });
        return;
      }

      // Call interactor
      await this.deleteBookInteractor.execute(id);

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error: any) {
      console.error("Delete book error:", error);

      if (error?.message?.includes("not found")) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      } else {
        res.status(500).json({
          success: false,
          message: error?.message || "Failed to delete book",
        });
      }
    }
  }

  /**
   * List books with filters and pagination
   * GET /books
   */
  public async listBooks(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        genre,
        status,
        author,
        publisher,
        search,
        minPrice,
        maxPrice,
        sortBy = "create_time",
        sortOrder = "desc",
      } = req.query;

      // Validate enum values if provided
      if (
        genre &&
        !Object.values(BookGenreEnum).includes(genre as BookGenreEnum)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid genre value",
          validGenres: Object.values(BookGenreEnum),
        });
        return;
      }

      if (
        status &&
        !Object.values(BookStatusEnum).includes(status as BookStatusEnum)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid status value",
          validStatuses: Object.values(BookStatusEnum),
        });
        return;
      }

      // Prepare request for interactor
      const listRequest = {
        page: parseInt(page as string),
        limit: Math.min(parseInt(limit as string), 100), // Max 100 items per page
        genre: genre as BookGenreEnum,
        status: status as BookStatusEnum,
        author: author as string,
        publisher: publisher as string,
        search: search as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        sortBy: sortBy as string,
        sortOrder: sortOrder as "asc" | "desc",
      };

      // Call interactor
      const result = await this.listBookInteractor.execute(listRequest);

      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result.books,
        pagination: result.pagination,
        filters: {
          genre,
          status,
          author,
          publisher,
          search,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder,
        },
      });
    } catch (error: any) {
      console.error("List books error:", error);
      res.status(500).json({
        success: false,
        message: error?.message || "Failed to list books",
      });
    }
  }
}

export default BookController;
