import Alert from "@/components/generic/Alert";
import { useCafeList } from "@/components/hooks/cafeApi";
import CafeCard, { CafeCardProps } from "./CafeCard";
import SkeletonCafeCard from "./SkeletonCafeCard";

const CafeList = () => {
  const { isPending, error, data } = useCafeList();

  if (isPending) {
    return (
      <div className="flex-col items-center p-8 space-y-8">
        <SkeletonCafeCard />
        <SkeletonCafeCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-col items-center p-8 space-y-8">
        <Alert type="error" title="Error" description={error.message} />
      </div>
    );
  }

  const cafes: CafeCardProps[] = data;

  return (
    <div className="flex-col items-center p-8 space-y-8">
      {cafes.map((cafe, index) => (
        <CafeCard key={index} {...cafe} />
      ))}
    </div>
  );
};

CafeList.displayName = "CafeList";

export default CafeList;
