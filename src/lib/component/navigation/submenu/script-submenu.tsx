import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { IconNotes } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

export function ScriptSubmenuBody(): ReactNode {
  const appStore = useAppStore();

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex w-full items-center gap-2 mb-1">
        <Label>Drafts</Label>
      </div>
      {appStore?.scripts?.map((x, i) => (
        <Button key={i} size="sm" variant="ghost" className="group justify-start">
          <IconNotes className="h-4 w-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
          <span>{x?.name}</span>
        </Button>
      ))}
    </div>
  );
}
