import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import cafe from "./routes/cafe";

const app = new Hono();

app.use("*", logger());

app.route("/api/cafe", cafe);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
