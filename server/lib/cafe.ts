import { z } from "zod";

const cafeMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  location: z.string().min(1, {
    message: "Location can't be empty.",
  }),
  rating: z.coerce.number().min(0).max(5, {
    message: "Rating must be between 0 and 5.",
  }),
  creatorId: z.string().min(1),
  imageUrl: z.string().url({ message: "Invalid URL" }).min(1, {
    message: "Image URL can't be empty.",
  }),
  googleUrl: z.string().url({ message: "Invalid URL." }).min(1, {
    message: "Google URL can't be empty.",
  }),
  infoId: z.string().min(1).optional(),
});

export type CafeMetadata = z.infer<typeof cafeMetadataSchema>;

export const createCafeSchema = cafeMetadataSchema.omit({
  id: true,
  creatorId: true,
  infoId: true,
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
    infoId: "1",
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
    infoId: "2",
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

export function updateCafe(
  id: string,
  cafeData: CreateCafeData
): CafeMetadata | undefined {
  const cafe = findCafeById(id);
  if (!cafe) {
    return undefined;
  }
  Object.assign(cafe, cafeData);
  return cafe;
}

export function deleteCafeById(id: string): CafeMetadata | undefined {
  const cafeIndex = fakeCafes.findIndex((cafe) => cafe.id === id);
  if (cafeIndex === -1) {
    return undefined;
  }
  return fakeCafes.splice(cafeIndex, 1)[0];
}
