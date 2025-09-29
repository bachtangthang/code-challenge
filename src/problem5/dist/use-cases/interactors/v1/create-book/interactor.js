"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBook = void 0;
class CreateBook {
    constructor(options) {
        if (!options.infra.dataGateway) {
            throw new Error("DataGateway is required");
        }
        this.dataGateway = options.infra.dataGateway;
    }
    async execute(request) {
        try {
            // Validate the request
            this.validateCreateBookRequest(request);
            // Create the book
            const book = await this.dataGateway.CreateBook(request, {});
            return this.mapEntityToResponse(book);
        }
        catch (error) {
            throw new Error(`Failed to create book: ${error?.message || "Unknown error"}`);
        }
    }
    validateCreateBookRequest(request) {
        if (!request.title?.trim()) {
            throw new Error("Title is required");
        }
        if (!request.author?.trim()) {
            throw new Error("Author is required");
        }
        if (!request.isbn?.trim()) {
            throw new Error("ISBN is required");
        }
        if (!request.genre) {
            throw new Error("Genre is required");
        }
        if (request.price == null || request.price < 0) {
            throw new Error("Price must be a non-negative number");
        }
        if (!request.publication_date) {
            throw new Error("Publication date is required");
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
exports.CreateBook = CreateBook;
//# sourceMappingURL=interactor.js.map