import { fetchUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching a user.
 * @param id The ID of the user to fetch.
 * @returns The result of the query.
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
}
