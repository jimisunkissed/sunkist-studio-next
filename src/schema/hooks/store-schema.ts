import { Database } from '@/schema/lib/config/supabase-schema';
import { ProjectProps } from '@/schema/pages/app/project-schema';

export type AppStoreSchema = {
  // App Settings
  superUsers: string[];

  // Authentication
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;

  // Organization
  organizations: ProjectProps[] | null;
  organizationId: string | null;
  setOrganizations: (value: ProjectProps[]) => void;
  setOrganizationId: (value: string) => void;

  // User
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  setUserId: (value: string) => void;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;

  // Organization Data
  scripts: any[];
  characters: Database['public']['Tables']['st_character']['Row'][] | null;
  storyCards: any[];
  previz: any[];
  setScripts: (value: any[]) => void;
  setCharacters: (value: Database['public']['Tables']['st_character']['Row'][]) => void;
  setStoryCards: (value: any[]) => void;
  setPreviz: (value: any[]) => void;
};

export type FileStoreSchema = {
  appFiles: File[];
  setAppFiles: (value: File[]) => void;
};

export type AuthStoreSchema = {
  signer: string | null;
  token: string | null;
  setSigner: (value: string | null) => void;
  setToken: (value: string | null) => void;
};

export type FlowStoreSchema = {
  nodeIdDel: string[];
  edgeIdDel: string[];
  setNodeIdDel: (value: string[]) => void;
  setEdgeIdDel: (value: string[]) => void;
};
