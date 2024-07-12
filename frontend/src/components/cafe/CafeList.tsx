import React from "react";
import api from "@/lib/api";
import CafeCard, { CafeCardProps } from "@/components/cafe/CafeCard";

const CafeList = () => {
  const [cafes, setCafes] = React.useState<CafeCardProps[]>([]);

  React.useEffect(() => {
    async function fetchCafes() {
      const response = await api.cafe.$get();
      const data = await response.json();
      setCafes(data.cafes);
    }

    fetchCafes();
  }, []);

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
