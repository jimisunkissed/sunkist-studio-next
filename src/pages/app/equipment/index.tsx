import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function EquipmentPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Equipment" />
    </div>
  );
}

export default EquipmentPage;
