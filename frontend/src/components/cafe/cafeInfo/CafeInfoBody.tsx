import { useCafeInfo } from "@/components/hooks/cafeApi";
import CafeInfoAmenity from "./CafeInfoAmenity";
import { CAFE_INFO_ID_KEYS, CafeAmenity, CafeInfo } from "@server/lib/cafeInfo";
import { IconName } from "./CafeInfoIcon";

function isAmenityKey(key: keyof CafeInfo): key is CafeAmenity {
  for (const idKey of CAFE_INFO_ID_KEYS) {
    if (key === idKey) {
      return false;
    }
  }
  return true;
}

interface AmenityInfo {
  iconName: IconName;
  content: React.ReactNode;
}

function getAmenityInformation(
  key: keyof CafeInfo,
  data: CafeInfo
): AmenityInfo | null {
  if (!isAmenityKey(key)) return null;

  switch (key) {
    case "laptopFriendly": {
      const iconName = "laptop";

      if (!data.laptopFriendly.accepted) {
        return {
          iconName,
          content: "Not laptops accepted",
        };
      }

      if (data.laptopFriendly.days === undefined) {
        return {
          iconName,
          content: "Laptops accepted",
        };
      }

      if (data.laptopFriendly.days?.length === 7) {
        return {
          iconName,
          content: "Laptops accepted everyday",
        };
      }

      return {
        iconName,
        content: `Laptops accepted on ${data.laptopFriendly.days.join(", ")}`,
      };
    }
    case "powerPlugs": {
      const iconName = "plug";
      return {
        iconName,
        content: data.powerPlugs ? "Power plugs available" : "No power plugs",
      };
    }
    case "wifi": {
      const iconName = "wifi";

      if (!data.wifi.available) {
        return {
          iconName,
          content: "No wifi available",
        };
      }

      if (data.wifi.password === undefined) {
        return {
          iconName,
          content: "Wifi available",
        };
      }

      return {
        iconName,
        content: `Wifi available with password: ${data.wifi.password}`,
      };
    }
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
        content: `Cafe rating: ${data.cafeRating}`,
      };
    case "foodRating":
      return {
        iconName: "food",
        content: `Food rating: ${data.foodRating}`,
      };
    case "atmosphereRating":
      return {
        iconName: "atmosphere",
        content: `Atmosphere rating: ${data.atmosphereRating}`,
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
    <div className="w-full flex flex-col items-start gap-2">
      <Amenities data={data} />
    </div>
  );
};

CafeInfoBody.displayName = "CafeInfoBody";

export default CafeInfoBody;
