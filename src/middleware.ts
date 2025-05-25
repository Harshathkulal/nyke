import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/signin",
  "/signup",
  "/sso-callback",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth pages (except callback)
  if (
    userId &&
    req.nextUrl.pathname.startsWith("/auth") &&
    req.nextUrl.pathname !== "/sso-callback"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users trying to access private routes
  if (!userId && !req.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
