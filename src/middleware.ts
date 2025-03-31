import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher(['/app(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!protectedRoutes(req)) return NextResponse.next();

  const credential = await auth();
  if (!credential.userId) return NextResponse.redirect(new URL('/', req.url));

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
