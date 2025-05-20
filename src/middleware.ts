import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, 
  });

  const url = request.nextUrl.clone();
  if(!token) console.log("No token");
  

  if ((url.pathname === "/" || url.pathname=="/dashboard" || url.pathname=="/myposts") && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if(url.pathname === "/"){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if ((url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up")) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/myposts", "/dashboard"],
};
