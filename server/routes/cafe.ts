import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const cafeMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  location: z.string(),
  rating: z.number().min(0).max(5),
});

type CafeMetadata = z.infer<typeof cafeMetadataSchema>;

const createCafeSchema = cafeMetadataSchema.omit({ id: true });

const fakeCafes: CafeMetadata[] = [
  {
    id: "1",
    name: "Cafe 1",
    location: "Location 1",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Cafe 2",
    location: "Location 2",
    rating: 4.0,
  },
];

const app = new Hono();

app
  .get("/", (c) => {
    return c.json({ cafes: fakeCafes });
  })
  .post("/", zValidator("json", createCafeSchema), async (c) => {
    const cafe = await c.req.valid("json");
    fakeCafes.push({ id: String(fakeCafes.length + 1), ...cafe });
    return c.json({ cafe });
  })
  .get("/:id{[0-9]+}", (c) => {
    const cafe = fakeCafes.find((cafe) => cafe.id === c.req.param("id"));
    if (!cafe) {
      return c.notFound();
    }
    return c.json({ cafe });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const cafeIndex = fakeCafes.findIndex(
      (cafe) => cafe.id === c.req.param("id")
    );
    if (cafeIndex === -1) {
      return c.notFound();
    }
    fakeCafes.splice(cafeIndex, 1);
    return c.json({ message: "Cafe deleted" });
  });

export default app;
