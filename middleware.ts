import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY_HOST = "hipsana.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const response = NextResponse.next();

  // Only the live production domain may be indexed by search engines.
  // Any other host (e.g. *.vercel.app duplicates or previews) is told NOT to
  // index, preventing duplicate-content dilution per Google's SEO guidance.
  const isPrimary = host === PRIMARY_HOST || host === `www.${PRIMARY_HOST}`;
  if (!isPrimary) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
