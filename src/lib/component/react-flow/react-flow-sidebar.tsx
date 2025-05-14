import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useFlowStore } from '@/hooks/flow-store';
import { ColorMenu } from '@/lib/component/react-flow/menu/color-menu';
import { AudioNodeOverlay } from '@/lib/component/react-flow/node/audio-node';
import { CharacterAttributeNodeOverlay } from '@/lib/component/react-flow/node/character-attribute-node';
import { CharacterNodeOverlay } from '@/lib/component/react-flow/node/character-node';
import { CharacterRelationNodeOverlay } from '@/lib/component/react-flow/node/character-relation-node';
import { ColorNodeOverlay } from '@/lib/component/react-flow/node/color-node';
import { LinkNodeOverlay } from '@/lib/component/react-flow/node/link-node';
import { TextNodeOverlay } from '@/lib/component/react-flow/node/text-node';
import { deleteEdge, deleteNode, deselectAllElements } from '@/lib/util/helper/react-flow-util';
import { SelectedElementsProps } from '@/schema/lib/component/react-flow-schema';
import { useDraggable, DragOverlay, useDndContext } from '@dnd-kit/core';
import { IconLink, IconMessageDots, IconMovie, IconPhoto, IconTable, IconTrashX } from '@tabler/icons-react';
import { Edge, Node, useNodesInitialized, useOnSelectionChange, useReactFlow, useViewport } from '@xyflow/react';
import { ArrowLeft, AudioLines, Blend, IndentIncrease, Paintbrush, Palette, Smile } from 'lucide-react';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

export const reactFlowMenu = [
  { id: 'characterNode', name: 'Character', Icon: Smile, Overlay: CharacterNodeOverlay },
  { id: 'characterAttributeNode', name: 'Attribute', Icon: IconTable, Overlay: CharacterAttributeNodeOverlay },
  { id: 'characterRelationNode', name: 'Relation', Icon: Blend, Overlay: CharacterRelationNodeOverlay },
  { id: 'textNode', name: 'Text', Icon: IndentIncrease, Overlay: TextNodeOverlay },
  { id: 'linkNode', name: 'Link', Icon: IconLink, Overlay: LinkNodeOverlay },
  { id: 'colorNode', name: 'Color', Icon: Paintbrush, Overlay: ColorNodeOverlay },
  { id: 'audioNode', name: 'Audio', Icon: AudioLines, Overlay: AudioNodeOverlay },
  { id: 'imageNode', name: 'Image', Icon: IconPhoto },
  { id: 'videoNode', name: 'Video', Icon: IconMovie },
];

export function ReactFlowSidebar(): ReactNode {
  const { nodeIdDel, setNodeIdDel, edgeIdDel, setEdgeIdDel } = useFlowStore();
  const { setNodes, setEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const { zoom } = useViewport();
  const { active } = useDndContext();

  const [selectedElements, setSelectedElements] = useState<SelectedElementsProps>({ nodes: [], edges: [] });

  const activeId = active ? (active.id as string) : null;
  const currentElement: Node | Edge | undefined = useMemo(() => Object.values(selectedElements).flat()?.[0], [JSON.stringify(selectedElements)]);

  const Overlay = useMemo(() => reactFlowMenu.find((x) => x.id === activeId)?.Overlay ?? null, [activeId]);

  const deleteElement = (): void => {
    if (!currentElement) return;

    if ('position' in currentElement) {
      setNodeIdDel([...nodeIdDel, currentElement.id]);
      deleteNode(setNodes, currentElement.id);
    } else {
      setEdgeIdDel([...edgeIdDel, currentElement.id]);
      deleteEdge(setEdges, currentElement.id);
    }
  };

  const elementMenu = [
    {
      id: 'comment',
      name: 'Comment',
      Icon: IconMessageDots,
    },
    {
      id: 'delete',
      name: 'Delete',
      Icon: IconTrashX,
      onClick: deleteElement,
    },
  ];

  const onChange = useCallback(
    ({ nodes, edges }: SelectedElementsProps) => {
      setSelectedElements({ nodes, edges });
    },
    [nodesInitialized]
  );

  useOnSelectionChange({ onChange });

  return (
    <>
      <div className="relative flex flex-col h-full w-full overflow-x-hidden bg-neutral-50">
        {!currentElement ? (
          <div className="flex flex-col w-full p-1 gap-1">
            {reactFlowMenu.map((menu) => (
              <DndMenuItem key={menu.id} item={menu} draggable={!currentElement} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full p-1 gap-1">
            <div
              className="flex h-6 w-full rounded items-center justify-center cursor-pointer hover:bg-white transition-colors"
              onClick={() => deselectAllElements(setNodes, setEdges)}
            >
              <ArrowLeft className="h-3 w-3" />
            </div>

            <Separator />

            {currentElement?.type === 'colorNode' && <ColorMenu node={currentElement as Node} />}
            {elementMenu.map((item) => (
              <NodeMenuItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {activeId && Overlay && (
        <DragOverlay>
          <div className="opacity-80" style={{ transform: `scale(${zoom})` }}>
            <Overlay />
          </div>
        </DragOverlay>
      )}
    </>
  );
}

const DndMenuItem = ({ item, draggable = true }: { item: any; draggable?: boolean }): ReactNode => {
  const dragProps = draggable
    ? useDraggable({
        id: item.id,
        data: item,
      })
    : { attributes: {}, listeners: {}, setNodeRef: null };
  const { attributes, listeners, setNodeRef } = dragProps;

  return (
    <div
      ref={draggable ? setNodeRef : undefined}
      {...(draggable ? listeners : {})}
      {...(draggable ? attributes : {})}
      className="group flex flex-col aspect-square w-full rounded-lg items-center justify-center pt-0.5 gap-0 cursor-pointer hover:border-2 hover:border-amber-300 hover:bg-white transition-all"
      onClick={() => (!!item?.onClick ? item.onClick() : null)}
    >
      <item.Icon className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
      <span className="text-[9px] text-neutral-500 group-hover:text-black transition-all">{item.name}</span>
    </div>
  );
};

const NodeMenuItem = ({ item }: { item: any }): ReactNode => {
  return (
    <div
      className="group flex flex-col aspect-square w-full rounded-lg items-center justify-center pt-0.5 gap-0 cursor-pointer hover:border-2 hover:border-amber-300 hover:bg-white transition-all"
      onClick={() => (!!item?.onClick ? item.onClick() : null)}
    >
      <item.Icon className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
      <span className="text-[9px] text-neutral-500 group-hover:text-black transition-all">{item.name}</span>
    </div>
  );
};
