import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonCafeCard = (): JSX.Element => {
  return (
    <Card className="max-w-96 cursor-pointer hover:bg-slate-50 transition-colors animate-appear-up">
      <CardHeader>
        <Skeleton className="h-8 w-[250px] rounded-xl" />
        <Skeleton className="h-6 w-80 rounded-xl" />
      </CardHeader>
      <CardContent>
      <Skeleton className="h-6 w-8 rounded-xl" />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

SkeletonCafeCard.displayName = "CafeCard";

export default SkeletonCafeCard;
