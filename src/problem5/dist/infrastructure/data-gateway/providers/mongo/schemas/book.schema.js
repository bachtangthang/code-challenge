"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookSchema = exports.BookStatusEnum = exports.BookGenreEnum = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
var BookGenreEnum;
(function (BookGenreEnum) {
    BookGenreEnum["FICTION"] = "fiction";
    BookGenreEnum["NON_FICTION"] = "non_fiction";
    BookGenreEnum["MYSTERY"] = "mystery";
    BookGenreEnum["ROMANCE"] = "romance";
    BookGenreEnum["SCIENCE_FICTION"] = "science_fiction";
    BookGenreEnum["FANTASY"] = "fantasy";
    BookGenreEnum["THRILLER"] = "thriller";
    BookGenreEnum["HORROR"] = "horror";
    BookGenreEnum["BIOGRAPHY"] = "biography";
    BookGenreEnum["HISTORY"] = "history";
    BookGenreEnum["SELF_HELP"] = "self_help";
    BookGenreEnum["BUSINESS"] = "business";
    BookGenreEnum["TECHNOLOGY"] = "technology";
    BookGenreEnum["HEALTH"] = "health";
    BookGenreEnum["COOKING"] = "cooking";
    BookGenreEnum["TRAVEL"] = "travel";
    BookGenreEnum["CHILDREN"] = "children";
    BookGenreEnum["YOUNG_ADULT"] = "young_adult";
    BookGenreEnum["POETRY"] = "poetry";
    BookGenreEnum["DRAMA"] = "drama";
    BookGenreEnum["OTHER"] = "other";
})(BookGenreEnum || (exports.BookGenreEnum = BookGenreEnum = {}));
var BookStatusEnum;
(function (BookStatusEnum) {
    BookStatusEnum["AVAILABLE"] = "available";
    BookStatusEnum["OUT_OF_STOCK"] = "out_of_stock";
    BookStatusEnum["DISCONTINUED"] = "discontinued";
})(BookStatusEnum || (exports.BookStatusEnum = BookStatusEnum = {}));
exports.BookSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        default: uuid_1.v4,
    },
    title: {
        type: String,
        required: true,
        index: true,
    },
    author: {
        type: String,
        required: true,
        index: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    genre: {
        type: String,
        enum: Object.values(BookGenreEnum),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(BookStatusEnum),
        default: BookStatusEnum.AVAILABLE,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    publication_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    publisher: {
        type: String,
    },
    page_count: {
        type: Number,
        min: 1,
    },
}, {
    versionKey: false,
    timestamps: { createdAt: "create_time", updatedAt: "update_time" },
});
exports.BookSchema.index({ isbn: 1 }, { unique: true });
exports.BookSchema.index({ title: 1 });
exports.BookSchema.index({ author: 1 });
exports.BookSchema.index({ genre: 1 });
exports.BookSchema.index({ status: 1 });
exports.Book = (0, mongoose_1.model)("books", exports.BookSchema);
//# sourceMappingURL=book.schema.js.map