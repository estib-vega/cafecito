import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CafeMetadata } from "@server/lib/cafe";
import UserBadge from "../user/UserBadge";
import Link from "../generic/Link";
import { useGotoCafe } from "../hooks/navigation";

export type CafeCardProps = CafeMetadata;

const CafeCard = (props: CafeCardProps): JSX.Element => {
  const { n, prefetch } = useGotoCafe(props.id);
  return (
    <Card
      className="max-w-96 cursor-pointer transition-colors animate-appear-up"
      onMouseEnter={prefetch}
      onClick={n}
    >
      <CardHeader>
        <div className="rounded overflow-hidden h-40">
          <img src={props.imageUrl} alt="" />
        </div>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>
          📍
          <Link href={props.googleUrl} external>
            {props.location}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserBadge id={props.creatorId} />
      </CardContent>
      <CardFooter>
        <p>⭐️ {props.rating}</p>
      </CardFooter>
    </Card>
  );
};

CafeCard.displayName = "CafeCard";

export default CafeCard;
