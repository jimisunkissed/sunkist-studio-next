import { useAppStore } from '@/hooks/app-store';
import { BouncingBlock } from '@/lib/component/loader/bouncing-block';
import { AppSidebar } from '@/lib/component/navigation/app-sidebar';
import { errorMessage } from '@/lib/util/general/string-util';
import { AppLayoutProps } from '@/schema/lib/component/layout-schema';
import { ProjectProps } from '@/schema/pages/app/project-schema';
import { useAuth, useOrganizationList, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

export function AppLayout({ children }: AppLayoutProps): ReactNode {
  const { pathname } = useRouter();
  const appStore = useAppStore();
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const { setActive } = useOrganizationList();

  const fullpageRoute: string[] = ['/app/character/[id]/flow'];

  const appCredential = async () => {
    if (!setActive) return;

    try {
      const res = await axios.get(`/api/v1/auth/clerk/organization?userId=${user?.id}`);
      const organizations: ProjectProps[] = res.data.data.map((x: ProjectProps) => ({ id: x.id, slug: x.slug, name: x.name }));
      appStore.setOrganizations(organizations);

      const storedOrgId: string = localStorage.getItem('organizationId') || organizations?.[0]?.id || '';
      const isFound: boolean = organizations.some((x) => x.id === storedOrgId);
      const orgId: string | null = isFound ? storedOrgId : null;

      localStorage.setItem('organizationId', orgId ?? '');
      appStore.setOrganizationId(orgId ?? '');
      await setActive({ organization: orgId });

      const token: string = (await getToken()) ?? '';
      localStorage.setItem('token', token ? `Bearer ${token}` : '');
      appStore.setToken(token ? `Bearer ${token}` : '');

      appStore.setUserId(user?.id ?? '');
      appStore.setEmail(user?.emailAddresses?.[0]?.emailAddress ?? '');
      appStore.setFirstName(user?.firstName ?? '');
      appStore.setLastName(user?.lastName ?? '');

      appStore.setAuthenticated(true);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  const initializeData = async () => {
    try {
      appStore.setScripts([
        { id: 1, name: 'Version 1' },
        { id: 2, name: 'Version 2' },
      ]);
      appStore.setStoryCards([
        { id: 1, name: 'Story Card 1' },
        { id: 2, name: 'Story Card 2' },
      ]);
      appStore.setPreviz([
        { id: 1, name: 'Previz 1' },
        { id: 2, name: 'Previz 2' },
      ]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  useEffect(() => {
    if (!!appStore && isLoaded) appCredential();
  }, [!!appStore, isLoaded]);

  useEffect(() => {
    if (!!appStore) initializeData();
  }, [!!appStore]);

  return !appStore?.authenticated ? (
    <div className="fixed flex h-full w-full items-center justify-center bg-white">
      <BouncingBlock />
    </div>
  ) : fullpageRoute.includes(pathname) ? (
    <div className="fixed flex h-full w-full bg-white">{children}</div>
  ) : (
    <div className="h-full w-full p-3">
      <div className="relative flex h-full w-full gap-3">
        <div className="relative z-10 h-full bg-white rounded-2xl ring-1 ring-neutral-100 shadow-lg">
          <AppSidebar />
        </div>

        <div className="absolute z-0 top-0 left-[76px] flex flex-col h-full max-h-full w-[calc(100%-76px)] bg-white rounded-2xl ring-1 ring-neutral-100 shadow-lg overflow-scroll scrollbar-none">
          <div className="relative flex-1 m-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
