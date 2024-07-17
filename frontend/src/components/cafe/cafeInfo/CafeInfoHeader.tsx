import Link from "@/components/generic/Link";
import UserBadge from "@/components/user/UserBadge";

interface CafeInfoHeaderProps {
  name: string;
  location: string;
  googleUrl: string;
  creatorId: string;
  rating: number;
  imageUrl: string;
}

const CafeInfoHeader = (props: CafeInfoHeaderProps) => {
  return (
    <div className="animate-appear-up">
      <div className="rounded overflow-hidden h-1/2">
        <img src={props.imageUrl} alt={props.name} />
      </div>
      <div className="flex flex-col items-start w-full gap-2">
        <h1 className="text-4xl font-bold">{props.name}</h1>
        <Link href={props.googleUrl} external>
          {props.location}
        </Link>
        <div className="flex w-full justify-between">
          <p>⭐️ {props.rating}</p>
          <UserBadge id={props.creatorId} />
        </div>
      </div>
    </div>
  );
};

CafeInfoHeader.displayName = "CafeInfoHeader";

export default CafeInfoHeader;
