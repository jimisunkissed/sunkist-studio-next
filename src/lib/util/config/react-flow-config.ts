import { EventEdge } from '@/lib/component/react-flow/edge/event-edge';
import { CharacterAttributeNode } from '@/lib/component/react-flow/node/character-attribute-node';
import { CharacterNode } from '@/lib/component/react-flow/node/character-node';
import { LinkNode } from '@/lib/component/react-flow/node/link-node';
import { TextNode } from '@/lib/component/react-flow/node/text-node';
import { EdgeConfigProps } from '@/schema/lib/config/react-flow-config-schema';
import { Connection, Edge, MarkerType, Node } from '@xyflow/react';

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

export const EdgeConfig: EdgeConfigProps[] = [
  {
    checker: (c: Connection): boolean => c.sourceHandle === 'entity-character-event-out' && c.targetHandle === 'entity-character-event-in',
    type: 'eventEdge',
    data: { event: 'New Event' },
  },
];
