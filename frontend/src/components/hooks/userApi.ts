import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { unwrappAPIError } from "@/utils/errors";

async function fetchUser(id: string) {
  const response = await api.user[":id{[0-9]+}"].$get({ param: { id } });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to fetch user");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.user;
}

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
