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
    <Card>
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

const CafeList = () => {
  const cafes = [
    { name: "Cafe 1", location: "Location 1", rating: 5 },
    { name: "Cafe 2", location: "Location 2", rating: 4 },
    { name: "Cafe 3", location: "Location 3", rating: 3 },
  ];
  return (
    <div className="flex-col items-center p-8 space-y-8">
      {cafes.map((cafe, index) => (
        <CafeCard key={index} {...cafe} />
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <header className="flex p-8">
        <h1 className="text-4xl font-bold">cafecito</h1>
      </header>
      <main>
        <CafeList />
      </main>
    </>
  );
}

export default App;
