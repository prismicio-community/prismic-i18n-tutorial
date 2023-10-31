// ./src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';

export async function middleware(request: NextRequest) {
  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang) => lang.id);
  const defaultLocale = locales[0];

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
	// Don’t change the URL of Next.js assets starting with _next
  matcher: ['/((?!_next).*)'],
};