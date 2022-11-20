// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('token')

    if (request.nextUrl.pathname.length === 1 && request.nextUrl.pathname.startsWith('/')) {
      if (cookie) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      // console.log('cookie ', cookie) // => 'fast'

      if (!cookie) {
        // return NextResponse.redirect('/login')
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return NextResponse.next()
}