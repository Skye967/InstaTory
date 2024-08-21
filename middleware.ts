import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Additional custom logic can be added here if needed

    const { pathname } = req.nextUrl;

    // Redirect to login if the user is not authenticated and is trying to access the dashboard
    if (!req.nextauth.token && pathname.startsWith('/auth/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
    
  },
  
  
  {
    callbacks: {
      authorized: ({ token }) => !!token,  // This ensures only logged-in users are authorized
    },
  });

export const config = {
  matcher: ['/auth/dashboard/:path*'],  // Specify the paths that need protection
};