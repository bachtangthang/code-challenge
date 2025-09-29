"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookEntity = exports.BookGenreEnum = exports.BookStatusEnum = void 0;
const uuid_1 = require("uuid");
var BookStatusEnum;
(function (BookStatusEnum) {
    BookStatusEnum["AVAILABLE"] = "available";
    BookStatusEnum["OUT_OF_STOCK"] = "out_of_stock";
    BookStatusEnum["DISCONTINUED"] = "discontinued";
})(BookStatusEnum || (exports.BookStatusEnum = BookStatusEnum = {}));
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
class BookEntity {
    constructor(props) {
        this.validateProps(props);
        this.id = props.id || (0, uuid_1.v4)();
        this.title = props.title.trim();
        this.author = props.author.trim();
        this.isbn = this.normalizeIsbn(props.isbn);
        this.genre = props.genre;
        this.status = props.status || BookStatusEnum.AVAILABLE;
        this.price = props.price;
        this.publication_date = new Date(props.publication_date);
        this.description = props.description?.trim();
        this.publisher = props.publisher?.trim();
        this.page_count = props.page_count;
        this.create_time = props.create_time || new Date();
        this.update_time = props.update_time || new Date();
    }
    // Getters (using same name as private properties, but TypeScript allows this)
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getIsbn() {
        return this.isbn;
    }
    getGenre() {
        return this.genre;
    }
    getStatus() {
        return this.status;
    }
    getPrice() {
        return this.price;
    }
    getPublicationDate() {
        return this.publication_date;
    }
    getDescription() {
        return this.description;
    }
    getPublisher() {
        return this.publisher;
    }
    getPageCount() {
        return this.page_count;
    }
    getCreateTime() {
        return this.create_time;
    }
    getUpdateTime() {
        return this.update_time;
    }
    // Business logic methods
    updateTitle(title) {
        this.validateTitle(title);
        this.title = title.trim();
        this.touch();
    }
    updateAuthor(author) {
        this.validateAuthor(author);
        this.author = author.trim();
        this.touch();
    }
    updatePrice(price) {
        this.validatePrice(price);
        this.price = price;
        this.touch();
    }
    updateStatus(status) {
        this.status = status;
        this.touch();
    }
    updateDescription(description) {
        this.description = description?.trim();
        this.touch();
    }
    updatePublisher(publisher) {
        this.publisher = publisher?.trim();
        this.touch();
    }
    updatePageCount(pageCount) {
        if (pageCount !== undefined) {
            this.validatePageCount(pageCount);
        }
        this.page_count = pageCount;
        this.touch();
    }
    // Status management
    markAsAvailable() {
        this.status = BookStatusEnum.AVAILABLE;
        this.touch();
    }
    markAsOutOfStock() {
        this.status = BookStatusEnum.OUT_OF_STOCK;
        this.touch();
    }
    markAsDiscontinued() {
        this.status = BookStatusEnum.DISCONTINUED;
        this.touch();
    }
    // Query methods
    isAvailable() {
        return this.status === BookStatusEnum.AVAILABLE;
    }
    isOutOfStock() {
        return this.status === BookStatusEnum.OUT_OF_STOCK;
    }
    isDiscontinued() {
        return this.status === BookStatusEnum.DISCONTINUED;
    }
    isPublishedAfter(date) {
        return this.publication_date > date;
    }
    isPublishedBefore(date) {
        return this.publication_date < date;
    }
    isPriceInRange(min, max) {
        if (min !== undefined && this.price < min)
            return false;
        if (max !== undefined && this.price > max)
            return false;
        return true;
    }
    // Utility methods
    getFormattedPrice(currency = "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(this.price);
    }
    getAgeInYears() {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - this.publication_date.getTime());
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
        return diffYears;
    }
    // Serialization
    toPlainObject() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            isbn: this.isbn,
            genre: this.genre,
            status: this.status,
            price: this.price,
            publication_date: this.publication_date,
            description: this.description,
            publisher: this.publisher,
            page_count: this.page_count,
            create_time: this.create_time,
            update_time: this.update_time,
        };
    }
    toJSON() {
        return this.toPlainObject();
    }
    // Static factory methods
    static fromPlainObject(data) {
        return new BookEntity({
            id: data.id,
            title: data.title,
            author: data.author,
            isbn: data.isbn,
            genre: data.genre,
            status: data.status,
            price: data.price,
            publication_date: new Date(data.publication_date),
            description: data.description,
            publisher: data.publisher,
            page_count: data.page_count,
            create_time: data.create_time ? new Date(data.create_time) : undefined,
            update_time: data.update_time ? new Date(data.update_time) : undefined,
        });
    }
    static create(props) {
        return new BookEntity(props);
    }
    // Private helper methods
    touch() {
        this.update_time = new Date();
    }
    validateProps(props) {
        this.validateTitle(props.title);
        this.validateAuthor(props.author);
        this.validateIsbn(props.isbn);
        this.validatePrice(props.price);
        this.validatePublicationDate(props.publication_date);
        if (props.page_count !== undefined) {
            this.validatePageCount(props.page_count);
        }
    }
    validateTitle(title) {
        if (!title || typeof title !== "string") {
            throw new Error("Title is required and must be a string");
        }
        if (title.trim().length === 0) {
            throw new Error("Title cannot be empty");
        }
        if (title.length > 255) {
            throw new Error("Title must be 255 characters or less");
        }
    }
    validateAuthor(author) {
        if (!author || typeof author !== "string") {
            throw new Error("Author is required and must be a string");
        }
        if (author.trim().length === 0) {
            throw new Error("Author cannot be empty");
        }
        if (author.length > 255) {
            throw new Error("Author must be 255 characters or less");
        }
    }
    validateIsbn(isbn) {
        if (!isbn || typeof isbn !== "string") {
            throw new Error("ISBN is required and must be a string");
        }
        const normalizedIsbn = this.normalizeIsbn(isbn);
        if (!this.isValidIsbn(normalizedIsbn)) {
            throw new Error("Invalid ISBN format");
        }
    }
    validatePrice(price) {
        if (typeof price !== "number" || isNaN(price)) {
            throw new Error("Price must be a valid number");
        }
        if (price < 0) {
            throw new Error("Price cannot be negative");
        }
        if (price > 999999.99) {
            throw new Error("Price cannot exceed 999,999.99");
        }
    }
    validatePublicationDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Publication date must be a valid date");
        }
        const minDate = new Date("1000-01-01");
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 10); // Allow up to 10 years in the future
        if (date < minDate || date > maxDate) {
            throw new Error("Publication date must be between year 1000 and 10 years in the future");
        }
    }
    validatePageCount(pageCount) {
        if (typeof pageCount !== "number" || isNaN(pageCount)) {
            throw new Error("Page count must be a valid number");
        }
        if (pageCount < 1) {
            throw new Error("Page count must be at least 1");
        }
        if (pageCount > 50000) {
            throw new Error("Page count cannot exceed 50,000");
        }
    }
    normalizeIsbn(isbn) {
        return isbn.replace(/[-\s]/g, "");
    }
    isValidIsbn(isbn) {
        // Check ISBN-10 or ISBN-13 format
        if (isbn.length === 10) {
            return this.isValidIsbn10(isbn);
        }
        else if (isbn.length === 13) {
            return this.isValidIsbn13(isbn);
        }
        return false;
    }
    isValidIsbn10(isbn) {
        if (!/^\d{9}[\dX]$/.test(isbn)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(isbn[i]) * (10 - i);
        }
        const checkDigit = isbn[9] === "X" ? 10 : parseInt(isbn[9]);
        sum += checkDigit;
        return sum % 11 === 0;
    }
    isValidIsbn13(isbn) {
        if (!/^\d{13}$/.test(isbn)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            const digit = parseInt(isbn[i]);
            sum += digit * (i % 2 === 0 ? 1 : 3);
        }
        const checkDigit = parseInt(isbn[12]);
        const calculatedCheckDigit = (10 - (sum % 10)) % 10;
        return checkDigit === calculatedCheckDigit;
    }
}
exports.BookEntity = BookEntity;
//# sourceMappingURL=book.entity.js.map