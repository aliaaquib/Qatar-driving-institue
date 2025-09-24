import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

// 👇 Vercel requires a default export
export default serverless(app);
