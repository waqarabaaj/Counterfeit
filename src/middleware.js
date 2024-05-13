import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'


export async function middleware(request) {

    const publicPaths = ['/pages/login', '/pages/signup', '/pages/verifyemail', '/', '/pages/contact', '/pages/counterfeit'];
    const path = request.nextUrl.pathname

    const isPublicPath = publicPaths.includes(path);

    const token = request.cookies.get('token')?.value || ''


    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/pages/login', request.nextUrl))
    }




}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/pages/profile',
        '/pages/login',
        '/pages/signup',
        '/pages/counterfeit',
        '/pages/manufacturer',
        '/pages/verifyemail',
    ]
}