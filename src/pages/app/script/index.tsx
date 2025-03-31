import { Button } from '@/components/ui/button';
import { useAppStore } from '@/hooks/app-store';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { cn } from '@/lib/utils';
import { buttonCn, pageCn } from '@/styles/class';
import { IconNotes } from '@tabler/icons-react';
import { Plus } from 'lucide-react';
import React, { ReactNode } from 'react';

function ScriptPage(): ReactNode {
  const appState = useAppStore();

  return (
    <div className={pageCn}>
      <div className="flex w-full items-center justify-between">
        <PageHeader header="Script" />
        <Button className={cn(buttonCn, 'rounded-full')}>
          <Plus />
          <span>New</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {appState?.scripts?.map((x, i) => (
          <div key={i} className="group flex flex-col w-full rounded-xl border overflow-hidden cursor-pointer hover:shadow transition-shadow">
            <div className="flex aspect-[3/2] w-full items-center justify-center">
              <IconNotes className="h-12 w-12 text-neutral-500 group-hover:text-amber-500 transition-colors" />
            </div>
            <div className="flex h-10 w-full items-center justify-center bg-neutral-100">
              <span className="font-semibold">{x?.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScriptPage;
