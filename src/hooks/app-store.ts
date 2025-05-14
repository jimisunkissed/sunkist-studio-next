import { AppStoreSchema } from '@/schema/hooks/store-schema';
import { Database } from '@/schema/lib/config/supabase-schema';
import { create } from 'zustand';

export const useAppStore = create<AppStoreSchema>((set) => ({
  // App Settings
  superUsers: ['user_2uxZBQH9VRynZT9l3iXrryaMt7z'],

  // Authentication
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),

  // Organization
  organizations: null,
  organizationId: null,
  setOrganizations: (value: any[]) => set({ organizations: value }),
  setOrganizationId: (value: string) => set({ organizationId: value }),

  // User
  userId: '',
  email: '',
  firstName: '',
  lastName: '',
  setUserId: (value: string) => set({ userId: value }),
  setEmail: (value: string) => set({ email: value }),
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),

  // Project Data
  scripts: [],
  characters: null,
  storyCards: [],
  previz: [],
  setScripts: (value: any[]) => set({ scripts: value }),
  setCharacters: (value: Database['public']['Tables']['st_character']['Row'][]) => set({ characters: value }),
  setStoryCards: (value: any[]) => set({ storyCards: value }),
  setPreviz: (value: any[]) => set({ previz: value }),
}));
