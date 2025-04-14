import { EventEdge } from '@/lib/component/react-flow/edge/event-edge';
import { CharacterAttributeNode } from '@/lib/component/react-flow/node/character-attribute-node';
import { CharacterNode } from '@/lib/component/react-flow/node/character-node';
import { LinkNode } from '@/lib/component/react-flow/node/link-node';
import { TextNode } from '@/lib/component/react-flow/node/text-node';
import { Edge, MarkerType, Node } from '@xyflow/react';

export const nodeTypes = {
  characterNode: CharacterNode,
  characterAttributeNode: CharacterAttributeNode,
  textNode: TextNode,
  linkNode: LinkNode,
};

export const edgeTypes = {
  eventEdge: EventEdge,
};

export const initNodes: Node[] = [];
export const initEdges: Edge[] = [];

export const EdgeAttributes = {
  animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    width: 20,
    height: 20,
  },
};
