import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  console.log("🔍 Middleware triggered for:", pathname);

  // Protect /studio and all its sub-routes
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    console.log("🛡️ Checking auth for studio route...");

    // Check for admin authentication cookie/token
    const adminToken = request.cookies.get("admin-authenticated");

    console.log("🍪 Admin token:", adminToken ? "EXISTS" : "NOT FOUND");

    // If not authenticated, redirect to admin login
    if (!adminToken) {
      console.log("❌ Not authenticated - redirecting to login");
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log("✅ Authenticated - allowing access");
  }

  return NextResponse.next();
}

// Match /studio AND all sub-routes
export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
