import { useQuery } from "@tanstack/react-query";
import { fetchCafes, fetchCafe, fetchCafeInfo } from "@/lib/api";

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

/**
 * Custom hook for fetching cafe data.
 * @param cafeId - The ID of the cafe to fetch.
 * @returns The result of the query.
 */
export function useCafe(cafeId: string) {
  return useQuery({
    queryKey: ["cafe", cafeId],
    queryFn: () => fetchCafe(cafeId),
  });
}

/**
 * Custom hook for fetching cafe info data.
 * @param cafeInfoId - The ID of the cafe info to fetch.
 * @returns The result of the query.
 */
export function useCafeInfo(cafeInfoId: string) {
  return useQuery({
    queryKey: ["cafeInfo", cafeInfoId],
    queryFn: () => fetchCafeInfo(cafeInfoId),
  });
}
