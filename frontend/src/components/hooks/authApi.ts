import { fetchMe } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAuthMe() {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: fetchMe,
  });
}
