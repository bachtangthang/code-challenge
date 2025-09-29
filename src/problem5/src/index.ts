import App from "src/app";
import { BookController } from "src/controller/book.controller";

// Load environment variables
const PORT = parseInt(process.env.PORT || "3000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

// Create and start the application
const app = new App([new BookController()]);

// Start server
app.start(PORT).catch((error: any) => {
  console.error("Failed to start application:", error);
  process.exit(1);
});
