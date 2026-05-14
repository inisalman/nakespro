import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import { UserRole, dashboardPathForRole } from "@/lib/auth/roles";

const { auth } = NextAuth(authConfig);

const dashboardRoles: Record<string, UserRole> = {
  "/dashboard/patient": UserRole.PATIENT,
  "/dashboard/practitioner": UserRole.PRACTITIONER,
  "/dashboard/admin": UserRole.ADMIN,
};

export async function proxy(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;
  const userRole = session?.user?.role;

  if (pathname.startsWith("/dashboard") && !userRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/login" || pathname.startsWith("/register")) && userRole) {
    return NextResponse.redirect(new URL(dashboardPathForRole(userRole), request.url));
  }

  if (userRole) {
    for (const [prefix, role] of Object.entries(dashboardRoles)) {
      if (pathname.startsWith(prefix) && userRole !== role) {
        return NextResponse.redirect(new URL(dashboardPathForRole(userRole), request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register/:path*"],
};
