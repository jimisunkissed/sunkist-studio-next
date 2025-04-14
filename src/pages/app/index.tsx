import { useAppStore } from '@/hooks/app-store';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode, useMemo } from 'react';

function ProjectPage(): ReactNode {
  const appStore = useAppStore();

  const currentProject = useMemo(
    () => appStore?.organizations?.find((x) => x.id === appStore?.organizationId),
    [appStore?.organizations, appStore?.organizationId]
  );

  return (
    <div className={pageCn}>
      <PageHeader header={currentProject?.name ?? 'Project'} />
    </div>
  );
}

export default ProjectPage;
