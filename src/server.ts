import http from "http";
import app from "./app.js";
import env from "./config/env.js";

const server = http.createServer(app);

async function bootstrap(): Promise<void> {
  try {
    server.listen(env.PORT, () => {console.log(`🚀 Server running successfully at http://localhost:${env.PORT} 📡 Listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

bootstrap();


// Unhandled Rejection
process.on(
  "unhandledRejection",
  (reason: unknown) => {
    console.error(
      "UNHANDLED REJECTION:",
      reason
    );

    server.close(() => {
      process.exit(1);
    });
  }
);


// Uncaught Exception
process.on(
  "uncaughtException",
  (error: Error) => {
    console.error(
      "UNCAUGHT EXCEPTION:",
      error
    );

    process.exit(1);
  }
);


// SIGTERM
process.on("SIGTERM", () => {
  console.log(
    "👋 SIGTERM received. Shutting down..."
  );

  server.close(() => {
    process.exit(0);
  });
});