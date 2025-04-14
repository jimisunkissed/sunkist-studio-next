import { FlowStoreSchema } from '@/schema/hooks/store-schema';
import { create } from 'zustand';

export const useFlowStore = create<FlowStoreSchema>((set) => ({
  nodeIdDel: [],
  edgeIdDel: [],
  setNodeIdDel: (value: string[]) => set({ nodeIdDel: value }),
  setEdgeIdDel: (value: string[]) => set({ edgeIdDel: value }),
}));
