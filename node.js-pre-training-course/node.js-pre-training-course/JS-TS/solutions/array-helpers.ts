/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(
  source: readonly T[],
  mapper: (item: T, index: number) => R
): R[] {
  if (source === null || source === undefined) {
    throw new Error("source is null or undefined");
  }

  const result: R[] = [];
  let index = 0;

  for (const item of source) {
    result[index] = mapper(item, index);
    index++;
  }
  return result;
}

export function filterArray<T>(
  source: readonly T[],
  predicate: (item: T, index: number) => boolean
): T[] {
  if (source === null || source === undefined) {
    throw new Error("source is null or undefined");
  }
  const result: T[] = [];
  let index = 0;
  for (const item of source) {
    if (predicate(item, index)) {
      result[result.length] = item;
    }
    index++;
  }

  return result;
}

export function reduceArray<T, R>(
  source: readonly T[],
  reducer: (acc: R, item: T, index: number) => R,
  initial: R
): R {
  if (source === null || source === undefined) {
    throw new Error("source is null or undefined");
  }
  let result: R = initial;
  let index = 0;
  for (const item of source) {
    result = reducer(result, item, index);
    index++;
  }
  return result;
}

export function partition<T>(
  source: readonly T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  if (source === null || source === undefined) {
    throw new Error("source is null or undefined");
  }
  const result1: T[] = [];
  const result2: T[] = [];

  for (const item of source) {
    if (predicate(item)) {
      result1[result1.length] = item;
    } else result2[result2.length] = item;
  }

  return [result1, result2];
}

export function groupBy<T, K extends PropertyKey>(
  source: readonly T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  if (source === null || source === undefined) {
    throw new Error("source is null or undefined");
  }

  const result = {} as Record<K, T[]>;
  for (const item of source) {
    const key = keySelector(item);
    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  }
  return result;
}
