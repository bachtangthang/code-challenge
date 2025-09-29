"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBooks = void 0;
class ListBooks {
    constructor(options) {
        if (!options.infra.dataGateway) {
            throw new Error("DataGateway is required");
        }
        this.dataGateway = options.infra.dataGateway;
    }
    async execute(request) {
        try {
            // Set defaults
            const page = Math.max(1, request.page || 1);
            const limit = Math.min(100, Math.max(1, request.limit || 10));
            // Build condition
            const condition = {};
            if (request.genre)
                condition.genre = request.genre;
            if (request.status)
                condition.status = request.status;
            if (request.author)
                condition.author = request.author;
            if (request.publisher)
                condition.publisher = request.publisher;
            // Handle price range
            if (request.minPrice !== undefined || request.maxPrice !== undefined) {
                condition.price_range = {};
                if (request.minPrice !== undefined)
                    condition.price_range.min = request.minPrice;
                if (request.maxPrice !== undefined)
                    condition.price_range.max = request.maxPrice;
            }
            let books;
            if (request.search) {
                // Use search functionality - add search term to condition
                condition.$text = { $search: request.search };
                books = await this.dataGateway.ListBooks({
                    condition,
                    pagination: { page, limit },
                }, {});
            }
            else {
                // Use regular list functionality
                books = await this.dataGateway.ListBooks({
                    condition,
                    pagination: { page, limit },
                }, {});
            }
            // Get total count for pagination
            const total = await this.dataGateway.CountBooks({ condition }, {});
            const totalPages = Math.ceil(total / limit);
            return {
                books: books.map((book) => this.mapEntityToResponse(book)),
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                },
            };
        }
        catch (error) {
            throw new Error(`Failed to list books: ${error?.message || "Unknown error"}`);
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
exports.ListBooks = ListBooks;
//# sourceMappingURL=interactor.js.map