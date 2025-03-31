import { ProjectProps } from '@/schema/pages/app/project-schema';

export type AppStoreSchema = {
  appId: string;
  appCode: string;
  superUsers: string[];

  authenticated: boolean;
  token: string;

  organizations: ProjectProps[] | null;
  organizationId: string | null;

  userId: string;
  email: string;
  firstName: string;
  lastName: string;

  scripts: any[];
  storyCards: any[];
  previz: any[];

  setAuthenticated: (value: boolean) => void;
  setToken: (value: string) => void;

  setOrganizations: (value: ProjectProps[]) => void;
  setOrganizationId: (value: string) => void;

  setUserId: (value: string) => void;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;

  setScripts: (value: any[]) => void;
  setStoryCards: (value: any[]) => void;
  setPreviz: (value: any[]) => void;
};
