import CafeForm from "@/components/cafe/CafeForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createLazyFileRoute } from "@tanstack/react-router";

const CreateCafe = () => {
  return (
    <ScrollArea type="scroll" className="h-full w-full">
      <div className="flex flex-col gap-2 px-8 pt-4">
        <h1 className="text-4xl font-bold">create café</h1>
        <CafeForm />
      </div>
      <div className="h-56"></div>
    </ScrollArea>
  );
};

export const Route = createLazyFileRoute("/create")({
  component: CreateCafe,
});
