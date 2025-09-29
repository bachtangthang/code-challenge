"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBook = void 0;
class GetBook {
    constructor(options) {
        if (!options.infra.dataGateway) {
            throw new Error("DataGateway is required");
        }
        this.dataGateway = options.infra.dataGateway;
    }
    async getById(id) {
        try {
            if (!id?.trim()) {
                throw new Error("Book ID is required");
            }
            const book = await this.dataGateway.GetBook({ condition: { id } }, {});
            return this.mapEntityToResponse(book);
        }
        catch (error) {
            throw new Error(`Failed to get book: ${error?.message || "Unknown error"}`);
        }
    }
    async getByIsbn(isbn) {
        try {
            if (!isbn?.trim()) {
                throw new Error("ISBN is required");
            }
            const book = await this.dataGateway.GetBook({ condition: { isbn } }, {});
            return this.mapEntityToResponse(book);
        }
        catch (error) {
            throw new Error(`Failed to get book by ISBN: ${error?.message || "Unknown error"}`);
        }
    }
    mapEntityToResponse(entity) {
        return {
            id: entity.id,
            title: entity.title,
            author: entity.author,
            isbn: entity.isbn,
            genre: entity.genre,
            status: entity.status,
            price: entity.price,
            publication_date: entity.publication_date,
            description: entity.description,
            publisher: entity.publisher,
            page_count: entity.page_count,
            create_time: entity.create_time,
            update_time: entity.update_time,
        };
    }
}
exports.GetBook = GetBook;
//# sourceMappingURL=interactor.js.map