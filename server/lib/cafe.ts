import { z } from "zod";

const cafeMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  location: z.string(),
  rating: z.number().min(0).max(5),
  creatorId: z.string().min(1),
  imageUrl: z.string(),
  googleUrl: z.string(),
});

export type CafeMetadata = z.infer<typeof cafeMetadataSchema>;

export const createCafeSchema = cafeMetadataSchema.omit({
  id: true,
  creatorId: true,
});

export type CreateCafeData = z.infer<typeof createCafeSchema>;

const fakeCafes: CafeMetadata[] = [
  {
    id: "1",
    creatorId: "1",
    name: "Impala Coffee",
    googleUrl: "https://maps.app.goo.gl/uQ6hf7tju2JXsy3X6",
    location: "Wilmersdorfer Str. 67, 10629 Berlin",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipOBOQd07B3uIexXxpq9DCcsMMhvIW4hTeX5yCxP=s680-w680-h510",
    rating: 4.3,
  },
  {
    id: "2",
    creatorId: "1",
    name: "St. Oberholz",
    googleUrl: "https://maps.app.goo.gl/uJGv215QPiKX2kuQA",
    location: "Rosenthaler Str. 72A, 10119 Berlin",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipMNy25yYzCHTdNcRvxTs5u3nuq8YHC0_7O35hA=s1360-w1360-h1020-rw",
    rating: 3.8,
  },
];

export function getCafes(): CafeMetadata[] {
  return fakeCafes;
}

function generateCafeId() {
  return (fakeCafes.length + 1).toString();
}

export function addCafe(cafeData: CreateCafeData): CafeMetadata {
  const cafeMetadata = { id: generateCafeId(), ...cafeData, creatorId: "1" };
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
