import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request });
  const userProtectedRoutes = [
    "/admin-dashboard",
    "/admin-dashboard/category",
    "/admin-dashboard/all_sellers",
    "/admin-dashboard/all_users",
    "/admin-dashboard/all_orders",
    "/admin-dashboard/all_products",
    "/admin-dashboard/refunds_order",
    // "/admin-dashboard/category",
  ];
  if (!token && userProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL("/?error=Please login first to access this route", request.url)
    );
  }
  const tokengivenRoutes = ["/"];
  if (token && tokengivenRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
}

// const { getToken } = require("next-auth/jwt");
// const { NextRequest, NextResponse } = require("next/server");
// const { CustomUser } = require("./app/api/auth/[...nextauth]/options");

// async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   if (pathname == "/login" || pathname == "/admin/login") {
//     return NextResponse.next();
//   }

//   const token = await getToken({ req: request });

//   // Protected routes for user
//   const userProtectedRoutes = ["/"];

//   // Protected routes for admin
//   const adminProtectedRoutes = ["/admin/dashboard"];

//   if (
//     token == null &&
//     (userProtectedRoutes.includes(pathname) ||
//       adminProtectedRoutes.includes(pathname))
//   ) {
//     return NextResponse.redirect(
//       new URL(
//         "/login?error=Please login first to access this route",
//         request.url
//       )
//     );
//   }

//   // Get user from token
//   const user = (token && token.user) || null;

//   // If a user tries to access admin routes
//   if (adminProtectedRoutes.includes(pathname) && user && user.role === "User") {
//     return NextResponse.redirect(
//       new URL(
//         "/admin/login?error=Please login first to access this route.",
//         request.url
//       )
//     );
//   }

//   // If an admin tries to access user routes
//   if (userProtectedRoutes.includes(pathname) && user && user.role === "Admin") {
//     return NextResponse.redirect(
//       new URL(
//         "/login?error=Please login first to access this route.",
//         request.url
//       )
//     );
//   }
// }
