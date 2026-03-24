/**
 * Wait a amount of ms and eventually, return a value
 */
export const wait = <T>(ms: number, data?: T): Promise<T | undefined> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
