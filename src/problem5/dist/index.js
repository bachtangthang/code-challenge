"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Load environment variables
const PORT = parseInt(process.env.PORT || "3000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
// Create and start the application
const app = new app_1.default([]);
// Start server
app.start(PORT).catch((error) => {
    console.error("Failed to start application:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map