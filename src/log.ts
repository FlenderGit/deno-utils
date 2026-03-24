type LogType = "trace" | "debug" | "info" | "warning" | "error" | "fatal";

type LogOptions = {};
// const DEFAULT_OPTIONS;

export function create_logger(name: string, options?: LogOptions) {
  return {
    trace: (...args: any[]) => console.log("[TRC]", name, ...args),
    debug: (...args: any[]) => console.debug("[DBG]", name, ...args),
    info: (...args: any[]) => console.log("[INF]", name, ...args),
    warning: (...args: any[]) => console.warn("[INF]", name, ...args),
    error: (...args: any[]) => console.error("[ERR]", name, ...args),
    fatal: (...args: any[]) => console.error("[FTL]", name, ...args),
  };
}
