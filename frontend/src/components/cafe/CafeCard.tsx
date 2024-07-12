import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CafeCardProps {
  name: string;
  location: string;
  rating: number;
}

const CafeCard = (props: CafeCardProps): JSX.Element => {
  return (
    <Card className="max-w-96 cursor-pointer hover:bg-slate-50 transition-colors animate-appear-up">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.rating}</p>
      </CardContent>
      <CardFooter>
        <p>🤷🏻‍♂️</p>
      </CardFooter>
    </Card>
  );
};

CafeCard.displayName = "CafeCard";

export default CafeCard;
