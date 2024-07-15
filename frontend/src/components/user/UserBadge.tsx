import { Badge } from "@/components/ui/badge";
import { useUser } from "../hooks/userApi";
import { Skeleton } from "../ui/skeleton";

interface UserBadgeImgProps {
  src: string | undefined;
  alt: string;
}

const UserBadgeImg: React.FC<UserBadgeImgProps> = ({ src, alt }) => {
  if (!src) {
    return null;
  }

  return (
    <div className="rounded-full overflow-hidden w-7 h-7 ml-1 mr-1">
      <img src={src} alt={alt} />
    </div>
  );
};

interface UserBadgeProps {
  id: string;
}

const UserBadge: React.FC<UserBadgeProps> = ({ id }) => {
  const { data, isPending, error } = useUser(id);

  if (isPending) {
    return <Skeleton className="h-6 w-40 rounded-xl" />;
  }

  if (error) {
    return <span className="text-error">error</span>;
  }

  return (
    <Badge variant="outline" className="pl-0">
      <UserBadgeImg src={data.imageUrl} alt={data.name} />
      <span>{data.name}</span>
    </Badge>
  );
};

UserBadge.displayName = "UserBadge";

export default UserBadge;
