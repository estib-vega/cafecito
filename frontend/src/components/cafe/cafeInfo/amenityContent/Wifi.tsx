import { CafeInfo } from "@server/lib/cafeInfo";

interface WifiProps {
  wifi: CafeInfo["wifi"];
}

const Wifi = ({ wifi }: WifiProps) => {
  if (!wifi.available) {
    return <div>No wifi available</div>;
  }

  if (wifi.password === undefined) {
    return <div>Wifi available</div>;
  }

  return (
    <div className="flex flex-col items-center sm:items-start">
      <span>Wifi available with password:</span>
      <span className="font-bold">{wifi.password}</span>
    </div>
  );
};

Wifi.displayName = "Wifi";

export default Wifi;
