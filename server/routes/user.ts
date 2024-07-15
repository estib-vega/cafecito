import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  addUser,
  createUserSchema,
  deleteUserById,
  findUserById,
} from "../lib/user";
import { createAPIError } from "../utils/errors";

export const user = new Hono()
  .get("/:id{[0-9]+}", async (c) => {
    const id = c.req.param("id");
    const user = await findUserById(id);
    if (!user) {
      return c.json(createAPIError("User not found"), 404);
    }
    return c.json({ user });
  })
  .post("/", zValidator("json", createUserSchema), async (c) => {
    const userData = await c.req.valid("json");
    const user = addUser(userData);
    return c.json({ user });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const deletedUser = await deleteUserById(c.req.param("id"));
    if (!deletedUser) {
      return c.json(createAPIError("User not found"), 404);
    }
    return c.json({ message: "User deleted", id: deletedUser.id });
  });
