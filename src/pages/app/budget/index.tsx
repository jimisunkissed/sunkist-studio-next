import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function BudgetPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Budget" />
    </div>
  );
}

export default BudgetPage;
