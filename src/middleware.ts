// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

//   const token = request.cookies.get('token')?.value || ''

//   if(isPublicPath && token) {
//     return NextResponse.redirect(new URL('/', request.nextUrl))
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }
    
// }

 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/login',
//     '/signup',
//     '/verifyemail'
//   ]
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths (accessible without authentication)
  const isPublicPath = ['/login', '/signup', '/verifyemail'].some((publicPath) =>
    path.startsWith(publicPath)
  );

  // Get the token from cookies
  const token = request.cookies.get('token')?.value || '';

  // If the user is authenticated and tries to access a public path, redirect to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If the user is not authenticated and tries to access a protected path, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to apply middleware to specific paths
export const config = {
  matcher: [
    '/', // Home page
    '/profile', // Profile page
    '/login', // Login page
    '/signup', // Signup page
    '/verifyemail', // Email verification page
    '/api/users/:path*', // Protect API routes under /api/users
  ],
};