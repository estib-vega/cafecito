import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { cafe } from "./routes/cafe";
import { user } from "./routes/user";
import { auth } from "./routes/auth";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/cafe", cafe)
  .route("/user", user)
  .route("/auth", auth);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;

export type APIRoutes = typeof apiRoutes;
