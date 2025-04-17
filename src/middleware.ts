import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/login",
  "/sign-up",
];
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const pathName = request.nextUrl.pathname;

  if (!sessionCookie) {
    if (authRoutes.includes(pathName)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (protectedRoutes.includes(pathName)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard",
    "/forgot-password",
    "/reset-password",
    "/login",
    "/sign-up",
  ],
};
