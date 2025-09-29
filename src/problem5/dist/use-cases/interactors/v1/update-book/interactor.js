"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBook = void 0;
class UpdateBook {
    constructor(options) {
        if (!options.infra.dataGateway) {
            throw new Error("DataGateway is required");
        }
        this.dataGateway = options.infra.dataGateway;
    }
    async execute(id, request) {
        try {
            // Validate inputs
            if (!id?.trim()) {
                throw new Error("Book ID is required");
            }
            this.validateUpdateRequest(request);
            // Update the book
            const book = await this.dataGateway.UpdateBook({
                condition: { id },
                payload: request,
            }, {});
            return this.mapEntityToResponse(book);
        }
        catch (error) {
            throw new Error(`Failed to update book: ${error?.message || "Unknown error"}`);
        }
    }
    validateUpdateRequest(request) {
        if (request.title !== undefined && !request.title?.trim()) {
            throw new Error("Title cannot be empty");
        }
        if (request.author !== undefined && !request.author?.trim()) {
            throw new Error("Author cannot be empty");
        }
        if (request.price !== undefined &&
            (request.price < 0 || isNaN(request.price))) {
            throw new Error("Price must be a non-negative number");
        }
        if (request.page_count !== undefined &&
            (request.page_count < 1 || isNaN(request.page_count))) {
            throw new Error("Page count must be a positive number");
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
exports.UpdateBook = UpdateBook;
//# sourceMappingURL=interactor.js.map