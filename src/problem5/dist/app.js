"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const infrastructure_config_1 = require("./configuration/infrastructure.config");
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
    }
    initializeMiddlewares() {
        // Security middleware
        this.app.use((0, helmet_1.default)());
        // CORS middleware
        this.app.use((0, cors_1.default)({
            origin: process.env.ALLOWED_ORIGINS?.split(",") || [
                "http://localhost:3000",
            ],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
            credentials: true,
        }));
        // Compression middleware
        this.app.use((0, compression_1.default)());
        // Logging middleware
        this.app.use((0, morgan_1.default)("combined"));
        // Body parsing middleware
        this.app.use(express_1.default.json({ limit: "10mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
        // Health check endpoint
        this.app.get("/health", (req, res) => {
            res.status(200).json({
                status: "OK",
                message: "Book Management API is running",
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || "development",
            });
        });
    }
    initializeRoutes() {
        // API routes
        // this.app.use("/api/v1", createBookRoutes(bookController));
        // API documentation endpoint
        this.app.get("/api", (req, res) => {
            res.json({
                message: "Book Management API",
                version: "1.0.0",
                endpoints: {
                    books: {
                        "GET /api/v1/books": "List books with pagination and filters",
                        "POST /api/v1/books": "Create a new book",
                        "GET /api/v1/books/:id": "Get book by ID",
                        "PUT /api/v1/books/:id": "Update book by ID",
                        "DELETE /api/v1/books/:id": "Delete book by ID",
                    },
                },
                queryParameters: {
                    listBooks: {
                        page: "number (default: 1)",
                        limit: "number (default: 10)",
                        genre: "string (book genre)",
                        status: "string (book status)",
                        author: "string (search by author)",
                        publisher: "string (search by publisher)",
                        search: "string (full-text search)",
                        minPrice: "number (minimum price)",
                        maxPrice: "number (maximum price)",
                    },
                },
            });
        });
        // 404 handler for undefined routes
        this.app.use("*", (req, res) => {
            res.status(404).json({
                success: false,
                message: `Route ${req.method} ${req.originalUrl} not found`,
                availableRoutes: [
                    "GET /health",
                    "GET /api",
                    "GET /api/v1/books",
                    "POST /api/v1/books",
                    "GET /api/v1/books/:id",
                    "PUT /api/v1/books/:id",
                    "DELETE /api/v1/books/:id",
                ],
            });
        });
    }
    initializeErrorHandling() {
        // Global error handler
        this.app.use((error, req, res, next) => {
            console.error("Global Error Handler:", error);
            // Handle different types of errors
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    details: error.message,
                });
            }
            if (error.name === "CastError") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID format",
                });
            }
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Duplicate entry found",
                });
            }
            // Default error response
            res.status(500).json({
                success: false,
                message: process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            });
        });
        // Handle uncaught exceptions
        process.on("uncaughtException", (error) => {
            console.error("Uncaught Exception:", error);
            process.exit(1);
        });
        // Handle unhandled promise rejections
        process.on("unhandledRejection", (reason, promise) => {
            console.error("Unhandled Rejection at:", promise, "reason:", reason);
            process.exit(1);
        });
    }
    async start(port = 3000) {
        try {
            // Load all necessary singleton instances
            await (0, infrastructure_config_1.loadSingletons)();
            // Initialize routes after singletons are loaded
            this.initializeRoutes();
            // Initialize error handling
            this.initializeErrorHandling();
            // Start the server
            this.app.listen(port, () => {
                console.log(`🚀 Book Management API is running on port ${port}`);
                console.log(`📖 API Documentation: http://localhost:${port}/api`);
                console.log(`❤️  Health Check: http://localhost:${port}/health`);
                console.log(`🔗 Environment: ${process.env.NODE_ENV || "development"}`);
            });
        }
        catch (error) {
            console.error("❌ Failed to start server:", error);
            process.exit(1);
        }
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map