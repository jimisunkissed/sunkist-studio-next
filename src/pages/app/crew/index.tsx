import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function CrewPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Crew" />
    </div>
  );
}

export default CrewPage;
