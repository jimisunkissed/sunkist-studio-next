import { stateAssign } from '@/lib/util/general/state-util';
import { Connection, Edge, Node } from '@xyflow/react';

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

// Entity:
//    To Entity : entity-[name]-[purpose]-[direction]
//    To Portal : entity-[name]-[purpose]-in
// Portal:
//    To Entity : portal-[name]-[purpose]-out
//    To Value  : portal-[name]-[position]-in
// Value:
//    To Portal : value-[name]-[position]-out

export const isValidConnection = (connection: Connection): boolean => {
  const source = (connection?.sourceHandle ?? '').split('-');
  const target = (connection?.targetHandle ?? '').split('-');
  if ([0, 1, 2, 3].some((x) => !source[x] || !target[x])) return false;
  if (source[3] !== 'out' && target[3] !== 'in') return false;

  const levelPairs = [
    { source: 'entity', target: 'entity' },
    { source: 'portal', target: 'entity' },
    { source: 'value', target: 'portal' },
  ];
  const pair = levelPairs.find((pair) => pair.source === source[0] && pair.target === target[0]);

  if (!pair) return false;
  if (pair.target === 'entity' && (source[1] !== target[1] || source[2] !== target[2])) return false;

  return true;
};
