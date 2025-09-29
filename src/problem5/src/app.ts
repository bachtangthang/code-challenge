import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { loadSingletons } from "src/configuration/infrastructure.config";
import Controller from "src/interface/controller.interface";

class App {
  private app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS middleware
    this.app.use(
      cors({
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [
          "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
      })
    );

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    this.app.use(morgan("combined"));

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Health check endpoint
    this.app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({
        status: "OK",
        message: "Book Management API is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
      });
    });
  }

  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
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

        if (error.name === "MongoError" && (error as any).code === 11000) {
          return res.status(409).json({
            success: false,
            message: "Duplicate entry found",
          });
        }

        // Default error response
        res.status(500).json({
          success: false,
          message:
            process.env.NODE_ENV === "production"
              ? "Internal Server Error"
              : error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
      }
    );

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/v1", controller.router);
    });
  }

  public async start(port: number = 3000): Promise<void> {
    try {
      // Load all necessary singleton instances
      await loadSingletons();

      // Start the server
      this.app.listen(port, () => {
        console.log(`🚀 Book Management API is running on port ${port}`);
        console.log(`📖 API Documentation: http://localhost:${port}/api`);
        console.log(`❤️  Health Check: http://localhost:${port}/health`);
        console.log(`🔗 Environment: ${process.env.NODE_ENV || "development"}`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }
}

export default App;
