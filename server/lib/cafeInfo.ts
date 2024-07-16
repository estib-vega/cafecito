import { z } from "zod";
import type { ItemOf, NoUndefined } from "../utils/types";

const cafeInfoSchema = z.object({
  id: z.string().min(1),
  laptopFriendly: z.boolean(),
  laptopFriendlyDays: z
    .enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .array()
    .optional(),
  powerPlugs: z.boolean(),
  wifi: z.boolean(),
  wifiPassword: z.string().optional(),
  places: z.enum(["Indoor", "Outdoor", "Both"]),
  space: z.enum(["Small", "Medium", "Large"]),
  cafeRating: z.number().min(0).max(5),
  foodRating: z.number().min(0).max(5),
  atmosphereRating: z.number().min(0).max(5),
  cafeId: z.string().min(1),
});

export type CafeInfo = z.infer<typeof cafeInfoSchema>;

export type CafeLaptopFriendlyDays = ItemOf<
  NoUndefined<CafeInfo["laptopFriendlyDays"]>
>;

export type CafePlaces = CafeInfo["places"];

export type CafeSpace = CafeInfo["space"];

export const createCafeInfoSchema = cafeInfoSchema.omit({
  id: true,
});

export type CreateCafeInfoData = z.infer<typeof createCafeInfoSchema>;

const fakeCafeInfos: CafeInfo[] = [
  {
    id: "1",
    laptopFriendly: true,
    laptopFriendlyDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    powerPlugs: true,
    wifi: true,
    wifiPassword: "password",
    places: "Indoor",
    space: "Medium",
    cafeRating: 4.3,
    foodRating: 4.1,
    atmosphereRating: 4.5,
    cafeId: "1",
  },
  {
    id: "2",
    laptopFriendly: true,
    laptopFriendlyDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    powerPlugs: true,
    wifi: true,
    wifiPassword: "password",
    places: "Indoor",
    space: "Medium",
    cafeRating: 4.3,
    foodRating: 4.1,
    atmosphereRating: 4.5,
    cafeId: "2",
  },
];

function generateCafeInfoId() {
  return (fakeCafeInfos.length + 1).toString();
}

export function findCafeInfoById(id: string): CafeInfo | undefined {
  return fakeCafeInfos.find((cafeInfo) => cafeInfo.id === id);
}

export function addCafeInfo(cafeInfoData: CreateCafeInfoData): CafeInfo {
  const cafeInfo = { id: generateCafeInfoId(), ...cafeInfoData };
  fakeCafeInfos.push(cafeInfo);
  return cafeInfo;
}

export function updateCafeInfo(
  id: string,
  cafeInfoData: CreateCafeInfoData
): CafeInfo | undefined {
  const cafeInfo = findCafeInfoById(id);
  if (!cafeInfo) {
    return undefined;
  }

  Object.assign(cafeInfo, cafeInfoData);
  return cafeInfo;
}

export function deleteCafeInfoById(id: string): CafeInfo | undefined {
  const index = fakeCafeInfos.findIndex((cafeInfo) => cafeInfo.id === id);
  if (index === -1) {
    return undefined;
  }

  return fakeCafeInfos.splice(index, 1)[0];
}
