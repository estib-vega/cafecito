import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { unwrappAPIError } from "@/utils/errors";

async function fetchCafes() {
  const response = await api.cafe.$get();
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to cafe list");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.cafes;
}

/**
 * Custom hook for fetching a list of cafes.
 * @returns The result of the query.
 */
export function useCafeList() {
  return useQuery({
    queryKey: ["cafes"],
    queryFn: fetchCafes,
  });
}
