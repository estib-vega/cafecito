import Link from "@/components/generic/Link";
import { useCafe, useCafeInfo } from "@/components/hooks/cafeApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserBadge from "@/components/user/UserBadge";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cafe/$cafeId")({
  component: Cafe,
});

interface CafeInfoProps {
  infoId: string;
}

const CafeInfo = (props: CafeInfoProps) => {
  const { isPending, error, data } = useCafeInfo(props.infoId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

function Cafe() {
  const { cafeId } = Route.useParams();
  const { isPending, error, data } = useCafe(cafeId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ScrollArea type="scroll" className="h-full w-full">
      <div className="container pt-8 flex flex-col items-center">
        <div className="rounded overflow-hidden h-1/2 max-w-3xl">
          <img src={data.imageUrl} alt={data.name} />
        </div>
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <div>
          📍
          <Link href={data.googleUrl} external>
            {data.location}
          </Link>
        </div>
        <UserBadge id={data.creatorId} />
        <p>⭐️ {data.rating}</p>
        {data.infoId !== undefined ? <CafeInfo infoId={data.infoId} /> : null}
      </div>
      <div className="h-56"></div>
    </ScrollArea>
  );
}
