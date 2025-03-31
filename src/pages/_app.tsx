import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/lib/component/layout/root-layout';
import { useEffect, useState } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded ? (
    <ClerkProvider {...pageProps} navigate={(to: string) => router.push(to)}>
      <RootLayout>
        <Component {...pageProps} />
        <Toaster />
      </RootLayout>
    </ClerkProvider>
  ) : null;
}
