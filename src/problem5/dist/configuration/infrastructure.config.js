"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGateway = void 0;
exports.loadSingletons = loadSingletons;
const dataGateway = __importStar(require("../infrastructure/data-gateway/data-gateway"));
const mongodb_1 = require("../infrastructure/data-gateway/providers/mongo/mongodb");
// Global singleton instances
let mongoDb;
/**
 * Initialize all necessary singleton instances and dependencies
 */
async function loadSingletons() {
    try {
        console.log("🔄 Initializing singletons...");
        // Initialize DataGateway with MongoDB
        await initializeMongoDB();
        console.log("✅ Singletons initialized successfully");
    }
    catch (error) {
        console.error("❌ Failed to initialize singletons:", error);
        process.exit(1);
    }
}
class DataGateway extends dataGateway.DataGateway {
    constructor() {
        super({
            client: {
                mongoDb,
            },
        });
    }
}
exports.DataGateway = DataGateway;
async function initializeMongoDB() {
    mongoDb = new mongodb_1.mongoProvider({
        mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore",
        name: "bookstore",
    });
    try {
        await mongoDb.connect();
        // llogger.info(`[MONGO] Connected to: ${mongoDbEnv.primary_uri}`);
    }
    catch (error) {
        // llogger.error("[MONGO] Connection failure:", error);
        throw error;
    }
}
//# sourceMappingURL=infrastructure.config.js.map