import { FileStoreSchema } from '@/schema/hooks/store-schema';
import { create } from 'zustand';

export const useFileStore = create<FileStoreSchema>((set) => ({
  appFiles: [],
  setAppFiles: (value: File[]) => set({ appFiles: value }),
}));
