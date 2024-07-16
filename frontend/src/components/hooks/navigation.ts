import { useNavigate, useRouter } from "@tanstack/react-router";

export interface NavigationHook {
  /**
   * Navigates to a specific route.
   */
  n: () => Promise<void>;
  /**
   * Prefetches the route.
   */
  prefetch: () => Promise<void>;
}

/**
 * Returns a function that navigates to a specific cafe.
 * @param cafeId - The ID of the cafe to navigate to.
 * @returns A function that, when called, navigates to the specified cafe.
 */
export function useGotoCafe(cafeId: string): NavigationHook {
  const router = useRouter();
  const n = useNavigate();

  const routeInfo = { to: "/cafe/$cafeId", params: { cafeId } };

  return {
    n: () => n(routeInfo),
    prefetch: async () => {
      try {
        await router.preloadRoute(routeInfo);
      } catch {
        // Ignore the error.
      }
    },
  };
}
