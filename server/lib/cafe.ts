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
      "https://www.impala-coffee.com/wp-content/uploads/Impala_Coffee_Wilmersdorfer_dokumentname_RGB_12.jpg",
    rating: 4.3,
  },
  {
    id: "2",
    creatorId: "1",
    name: "St. Oberholz",
    googleUrl: "https://maps.app.goo.gl/uJGv215QPiKX2kuQA",
    location: "Rosenthaler Str. 72A, 10119 Berlin",
    imageUrl:
      "https://img.zeit.de/entdecken/2017-06/st-oberholz-4/wide__822x462",
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
