import { AppStoreSchema } from '@/schema/hooks/app-store-schema';
import { create } from 'zustand';

export const useAppStore = create<AppStoreSchema>((set) => ({
  appId: process.env.NEXT_PUBLIC_APP_ID ?? '',
  appCode: process.env.NEXT_PUBLIC_APP_CODE ?? '',
  superUsers: ['user_2uxZBQH9VRynZT9l3iXrryaMt7z'],

  authenticated: false,
  token: '',

  organizations: null,
  organizationId: null,

  userId: '',
  email: '',
  firstName: '',
  lastName: '',

  scripts: [],
  storyCards: [],
  previz: [],

  setAuthenticated: (value: boolean) => set({ authenticated: value }),
  setToken: (value: string) => set({ token: value }),

  setOrganizations: (value: any[]) => set({ organizations: value }),
  setOrganizationId: (value: string) => set({ organizationId: value }),

  setUserId: (value: string) => set({ userId: value }),
  setEmail: (value: string) => set({ email: value }),
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),

  setScripts: (value: any[]) => set({ scripts: value }),
  setStoryCards: (value: any[]) => set({ storyCards: value }),
  setPreviz: (value: any[]) => set({ previz: value }),
}));
