import { isAPIError } from "@server/utils/errors";

export function unwrappAPIError(error: unknown, fallback: string): string
export function unwrappAPIError(error: unknown, fallback: undefined): string | never
export function unwrappAPIError(error: unknown, fallback?: string): string | never {
  if (isAPIError(error)) {
    return error.errorMessage;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error("An unknown error occurred");
}
