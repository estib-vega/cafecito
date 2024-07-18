import { CAFE_INFO_ID_KEYS, CafeAmenity, CafeInfo } from "@server/lib/cafeInfo";
import { IconName } from "./CafeInfoIcon";

export function isAmenityKey(key: keyof CafeInfo): key is CafeAmenity {
  for (const idKey of CAFE_INFO_ID_KEYS) {
    if (key === idKey) {
      return false;
    }
  }
  return true;
}

export interface AmenityInfo {
  iconName: IconName;
  content: React.ReactNode;
}