import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function TimelinePage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Timeline" />
    </div>
  );
}

export default TimelinePage;
