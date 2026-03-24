export function get_user_local(): string {
  return navigator.language || navigator.languages?.[0] || "en-US";
}
