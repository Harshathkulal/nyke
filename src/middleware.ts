import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
 
// Define route matchers
const isCheckoutRoute = createRouteMatcher(["/checkout(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/", "/shoes(.*)"]);
const isAuthRoute = createRouteMatcher(["/auth(.*)"]);

// Configure admin email and specific user ID
const ADMIN_EMAIL = "admin@example.com"; // Replace with your admin email
const SPECIFIC_USER_ID = "user_xxxx"; // Replace with your specific user ID

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const userEmail = sessionClaims?.email as string;

  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Handle checkout routes - require authentication
  if (isCheckoutRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return NextResponse.next();
  }

  // Handle admin routes - require specific email
  if (isAdminRoute(req)) {
    if (!userId || userEmail !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Handle dashboard route - require specific user ID
  if (isDashboardRoute(req)) {
    if (!userId || userId !== SPECIFIC_USER_ID) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing auth routes
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};