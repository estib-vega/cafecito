export function entries<T extends Record<string, unknown>, K extends keyof T>(
  obj: T
): [K, T[K]][] {
  return Object.entries(obj) as [K, T[K]][];
}
