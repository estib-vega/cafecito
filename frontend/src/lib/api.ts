import { hc } from "hono/client";
import { type APIRoutes } from "@server/app";
import { unwrappAPIError } from "@/utils/errors";
import { CafeInfo } from "@server/lib/cafeInfo";
import { CreateCafeData } from "@server/lib/cafe";

const client = hc<APIRoutes>("/");

const api = client.api;

// =======================================================================
// USER API
// =======================================================================

/**
 * Fetches a user by their ID.
 * @param id - The ID of the user to fetch.
 * @returns A Promise that resolves to the fetched user.
 * @throws An error if the request fails or the response is not successful.
 */
export async function fetchUser(id: string) {
  const response = await api.user[":id{[0-9]+}"].$get({ param: { id } });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to fetch user");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.user;
}

// =======================================================================
// CAFE API
// =======================================================================

/**
 * Fetches the list of cafes from the API.
 * @returns A promise that resolves to an array of cafes.
 * @throws If the API request fails or returns an error.
 */
export async function fetchCafes() {
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
 * Fetches a cafe by its ID.
 * @param cafeId - The ID of the cafe to fetch.
 * @returns A Promise that resolves to the fetched cafe.
 * @throws An error if the request fails or the cafe cannot be found.
 */
export async function fetchCafe(cafeId: string) {
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
 * Creates a new cafe by sending a POST request to the API.
 * @param cafeData - The data for the cafe to be created.
 * @returns A Promise that resolves to the created cafe.
 * @throws An error if the request fails or if the response is not successful.
 */
export async function postCafe(cafeData: CreateCafeData) {
  const response = await api.cafe.$post({ json: cafeData });
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = unwrappAPIError(data, "Failed to create cafe");
    throw new Error(errorMessage);
  }
  const data = await response.json();

  return data.cafe;
}

/**
 * Fetches the cafe information for a given cafeInfoId.
 * @param cafeInfoId - The ID of the cafe information to fetch.
 * @returns A Promise that resolves to the fetched CafeInfo object.
 * @throws An error if the fetch operation fails.
 */
export async function fetchCafeInfo(cafeInfoId: string): Promise<CafeInfo> {
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
