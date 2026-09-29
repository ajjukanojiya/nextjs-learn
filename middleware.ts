import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-change-this-in-env'
);

export async function middleware(request: NextRequest) {
  // 1. Browser dwara bheji gayi HttpOnly cookie extract karein
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/dashboardNew');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // 2. Protected Route Guard (/dashboard)
  if (isProtectedRoute) {
    if (!token) {
      // Cookie nahi hai toh login par redirect
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 'jose' se token verify karein
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token invalid ya expire ho gaya hai
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Prevent Logged-in Users from visiting Login/Register
  if (isAuthRoute && token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token invalid hai toh login/register access karne do
    }
  }

  return NextResponse.next();
}

// 4. Matcher Config: Kahan-kahan middleware chalana hai
export const config = {
  matcher: ['/dashboardNew/:path*', '/login', '/register'],
};

//jo route yha difine karnega use par aplicable hoga ye 