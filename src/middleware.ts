import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",  // <-- this is the fix!
  });

  const url = request.nextUrl.clone();
  if (!token) console.log("No token");


  if (url.pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.redirect(new URL("/sign-in", request.url));
  }


  if ((url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/myposts", "/dashboard"],
};
