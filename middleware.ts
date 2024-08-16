import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Additional custom logic can be added here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,  // This ensures only logged-in users are authorized
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/logout/:path*'],  // Specify the paths that need protection
};