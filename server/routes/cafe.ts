import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  addCafe,
  createCafeSchema,
  deleteCafeById,
  findCafeById,
  getCafes,
  updateCafe,
} from "../lib/cafe";
import { createAPIError } from "../utils/errors";
import { cafeInfo } from "./cafeInfo";

export const cafe = new Hono()
  .get("/", (c) => {
    const cafes = getCafes();
    return c.json({ cafes });
  })
  .post("/", zValidator("json", createCafeSchema), (c) => {
    const cafeData = c.req.valid("json");
    const cafe = addCafe(cafeData);
    return c.json({ cafe });
  })
  .get("/:id{[0-9]+}", (c) => {
    const cafe = findCafeById(c.req.param("id"));
    if (!cafe) {
      return c.json(createAPIError("Cafe not found"), 404);
    }
    return c.json({ cafe });
  })
  .put("/:id{[0-9]+}", zValidator("json", createCafeSchema), (c) => {
    const cafeData = c.req.valid("json");
    const cafe = updateCafe(c.req.param("id"), cafeData);
    if (!cafe) {
      return c.json(createAPIError("Cafe not found"), 404);
    }
    return c.json({ cafe });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const deletedCafe = deleteCafeById(c.req.param("id"));
    if (!deletedCafe) {
      return c.json(createAPIError("Cafe not found"), 404);
    }
    return c.json({ message: "Cafe deleted", id: deletedCafe.id });
  })
  .route("/info", cafeInfo);
