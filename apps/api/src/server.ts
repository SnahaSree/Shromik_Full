import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { connectDatabase } from "./config/database.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SHROMIK API is healthy",
    data: {
      service: "api",
      environment: process.env.NODE_ENV || "development",
    },
  });
});

async function bootstrap(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`SHROMIK API running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error: unknown) => {
  console.error("Failed to start SHROMIK API", error);
  process.exit(1);
});