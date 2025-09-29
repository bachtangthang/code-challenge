import { Request, Response } from "express";
export declare class BookController {
    path: string;
    router: import("express-serve-static-core").Router;
    private createBookInteractor;
    private getBookInteractor;
    private updateBookInteractor;
    private deleteBookInteractor;
    private listBookInteractor;
    constructor();
    private initializeRoutes;
    /**
     * Create a new book
     * POST /books
     */
    createBook(req: Request, res: Response): Promise<void>;
    /**
     * Get book by ID
     * GET /books/:id
     */
    getBookById(req: Request, res: Response): Promise<void>;
    /**
     * Update book
     * PUT /books/:id
     */
    updateBook(req: Request, res: Response): Promise<void>;
    /**
     * Delete book
     * DELETE /books/:id
     */
    deleteBook(req: Request, res: Response): Promise<void>;
    /**
     * List books with filters and pagination
     * GET /books
     */
    listBooks(req: Request, res: Response): Promise<void>;
}
export default BookController;
//# sourceMappingURL=book.controller.d.ts.map