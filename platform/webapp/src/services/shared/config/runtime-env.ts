export function getApiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
    const v = process.env.NEXT_PUBLIC_API_URL.trim();
    if (v) return v;
  }
  return 'http://127.0.0.1:4000';
}
