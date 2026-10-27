const DISALLOWED_PATHS = ["/login", "/api/auth"];

export function safeCallbackUrl(value: FormDataEntryValue | string | null | undefined) {
  const fallback = "/";
  if (typeof value !== "string") return fallback;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\") || /[\x00-\x1f\x7f]/.test(path)) {
    return fallback;
  }

  try {
    const parsed = new URL(path, "http://ziki.local");
    if (parsed.origin !== "http://ziki.local") return fallback;
    if (DISALLOWED_PATHS.some((blocked) => parsed.pathname === blocked || parsed.pathname.startsWith(`${blocked}/`))) {
      return fallback;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
