export declare enum BookStatusEnum {
    AVAILABLE = "available",
    OUT_OF_STOCK = "out_of_stock",
    DISCONTINUED = "discontinued"
}
export declare enum BookGenreEnum {
    FICTION = "fiction",
    NON_FICTION = "non_fiction",
    MYSTERY = "mystery",
    ROMANCE = "romance",
    SCIENCE_FICTION = "science_fiction",
    FANTASY = "fantasy",
    THRILLER = "thriller",
    HORROR = "horror",
    BIOGRAPHY = "biography",
    HISTORY = "history",
    SELF_HELP = "self_help",
    BUSINESS = "business",
    TECHNOLOGY = "technology",
    HEALTH = "health",
    COOKING = "cooking",
    TRAVEL = "travel",
    CHILDREN = "children",
    YOUNG_ADULT = "young_adult",
    POETRY = "poetry",
    DRAMA = "drama",
    OTHER = "other"
}
export interface BookEntityProps {
    id?: string;
    title: string;
    author: string;
    isbn: string;
    genre: BookGenreEnum;
    status?: BookStatusEnum;
    price: number;
    publication_date: Date;
    description?: string;
    publisher?: string;
    page_count?: number;
    create_time?: Date;
    update_time?: Date;
}
export declare class BookEntity {
    id: string;
    title: string;
    author: string;
    isbn: string;
    genre: BookGenreEnum;
    status: BookStatusEnum;
    price: number;
    publication_date: Date;
    description?: string;
    publisher?: string;
    page_count?: number;
    create_time: Date;
    update_time: Date;
    constructor(props: BookEntityProps);
    getId(): string;
    getTitle(): string;
    getAuthor(): string;
    getIsbn(): string;
    getGenre(): BookGenreEnum;
    getStatus(): BookStatusEnum;
    getPrice(): number;
    getPublicationDate(): Date;
    getDescription(): string | undefined;
    getPublisher(): string | undefined;
    getPageCount(): number | undefined;
    getCreateTime(): Date;
    getUpdateTime(): Date;
    updateTitle(title: string): void;
    updateAuthor(author: string): void;
    updatePrice(price: number): void;
    updateStatus(status: BookStatusEnum): void;
    updateDescription(description?: string): void;
    updatePublisher(publisher?: string): void;
    updatePageCount(pageCount?: number): void;
    markAsAvailable(): void;
    markAsOutOfStock(): void;
    markAsDiscontinued(): void;
    isAvailable(): boolean;
    isOutOfStock(): boolean;
    isDiscontinued(): boolean;
    isPublishedAfter(date: Date): boolean;
    isPublishedBefore(date: Date): boolean;
    isPriceInRange(min?: number, max?: number): boolean;
    getFormattedPrice(currency?: string): string;
    getAgeInYears(): number;
    toPlainObject(): Record<string, any>;
    toJSON(): Record<string, any>;
    static fromPlainObject(data: Record<string, any>): BookEntity;
    static create(props: Omit<BookEntityProps, "id" | "create_time" | "update_time">): BookEntity;
    private touch;
    private validateProps;
    private validateTitle;
    private validateAuthor;
    private validateIsbn;
    private validatePrice;
    private validatePublicationDate;
    private validatePageCount;
    private normalizeIsbn;
    private isValidIsbn;
    private isValidIsbn10;
    private isValidIsbn13;
}
//# sourceMappingURL=book.entity.d.ts.map