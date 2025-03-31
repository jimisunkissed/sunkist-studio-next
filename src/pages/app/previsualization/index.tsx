import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function PrevisualizationPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Previsualization" />
    </div>
  );
}

export default PrevisualizationPage;
