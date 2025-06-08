import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ✅ Only protect these routes
const isProtectedRoute = createRouteMatcher([
  "/checkout",
  "/admin",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 🔒 Only protect defined routes
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ✅ All others are public
  return NextResponse.next();
});

// ✅ Simple matcher to apply middleware to everything except static files
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
