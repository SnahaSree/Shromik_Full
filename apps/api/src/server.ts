import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import { connectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

app.use(cookieParser());

app.get("/api/v1/health", (_req, res) => {
  const databaseConnected =
    mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected
      ? "SHROMIK API is healthy"
      : "Database connection is unavailable",
    data: {
      service: "api",
      database: databaseConnected
        ? "connected"
        : "disconnected",
      environment:
        process.env.NODE_ENV || "development",
    },
  });
});

app.get("/api/v1/test-error", (_req, _res) => {
  throw new Error("Intentional test error");
});

app.use(notFoundHandler);
app.use(errorHandler);
async function bootstrap(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(
      `SHROMIK API running on http://localhost:${PORT}`,
    );
  });
}

bootstrap().catch((error: unknown) => {
  console.error(
    "Failed to start SHROMIK API",
    error,
  );

  process.exit(1);
});