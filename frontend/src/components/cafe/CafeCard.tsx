import { ExternalLink } from "lucide-react";
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

interface LinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const Link = (props: LinkProps): JSX.Element => {
  return (
    <>
      <a
        href={props.href}
        target={props.external ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="underline"
      >
        {props.children}
      </a>
      {props.external && (
        <ExternalLink className="inline ml-[2px] mb-[3px]" size={"1em"} />
      )}
    </>
  );
};

export type CafeCardProps = CafeMetadata;

const CafeCard = (props: CafeCardProps): JSX.Element => {
  return (
    <Card className="max-w-96 cursor-pointer transition-colors animate-appear-up">
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
