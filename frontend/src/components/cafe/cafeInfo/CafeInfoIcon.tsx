import {
  Laptop,
  Plug,
  Wifi,
  KeyRound,
  Expand,
  House,
  Coffee,
  Croissant,
  Flower2,
} from "lucide-react";

export type IconName =
  | "laptop"
  | "plug"
  | "wifi"
  | "password"
  | "space"
  | "places"
  | "coffee"
  | "food"
  | "atmosphere";

function getIcon(name: IconName): JSX.Element {
  switch (name) {
    case "laptop":
      return <Laptop />;
    case "plug":
      return <Plug />;
    case "wifi":
      return <Wifi />;
    case "password":
      return <KeyRound />;
    case "space":
      return <Expand />;
    case "places":
      return <House />;
    case "coffee":
      return <Coffee />;
    case "food":
      return <Croissant />;
    case "atmosphere":
      return <Flower2 />;
  }
}

interface CafeInfoIconProps {
  name: IconName;
}

const CafeInfoIcon = (props: CafeInfoIconProps) => {
  return (
    <div className="border box-border rounded-full p-2">
      {getIcon(props.name)}
    </div>
  );
};

CafeInfoIcon.displayName = "CafeInfoIcon";

export default CafeInfoIcon;
