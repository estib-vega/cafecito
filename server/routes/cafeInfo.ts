import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  addCafeInfo,
  createCafeInfoSchema,
  deleteCafeInfoById,
  findCafeInfoById,
  updateCafeInfo,
} from "../lib/cafeInfo";
import { createAPIError } from "../utils/errors";

export const cafeInfo = new Hono()
  .get("/:id{[0-9]+}", (c) => {
    const cafeInfo = findCafeInfoById(c.req.param("id"));
    if (!cafeInfo) {
      return c.json(createAPIError("Cafe info not found"), 404);
    }
    return c.json({ cafeInfo });
  })
  .post("/", zValidator("json", createCafeInfoSchema), (c) => {
    const cafeInfoData = c.req.valid("json");
    const cafeInfo = addCafeInfo(cafeInfoData);
    return c.json({ cafeInfo });
  })
  .put("/:id{[0-9]+}", zValidator("json", createCafeInfoSchema), (c) => {
    const cafeInfoData = c.req.valid("json");
    const cafeInfo = updateCafeInfo(c.req.param("id"), cafeInfoData);
    if (!cafeInfo) {
      return c.json(createAPIError("Cafe info not found"), 404);
    }
    return c.json({ cafeInfo });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const deletedCafeInfo = deleteCafeInfoById(c.req.param("id"));
    if (!deletedCafeInfo) {
      return c.json(createAPIError("Cafe info not found"), 404);
    }
    return c.json({ message: "Cafe info deleted", id: deletedCafeInfo.id });
  });
