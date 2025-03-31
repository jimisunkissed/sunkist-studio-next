import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClerkUserButton } from '@/lib/component/clerk/clerk-user-button';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { IconChairDirector } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export function FrontNavbar(): ReactNode {
  const router = useRouter();

  return (
    <div className="sticky z-10 top-0 flex h-16 w-full items-center px-6 py-3 gap-4 bg-white">
      <div className="flex w-fit items-end gap-2 mr-auto">
        <IconChairDirector strokeWidth={2} className="size-8 text-amber-500" />
        <Label className="text-lg text-neutral-600 font-black pb-0.5">sunkist studio</Label>
      </div>

      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="ghost">Register</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <Button variant="ghost" onClick={() => router.push('/app')}>
          App
        </Button>
        <ClerkUserButton />
      </SignedIn>
    </div>
  );
}
