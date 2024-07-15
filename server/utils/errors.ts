export interface APIError {
  errorMessage: string;
}

export function isAPIError(something: unknown): something is APIError {
  return (
    typeof something === "object" &&
    something !== null &&
    "errorMessage" in something
  );
}

export function createAPIError(errorMessage: string): APIError {
  return { errorMessage };
}
