import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

async function fetchCafes() {
  const response = await api.cafe.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch cafe list");
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
