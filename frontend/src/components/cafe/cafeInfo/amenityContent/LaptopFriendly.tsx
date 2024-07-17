import { CafeInfo } from "@server/lib/cafeInfo";

interface LaptopFriendlyProps {
  laptopFriendly: CafeInfo["laptopFriendly"];
}

const LaptopFriendly = ({ laptopFriendly }: LaptopFriendlyProps) => {
  if (!laptopFriendly.accepted) {
    return <div>Not laptops accepted</div>;
  }

  if (laptopFriendly.days === undefined) {
    return <div>Laptops accepted</div>;
  }

  if (laptopFriendly.days.length === 7) {
    return <div>Laptops accepted everyday</div>;
  }

  return (
    <div className="flex flex-col items-center sm:items-start gap-2">
      <span>Laptops accepted on:</span>
      <div className="flex gap-2">
        {laptopFriendly.days.map((d) => (
          <div
            className="rounded-full border border-primary w-8 h-8 flex justify-center items-center text-xs"
            key={d}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

LaptopFriendly.displayName = "LaptopFriendly";

export default LaptopFriendly;
