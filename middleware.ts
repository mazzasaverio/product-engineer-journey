import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protect all routes except /api/uploadthing
const isProtectedRoute = createRouteMatcher([
  "/home(.*)",
  "/bookmarks(.*)",
  "/search(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect();
  }

  const password = request.nextUrl.searchParams.get("password");
  // if (password !== process.env.API_SECRET) {
  //   return NextResponse.json({ message: "Wrong password" }, { status: 403 });
  // }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes, but exclude /api/uploadthing
    "/(api|trpc)(.*)",
  ],
};
