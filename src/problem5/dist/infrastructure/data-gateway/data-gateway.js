"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGateway = void 0;
const book_method_1 = require("src/infrastructure/data-gateway/providers/mongo/methods/book.method");
class DataGateway {
    /**
     * Initialize DataGateway with MongoDB and cache clients.
     * @param options.client.mongoDb - MongoDB provider.
     */
    constructor(options) {
        this.client = options.client;
    }
}
exports.DataGateway = DataGateway;
// --- Method assignments ---
// Each method below is assigned from its implementation file for modularity and maintainability.
DataGateway.prototype.CreateBook = book_method_1.CreateBook;
DataGateway.prototype.CountBooks = book_method_1.CountBooks;
DataGateway.prototype.UpdateBook = book_method_1.UpdateBook;
DataGateway.prototype.GetBook = book_method_1.GetBook;
DataGateway.prototype.ListBooks = book_method_1.ListBooks;
DataGateway.prototype.DeleteBook = book_method_1.DeleteBook;
//# sourceMappingURL=data-gateway.js.map