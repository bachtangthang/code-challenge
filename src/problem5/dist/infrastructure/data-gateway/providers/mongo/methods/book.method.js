"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBooksByPriceRange = exports.UpdateBookStatus = exports.GetAvailableBooks = exports.GetBooksByAuthor = exports.GetBooksByGenre = exports.DeleteBook = exports.SearchBooks = exports.ListBooks = exports.GetBook = exports.UpdateBook = exports.CountBooks = exports.CreateBook = void 0;
exports.CheckBooksExistByIsbn = CheckBooksExistByIsbn;
exports.BulkUpdateBookStatus = BulkUpdateBookStatus;
exports.GetBookStatistics = GetBookStatistics;
const book_entity_1 = require("../../../../../entities/book.entity");
const book_schema_1 = require("../schemas/book.schema");
const CreateBook = async function (payload) {
    const bookData = {
        ...payload,
        create_time: new Date(),
        update_time: new Date(),
    };
    const result = await book_schema_1.Book.create(bookData);
    return new book_entity_1.BookEntity({
        id: result.id,
        title: result.title,
        author: result.author,
        isbn: result.isbn,
        genre: result.genre,
        status: result.status,
        price: result.price,
        publication_date: result.publication_date,
        description: result.description,
        publisher: result.publisher,
        page_count: result.page_count,
        create_time: result.create_time,
        update_time: result.update_time,
    });
};
exports.CreateBook = CreateBook;
const CountBooks = async function ({ condition, }) {
    const query = condition || {};
    return book_schema_1.Book.countDocuments(query);
};
exports.CountBooks = CountBooks;
const UpdateBook = async function ({ condition, payload, }) {
    if (!condition || (!condition.id && !condition.isbn)) {
        throw new Error("Book ID or ISBN is required for update");
    }
    const updateData = {
        ...payload,
        update_time: new Date(),
    };
    const result = await book_schema_1.Book.findOneAndUpdate(condition, { $set: updateData }, { new: true, runValidators: true });
    if (!result) {
        throw new Error("Book not found");
    }
    return new book_entity_1.BookEntity({
        id: result.id,
        title: result.title,
        author: result.author,
        isbn: result.isbn,
        genre: result.genre,
        status: result.status,
        price: result.price,
        publication_date: result.publication_date,
        description: result.description,
        publisher: result.publisher,
        page_count: result.page_count,
        create_time: result.create_time,
        update_time: result.update_time,
    });
};
exports.UpdateBook = UpdateBook;
const GetBook = async function ({ condition, pick, }) {
    if (!condition || Object.keys(condition).length === 0) {
        throw new Error("Search condition is required");
    }
    let query = book_schema_1.Book.findOne(condition);
    if (pick && pick.length > 0) {
        const selectFields = pick.join(" ");
        query = query.select(selectFields);
    }
    const result = await query.exec();
    if (!result) {
        throw new Error("Book not found");
    }
    return new book_entity_1.BookEntity({
        id: result.id,
        title: result.title,
        author: result.author,
        isbn: result.isbn,
        genre: result.genre,
        status: result.status,
        price: result.price,
        publication_date: result.publication_date,
        description: result.description,
        publisher: result.publisher,
        page_count: result.page_count,
        create_time: result.create_time,
        update_time: result.update_time,
    });
};
exports.GetBook = GetBook;
const ListBooks = async function ({ condition = {}, pagination = { page: 1, limit: 10 }, filter, pick = [], sort = { create_time: -1 }, }) {
    let query = { ...condition };
    // Handle price range filter
    if (condition.price_range) {
        query.price = {};
        if (condition.price_range.min !== undefined) {
            query.price.$gte = condition.price_range.min;
        }
        if (condition.price_range.max !== undefined) {
            query.price.$lte = condition.price_range.max;
        }
        delete query.price_range;
    }
    // Handle publication year filter
    if (condition.publication_year) {
        const startOfYear = new Date(condition.publication_year, 0, 1);
        const endOfYear = new Date(condition.publication_year + 1, 0, 1);
        query.publication_date = {
            $gte: startOfYear,
            $lt: endOfYear,
        };
        delete query.publication_year;
    }
    let mongoQuery = book_schema_1.Book.find(query);
    // Apply pagination
    const skip = (pagination.page - 1) * pagination.limit;
    mongoQuery = mongoQuery.skip(skip).limit(pagination.limit);
    // Apply sorting
    mongoQuery = mongoQuery.sort(sort);
    // Apply field selection
    if (pick && pick.length > 0) {
        const selectFields = pick.join(" ");
        mongoQuery = mongoQuery.select(selectFields);
    }
    const results = await mongoQuery.exec();
    return results.map((result) => new book_entity_1.BookEntity({
        id: result.id,
        title: result.title,
        author: result.author,
        isbn: result.isbn,
        genre: result.genre,
        status: result.status,
        price: result.price,
        publication_date: result.publication_date,
        description: result.description,
        publisher: result.publisher,
        page_count: result.page_count,
        create_time: result.create_time,
        update_time: result.update_time,
    }));
};
exports.ListBooks = ListBooks;
const SearchBooks = async function ({ query, condition = {}, pagination = { page: 1, limit: 10 }, pick = [], }) {
    const searchCondition = {
        ...condition,
        $or: [
            { title: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { publisher: { $regex: query, $options: "i" } },
            { isbn: { $regex: query, $options: "i" } },
        ],
    };
    return (0, exports.ListBooks)({
        condition: searchCondition,
        pagination,
        pick,
    });
};
exports.SearchBooks = SearchBooks;
const DeleteBook = async function ({ condition, }) {
    if (!condition || !condition.id) {
        throw new Error("Book ID is required for deletion");
    }
    const result = await book_schema_1.Book.findOneAndDelete({ id: condition.id });
    if (!result) {
        throw new Error("Book not found");
    }
};
exports.DeleteBook = DeleteBook;
const GetBooksByGenre = async function (genre, pagination = { page: 1, limit: 10 }) {
    return (0, exports.ListBooks)({
        condition: { genre },
        pagination,
        sort: { title: 1 },
    });
};
exports.GetBooksByGenre = GetBooksByGenre;
const GetBooksByAuthor = async function (author, pagination = { page: 1, limit: 10 }) {
    const searchCondition = { author: { $regex: author, $options: "i" } };
    return (0, exports.ListBooks)({
        condition: searchCondition,
        pagination,
        sort: { publication_date: -1 },
    });
};
exports.GetBooksByAuthor = GetBooksByAuthor;
const GetAvailableBooks = async function (pagination = { page: 1, limit: 10 }) {
    return (0, exports.ListBooks)({
        condition: { status: book_schema_1.BookStatusEnum.AVAILABLE },
        pagination,
        sort: { title: 1 },
    });
};
exports.GetAvailableBooks = GetAvailableBooks;
const UpdateBookStatus = async function (bookId, status) {
    return (0, exports.UpdateBook)({
        condition: { id: bookId },
        payload: { status },
    });
};
exports.UpdateBookStatus = UpdateBookStatus;
const GetBooksByPriceRange = async function (minPrice, maxPrice, pagination = { page: 1, limit: 10 }) {
    return (0, exports.ListBooks)({
        condition: {
            price_range: {
                min: minPrice,
                max: maxPrice,
            },
        },
        pagination,
        sort: { price: 1 },
    });
};
exports.GetBooksByPriceRange = GetBooksByPriceRange;
async function CheckBooksExistByIsbn(isbns) {
    const existingBooks = await book_schema_1.Book.find({ isbn: { $in: isbns } }, { isbn: 1, _id: 0 }).exec();
    const existingIsbns = existingBooks.map((book) => book.isbn);
    return isbns.map((isbn) => ({
        isbn,
        exists: existingIsbns.includes(isbn),
    }));
}
async function BulkUpdateBookStatus(bookIds, status) {
    const result = await book_schema_1.Book.updateMany({ id: { $in: bookIds } }, {
        $set: {
            status,
            update_time: new Date(),
        },
    });
    return { modifiedCount: result.modifiedCount };
}
async function GetBookStatistics() {
    const [totalBooks, availableBooks, outOfStockBooks, discontinuedBooks, genreStats,] = await Promise.all([
        book_schema_1.Book.countDocuments({}),
        book_schema_1.Book.countDocuments({ status: book_schema_1.BookStatusEnum.AVAILABLE }),
        book_schema_1.Book.countDocuments({ status: book_schema_1.BookStatusEnum.OUT_OF_STOCK }),
        book_schema_1.Book.countDocuments({ status: book_schema_1.BookStatusEnum.DISCONTINUED }),
        book_schema_1.Book.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }]),
    ]);
    const genreDistribution = {};
    // Initialize all genres with 0
    Object.values(book_schema_1.BookGenreEnum).forEach((genre) => {
        genreDistribution[genre] = 0;
    });
    // Fill in actual counts
    genreStats.forEach((stat) => {
        if (stat._id && Object.values(book_schema_1.BookGenreEnum).includes(stat._id)) {
            genreDistribution[stat._id] = stat.count;
        }
    });
    return {
        totalBooks,
        availableBooks,
        outOfStockBooks,
        discontinuedBooks,
        genreDistribution,
    };
}
//# sourceMappingURL=book.method.js.map