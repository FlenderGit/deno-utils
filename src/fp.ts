export function obj_iter_keys<T extends Record<string, any>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function obj_iter_values<T extends Record<string, any>>(
  obj: T,
): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

export function obj_iter_entries<T extends Record<string, any>>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj).map(([k, v]) => [k as keyof T, v]) as [
    keyof T,
    T[keyof T],
  ][];
}
