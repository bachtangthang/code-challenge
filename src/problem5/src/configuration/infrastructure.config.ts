import * as dataGateway from "src/infrastructure/data-gateway/data-gateway";
import { mongoProvider } from "src/infrastructure/data-gateway/providers/mongo/mongodb";

// Global singleton instances
let mongoDb: mongoProvider;

/**
 * Initialize all necessary singleton instances and dependencies
 */
export async function loadSingletons(): Promise<void> {
  try {
    // Initialize DataGateway with MongoDB
    await initializeMongoDB();

    console.log("Singletons initialized successfully");
  } catch (error) {
    console.error("Failed to initialize singletons:", error);
    process.exit(1);
  }
}

export class DataGateway extends dataGateway.DataGateway {
  constructor() {
    super({
      client: {
        mongoDb,
      },
    });
  }
}

async function initializeMongoDB(): Promise<void> {
  mongoDb = new mongoProvider({
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore",
    name: "bookstore",
  });

  try {
    await mongoDb.connect();
    // llogger.info(`[MONGO] Connected to: ${mongoDbEnv.primary_uri}`);
  } catch (error) {
    // llogger.error("[MONGO] Connection failure:", error);
    throw error;
  }
}
