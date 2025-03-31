import { RootLayoutProps } from '@/schema/lib/component/layout-schema';
import { useRouter } from 'next/router';
import { Karla } from 'next/font/google';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FrontLayout } from '@/lib/component/layout/front-layout';
import { AppLayout } from '@/lib/component/layout/app-layout';
import { LightBackground } from '@/lib/component/background/light-background';

const karla = Karla({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-karla',
});

export function RootLayout({ children }: RootLayoutProps): ReactNode {
  const router = useRouter();

  const isFullScreen: boolean = !router.asPath.startsWith('/app');

  return (
    <>
      <LightBackground />
      <div className={cn(karla.className, 'flex min-h-screen h-screen w-screen')}>
        {isFullScreen ? <FrontLayout>{children}</FrontLayout> : <AppLayout>{children}</AppLayout>}
      </div>
    </>
  );
}
