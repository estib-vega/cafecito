import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  addCafe,
  createCafeSchema,
  deleteCafeById,
  findCafeById,
  getCafes,
} from "../lib/cafe";

const app = new Hono();

app
  .get("/", (c) => {
    const cafes = getCafes();
    return c.json({ cafes });
  })
  .post("/", zValidator("json", createCafeSchema), async (c) => {
    const cafeData = await c.req.valid("json");
    const cafe = addCafe(cafeData);
    return c.json({ cafe });
  })
  .get("/:id{[0-9]+}", (c) => {
    const cafe = findCafeById(c.req.param("id"));
    if (!cafe) {
      return c.notFound();
    }
    return c.json({ cafe });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const deletedCafe = deleteCafeById(c.req.param("id"));
    if (!deletedCafe) {
      return c.notFound();
    }
    return c.json({ message: "Cafe deleted", id: deletedCafe.id });
  });

export default app;
