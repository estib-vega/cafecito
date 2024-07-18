import { useCafeInfo } from "@/components/hooks/cafeApi";
import CafeInfoAmenity from "./CafeInfoAmenity";
import { CafeInfo } from "@server/lib/cafeInfo";
import LaptopFriendly from "./amenityContent/LaptopFriendly";
import Wifi from "./amenityContent/Wifi";
import { AmenityInfo, isAmenityKey } from "./cafeInfoHelpers";

function getAmenityInformation(
  key: keyof CafeInfo,
  data: CafeInfo
): AmenityInfo | null {
  if (!isAmenityKey(key)) return null;

  switch (key) {
    case "laptopFriendly":
      return {
        iconName: "laptop",
        content: <LaptopFriendly laptopFriendly={data.laptopFriendly} />,
      };
    case "powerPlugs": {
      const iconName = "plug";
      return {
        iconName,
        content: data.powerPlugs ? "Power plugs available" : "No power plugs",
      };
    }
    case "wifi":
      return {
        iconName: "wifi",
        content: <Wifi wifi={data.wifi} />,
      };
    case "places":
      return {
        iconName: "places",
        content: `Places: ${data.places}`,
      };
    case "space":
      return {
        iconName: "space",
        content: `Space: ${data.space}`,
      };
    case "cafeRating":
      return {
        iconName: "coffee",
        content: `Cafe rating: ⭐️ ${data.cafeRating}`,
      };
    case "foodRating":
      return {
        iconName: "food",
        content: `Food rating: ⭐️ ${data.foodRating}`,
      };
    case "atmosphereRating":
      return {
        iconName: "atmosphere",
        content: `Atmosphere rating: ⭐️ ${data.atmosphereRating}`,
      };
  }
}

interface AmenitiesProps {
  data: CafeInfo;
}

const Amenities = (props: AmenitiesProps) => {
  const keys = Object.keys(props.data) as (keyof CafeInfo)[];
  return (
    <>
      {keys.map((key, i) => {
        const amenityInfo = getAmenityInformation(key, props.data);
        if (!amenityInfo) return null;
        return (
          <CafeInfoAmenity key={i} iconName={amenityInfo.iconName}>
            {amenityInfo.content}
          </CafeInfoAmenity>
        );
      })}
    </>
  );
};

interface CafeInfoBodyProps {
  infoId: string;
}

const CafeInfoBody = (props: CafeInfoBodyProps) => {
  const { isPending, error, data } = useCafeInfo(props.infoId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col items-start gap-2 animate-appear-up">
      <Amenities data={data} />
    </div>
  );
};

CafeInfoBody.displayName = "CafeInfoBody";

export default CafeInfoBody;
