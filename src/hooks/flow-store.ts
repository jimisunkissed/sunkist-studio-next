import { FlowStoreSchema } from '@/schema/hooks/store-schema';

let nodeIdDel: string[];
let edgeIdDel: string[];

export const flowStore: FlowStoreSchema = {
  nodeIdDel: [],
  edgeIdDel: [],
  setNodeIdDel: (value: string[]): void => {
    nodeIdDel = value;
  },
  setEdgeIdDel: (value: string[]): void => {
    edgeIdDel = value;
  },
};
