"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBook = void 0;
class DeleteBook {
    constructor(options) {
        if (!options.infra.dataGateway) {
            throw new Error("DataGateway is required");
        }
        this.dataGateway = options.infra.dataGateway;
    }
    async execute(id) {
        try {
            // Validate input
            if (!id?.trim()) {
                throw new Error("Book ID is required");
            }
            // Check if book exists first
            try {
                await this.dataGateway.GetBook({ condition: { id } }, {});
            }
            catch (error) {
                throw new Error("Book not found");
            }
            // Delete the book
            await this.dataGateway.DeleteBook({ condition: { id } }, {});
        }
        catch (error) {
            throw new Error(`Failed to delete book: ${error?.message || "Unknown error"}`);
        }
    }
}
exports.DeleteBook = DeleteBook;
//# sourceMappingURL=interactor.js.map