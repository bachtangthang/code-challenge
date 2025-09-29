"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoProvider = void 0;
const mongoose_1 = require("mongoose");
const book_schema_1 = require("./schemas/book.schema");
class mongoProvider {
    constructor(options) {
        this.conn = null;
        this.mongoUri = options.mongoUri;
        this.name = options.name;
        this.Book = book_schema_1.Book;
    }
    async connect() {
        await (0, mongoose_1.connect)(this.mongoUri);
        this.conn = mongoose_1.connection;
    }
    async disconnect() {
        if (this.conn) {
            await (0, mongoose_1.disconnect)();
            this.conn = null;
        }
    }
}
exports.mongoProvider = mongoProvider;
//# sourceMappingURL=mongodb.js.map