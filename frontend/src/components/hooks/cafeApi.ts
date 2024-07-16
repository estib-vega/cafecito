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

async function fetchCafe(cafeId: string) {
  const response = await api.cafe[":id{[0-9]+}"].$get({
    param: { id: cafeId },
  });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to fetch cafe");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.cafe;
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

async function fetchCafeInfo(cafeInfoId: string) {
  const response = await api.cafe.info[":id{[0-9]+}"].$get({
    param: { id: cafeInfoId },
  });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to fetch cafe info");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.cafeInfo;
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
