import { stateAssign } from '@/lib/util/general/state-util';
import { Edge, Node } from '@xyflow/react';

export const deselectAllElements = (
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void,
  setEdges: (payload: Edge[] | ((edges: Edge[]) => Edge[])) => void
) => {
  setNodes((nodes) => nodes.map((node) => ({ ...node, selected: false })));
  setEdges((edges) => edges.map((edge) => ({ ...edge, selected: false })));
};

export const updateNode = (
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void,
  nodeId: string,
  value: any,
  path?: string,
  regex?: RegExp,
  isLowerCase?: boolean
): void => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id === nodeId) return stateAssign(node, value, path, regex, isLowerCase);
      else return node;
    })
  );
};

export const updateEdge = (
  setEdges: (payload: Edge[] | ((edges: Edge[]) => Edge[])) => void,
  edgeId: string,
  value: any,
  path?: string,
  regex?: RegExp,
  isLowerCase?: boolean
): void => {
  setEdges((edges) =>
    edges.map((edge) => {
      if (edge.id === edgeId) return stateAssign(edge, value, path, regex, isLowerCase);
      else return edge;
    })
  );
};

export const deleteNode = (setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void, nodeId: string): void => {
  setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
};

export const deleteEdge = (setEdges: (payload: Edge[] | ((edges: Edge[]) => Edge[])) => void, edgeId: string): void => {
  setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
};
