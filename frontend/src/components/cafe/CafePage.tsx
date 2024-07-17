import { useCafe } from "../hooks/cafeApi";
import { ScrollArea } from "../ui/scroll-area";
import CafeInfoBody from "./cafeInfo/CafeInfoBody";
import CafeInfoHeader from "./cafeInfo/CafeInfoHeader";

interface CafePageProps {
  id: string;
}

const CafePage = (props: CafePageProps) => {
  const { isPending, error, data } = useCafe(props.id);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ScrollArea type="scroll" className="h-full w-full">
      <div className="container pt-8 flex flex-col items-center max-w-3xl">
        <CafeInfoHeader
          name={data.name}
          imageUrl={data.imageUrl}
          location={data.location}
          googleUrl={data.googleUrl}
          creatorId={data.creatorId}
          rating={data.rating}
        />
        {data.infoId !== undefined ? (
          <CafeInfoBody infoId={data.infoId} />
        ) : null}
      </div>
      <div className="h-56"></div>
    </ScrollArea>
  );
};

CafePage.displayName = "CafePage";

export default CafePage;
