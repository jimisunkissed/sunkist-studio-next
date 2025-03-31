import { Label } from '@/components/ui/label';
import { PageHeaderProps } from '@/schema/lib/component/navigation-schema';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export function PageHeader({ header }: PageHeaderProps): ReactNode {
  const { back } = useRouter();

  return (
    <div className="flex h-10 w-fit items-center gap-2 cursor-pointer" onClick={back}>
      <div className="flex h-8 w-8 bg-neutral-100 rounded-full items-center justify-center transition-transform">
        <ChevronLeft strokeWidth={3} className="h-4 w-4 text-amber-500" />
      </div>
      <Label className="text-xl font-bold cursor-pointer transition-all">{header}</Label>
    </div>
  );
}
