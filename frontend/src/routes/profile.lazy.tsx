import { useAuthMe } from "@/components/hooks/authApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createLazyFileRoute } from "@tanstack/react-router";

const Profile = () => {
  const { isPending, data, error } = useAuthMe();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <ScrollArea type="scroll" className="h-full w-full">
      <div className="flex flex-col gap-2 px-8 pt-4">
        <h1 className="text-4xl font-bold">profile</h1>
        <Profile />
      </div>
    </ScrollArea>
  );
};

export const Route = createLazyFileRoute("/profile")({
  component: ProfilePage,
});
