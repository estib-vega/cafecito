import api from "@/lib/api";
import CafeCard, { CafeCardProps } from "./CafeCard";
import { useQuery } from "@tanstack/react-query";

async function fetchCafes() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await api.cafe.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch cafes");
  }
  const data = await response.json();

  return data.cafes;
}

const CafeList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["cafes"],
    queryFn: fetchCafes,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
