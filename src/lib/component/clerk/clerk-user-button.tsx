import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react';

export function ClerkUserButton(): ReactNode {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <UserButton
        appearance={{
          // baseTheme: theme === 'dark' ? dark : light,
          elements: {
            avatarBox: 'h-8 w-8',
            // userButtonPopoverCard: 'bg-white dark:bg-gray-900',
            // userButtonPopoverItem: 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
            // userButtonPopoverFooter: 'border-t border-gray-200 dark:border-gray-700',
          },
        }}
      />
    </div>
  );
}
