// middleware.js (di root directory)
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Get auth token from cookies
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/']
  
  // Admin-only routes
  const adminRoutes = ['/products', '/orders', '/verification', '/shipping', '/reports', '/display', '/payment']
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Check if current path is admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If user is authenticated but trying to access login page
  if (token && pathname === '/login') {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (userRole === 'reseller') {
      return NextResponse.redirect(new URL('/reseller', request.url))
    }
  }
  
  // If reseller trying to access admin routes
  if (token && userRole === 'reseller' && isAdminRoute) {
    return NextResponse.redirect(new URL('/reseller', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}