import { Database } from '@/schema/lib/config/supabase-schema';
import { DragEndEvent } from '@dnd-kit/core';
import { Edge, Node } from '@xyflow/react';

export type SelectedElementsProps = {
  edges: Edge[];
  nodes: Node[];
};

export type ReactFlowTopbarProps = {
  sheet: Database['public']['Tables']['st_flow_sheet']['Row'] | null;
};

export type ReactFlowSidebarProps = {};

export type ReactFlowBoardProps = {
  sheet: Database['public']['Tables']['st_flow_sheet']['Row'] | null;
};

export type ReactFlowBoardRef = {
  addNode: (event: DragEndEvent) => void;
};
