"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookRoutes = createBookRoutes;
const express_1 = require("express");
function createBookRoutes(bookController) {
    const router = (0, express_1.Router)();
    // Create a book
    router.post("/books", (req, res) => bookController.createBook(req, res));
    // Get all books with pagination and filtering
    router.get("/books", (req, res) => bookController.listBooks(req, res));
    // Get a book by ID
    router.get("/books/:id", (req, res) => bookController.getBookById(req, res));
    // Update a book
    router.put("/books/:id", (req, res) => bookController.updateBook(req, res));
    // Delete a book
    router.delete("/books/:id", (req, res) => bookController.deleteBook(req, res));
    return router;
}
//# sourceMappingURL=book.routes.js.map