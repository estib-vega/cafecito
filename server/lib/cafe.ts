import { z } from "zod";

const cafeMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  location: z.string(),
  rating: z.number().min(0).max(5),
});

export type CafeMetadata = z.infer<typeof cafeMetadataSchema>;

export const createCafeSchema = cafeMetadataSchema.omit({ id: true });

export type CreateCafeData = z.infer<typeof createCafeSchema>;

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

export function getCafes(): CafeMetadata[] {
  return fakeCafes;
}

export function addCafe(cafeData: CreateCafeData): CafeMetadata {
  const cafeMetadata = { id: String(fakeCafes.length + 1), ...cafeData };
  fakeCafes.push(cafeMetadata);
  return cafeMetadata;
}

export function findCafeById(id: string): CafeMetadata | undefined {
  return fakeCafes.find((cafe) => cafe.id === id);
}

export function deleteCafeById(id: string): CafeMetadata | undefined {
  const cafeIndex = fakeCafes.findIndex((cafe) => cafe.id === id);
  if (cafeIndex === -1) {
    return undefined;
  }
  return fakeCafes.splice(cafeIndex, 1)[0];
}
