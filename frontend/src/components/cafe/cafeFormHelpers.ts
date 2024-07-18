import { CreateCafeData } from "@server/lib/cafe";

type CreateCafeDataKey = keyof CreateCafeData;

interface CafeFormItemInfo {
  name: string;
  placeholder: string;
  description?: string;
  type?: string;
  min?: number;
  max?: number;
}

export const cafeFormItems: Record<CreateCafeDataKey, CafeFormItemInfo> = {
  name: {
    name: "Name",
    placeholder: "my café",
  },
  googleUrl: {
    name: "Google URL",
    placeholder: "https://maps.app.goo.gl/myCafeUrl",
    description: "Google URL of the café.",
  },
  location: {
    name: "Location",
    placeholder: "Wilmersdorfer Str. 67, 10629 Berlin",
    description: "Full address of the café.",
  },
  imageUrl: {
    name: "Image URL",
    placeholder: "https://www.exampl.com/cafe.jpg",
    description: "Image URL of the café.",
  },
  rating: {
    name: "Rating",
    placeholder: "4.3",
    type: "number",
    min: 0,
    max: 5,
  },
};
