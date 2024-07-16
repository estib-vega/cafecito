import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cafe/$cafeId")({
  component: Cafe,
});

function Cafe() {
  const { cafeId } = Route.useParams();
  return <div>Hello /cafe/$cafeId! {cafeId}</div>;
}
