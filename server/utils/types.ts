/**
 * Exclude `undefined` from the type `T`.
 *
 * @template T - The input type.
 * @returns The input type `T` without `undefined`.
 */
export type NoUndefined<T> = T extends undefined ? never : T;

/**
 * Extracts the type of individual items from an array type.
 *
 * @template T - The input type.
 * @returns The type of individual items in the array.
 */
export type ItemOf<T> = T extends Array<infer U> ? U : never;
