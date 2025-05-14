import { Input } from '@/components/ui/input';
import { FlexFile } from '@/lib/component/flex/flex-file';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { cn } from '@/lib/utils';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function AppFilePage(): ReactNode {
  return (
    <div className={cn(pageCn)}>
      <PageHeader header="File" />

      <FlexFile />
    </div>
  );
}

export default AppFilePage;
