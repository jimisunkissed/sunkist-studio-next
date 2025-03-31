import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function StoryCardPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Story Card" />
    </div>
  );
}

export default StoryCardPage;
