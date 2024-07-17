import CafePage from "@/components/cafe/CafePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cafe/$cafeId")({
  component: Cafe,
});

function Cafe() {
  const { cafeId } = Route.useParams();
  return <CafePage id={cafeId} />;
}
