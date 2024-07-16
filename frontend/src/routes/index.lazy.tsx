import CafeList from "@/components/cafe/CafeList";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <CafeList />;
}
