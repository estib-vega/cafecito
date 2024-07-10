import { Hono } from "hono";
import { logger } from "hono/logger";
import cafe from "./routes/cafe";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.route("/api/cafe", cafe);

export default app;
