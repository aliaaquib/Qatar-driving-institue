import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../server/routes";

// Create Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register your API routes
registerRoutes(app);

// Export for Vercel serverless
export const handler = serverless(app);
