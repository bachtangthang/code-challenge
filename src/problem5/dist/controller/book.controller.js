"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const express_1 = require("express");
const usecase_1 = require("../configuration/usecase");
const book_schema_1 = require("../infrastructure/data-gateway/providers/mongo/schemas/book.schema");
class BookController {
    constructor() {
        this.path = "/books";
        this.router = (0, express_1.Router)();
        // Initialize interactors
        this.createBookInteractor = new usecase_1.CreateBook();
        this.getBookInteractor = new usecase_1.GetBook();
        this.updateBookInteractor = new usecase_1.UpdateBook();
        this.deleteBookInteractor = new usecase_1.DeleteBook();
        this.listBookInteractor = new usecase_1.ListBooks();
        this.initializeRoutes();
    }
    initializeRoutes() {
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
    async createBook(req, res) {
        try {
            const { title, author, isbn, genre, status, price, publication_date, description, publisher, page_count, } = req.body;
            // Validate required fields
            if (!title ||
                !author ||
                !isbn ||
                !genre ||
                price === undefined ||
                !publication_date) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields: title, author, isbn, genre, price, publication_date",
                });
                return;
            }
            // Validate enum values
            if (!Object.values(book_schema_1.BookGenreEnum).includes(genre)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid genre value",
                    validGenres: Object.values(book_schema_1.BookGenreEnum),
                });
                return;
            }
            if (status && !Object.values(book_schema_1.BookStatusEnum).includes(status)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid status value",
                    validStatuses: Object.values(book_schema_1.BookStatusEnum),
                });
                return;
            }
            // Prepare request for interactor
            const createRequest = {
                title,
                author,
                isbn,
                genre,
                status: status || book_schema_1.BookStatusEnum.AVAILABLE,
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
        }
        catch (error) {
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
    async getBookById(req, res) {
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
        }
        catch (error) {
            console.error("Get book error:", error);
            if (error?.message?.includes("not found")) {
                res.status(404).json({
                    success: false,
                    message: "Book not found",
                });
            }
            else {
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
    async updateBook(req, res) {
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
            if (updateData.status &&
                !Object.values(book_schema_1.BookStatusEnum).includes(updateData.status)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid status value",
                    validStatuses: Object.values(book_schema_1.BookStatusEnum),
                });
                return;
            }
            if (updateData.genre &&
                !Object.values(book_schema_1.BookGenreEnum).includes(updateData.genre)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid genre value",
                    validGenres: Object.values(book_schema_1.BookGenreEnum),
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
        }
        catch (error) {
            console.error("Update book error:", error);
            if (error?.message?.includes("not found")) {
                res.status(404).json({
                    success: false,
                    message: "Book not found",
                });
            }
            else {
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
    async deleteBook(req, res) {
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
        }
        catch (error) {
            console.error("Delete book error:", error);
            if (error?.message?.includes("not found")) {
                res.status(404).json({
                    success: false,
                    message: "Book not found",
                });
            }
            else {
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
    async listBooks(req, res) {
        try {
            const { page = 1, limit = 10, genre, status, author, publisher, search, minPrice, maxPrice, sortBy = "create_time", sortOrder = "desc", } = req.query;
            // Validate enum values if provided
            if (genre &&
                !Object.values(book_schema_1.BookGenreEnum).includes(genre)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid genre value",
                    validGenres: Object.values(book_schema_1.BookGenreEnum),
                });
                return;
            }
            if (status &&
                !Object.values(book_schema_1.BookStatusEnum).includes(status)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid status value",
                    validStatuses: Object.values(book_schema_1.BookStatusEnum),
                });
                return;
            }
            // Prepare request for interactor
            const listRequest = {
                page: parseInt(page),
                limit: Math.min(parseInt(limit), 100), // Max 100 items per page
                genre: genre,
                status: status,
                author: author,
                publisher: publisher,
                search: search,
                minPrice: minPrice ? parseFloat(minPrice) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                sortBy: sortBy,
                sortOrder: sortOrder,
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
        }
        catch (error) {
            console.error("List books error:", error);
            res.status(500).json({
                success: false,
                message: error?.message || "Failed to list books",
            });
        }
    }
}
exports.BookController = BookController;
exports.default = BookController;
//# sourceMappingURL=book.controller.js.map