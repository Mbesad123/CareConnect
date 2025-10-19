import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/signup']
const PROTECTED_PREFIXES = ['/', '/patients', '/appointments', '/reports', '/settings']

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
    return NextResponse.next()
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  if (!isProtected) {
    return NextResponse.next()
  }

  const token = request.cookies.get('careconnect-token')?.value
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
