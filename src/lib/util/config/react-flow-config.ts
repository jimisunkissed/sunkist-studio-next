import { EventEdge } from '@/lib/component/react-flow/edge/event-edge';
import { ShiftEdge } from '@/lib/component/react-flow/edge/shift-edge';
import { AudioNode } from '@/lib/component/react-flow/node/audio-node';
import { CharacterAttributeNode } from '@/lib/component/react-flow/node/character-attribute-node';
import { CharacterNode } from '@/lib/component/react-flow/node/character-node';
import { CharacterRelationNode } from '@/lib/component/react-flow/node/character-relation-node';
import { ColorNode } from '@/lib/component/react-flow/node/color-node';
import { LinkNode } from '@/lib/component/react-flow/node/link-node';
import { TextNode } from '@/lib/component/react-flow/node/text-node';
import { EdgeConfigProps } from '@/schema/lib/config/react-flow-config-schema';
import { Connection, Edge, MarkerType, Node } from '@xyflow/react';

export const nodeTypes = {
  characterNode: CharacterNode,
  characterAttributeNode: CharacterAttributeNode,
  characterRelationNode: CharacterRelationNode,
  textNode: TextNode,
  linkNode: LinkNode,
  colorNode: ColorNode,
  audioNode: AudioNode,
};

export const edgeTypes = {
  eventEdge: EventEdge,
  shiftEdge: ShiftEdge,
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
    data: { event: 'Event Transition' },
  },
  {
    checker: (c: Connection): boolean => c.sourceHandle === 'portal-relation-shift-out' && c.targetHandle === 'portal-relation-shift-in',
    type: 'shiftEdge',
    data: { shift: 'Relation shift' },
  },
];
