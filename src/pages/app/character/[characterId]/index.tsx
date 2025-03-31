import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode } from 'react';

function CharacterDetailPage(): ReactNode {
  return (
    <div className={pageCn}>
      <PageHeader header="Character Detail" />
    </div>
  );
}

export default CharacterDetailPage;
