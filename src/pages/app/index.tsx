import { useAppStore } from '@/hooks/app-store';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { pageCn } from '@/styles/class';
import React, { ReactNode, useMemo } from 'react';

function ProjectPage(): ReactNode {
  const appState = useAppStore();

  const currentProject = useMemo(
    () => appState?.organizations?.find((x) => x.id === appState?.organizationId),
    [appState?.organizations, appState?.organizationId]
  );

  return (
    <div className={pageCn}>
      <PageHeader header={currentProject?.name ?? 'Project'} />
    </div>
  );
}

export default ProjectPage;
