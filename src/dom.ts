import { err, ok, Result } from "neverthrow";

/**
 * Attach a event the FPiest way
 *
 * @param el The DOM Element
 * @param event The event to apply
 * @returns function to remove the event
 */
export function add_event<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  event: K,
  fn: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
): () => void {
  el.addEventListener(event, fn);
  return () => {
    el.removeEventListener(event, fn);
  };
}

export function query<T extends Element>(
  root: HTMLElement,
  query: string,
  error_message: string,
): Result<T, string> {
  const el = root.querySelector<T>(query);
  return el !== null ? ok(el) : err(error_message);
}
