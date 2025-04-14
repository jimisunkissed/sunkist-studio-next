import { Separator } from '@/components/ui/separator';
import { useFlowStore } from '@/hooks/flow-store';
import { CharacterAttributeNodeOverlay } from '@/lib/component/react-flow/node/character-attribute-node';
import { CharacterNodeOverlay } from '@/lib/component/react-flow/node/character-node';
import { LinkNodeOverlay } from '@/lib/component/react-flow/node/link-node';
import { TextNodeOverlay } from '@/lib/component/react-flow/node/text-node';
import { deleteEdge, deleteNode, deselectAllElements } from '@/lib/util/helper/react-flow-util';
import { SelectedElementsProps } from '@/schema/lib/component/react-flow-schema';
import { useDraggable, DragOverlay, useDndContext } from '@dnd-kit/core';
import {
  IconBrush,
  IconLink,
  IconMessageDots,
  IconMoodHappy,
  IconMovie,
  IconNotes,
  IconPhoto,
  IconTable,
  IconTrashX,
  IconWaveSine,
} from '@tabler/icons-react';
import { Edge, Node, useNodesInitialized, useOnSelectionChange, useReactFlow, useViewport } from '@xyflow/react';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

export function ReactFlowSidebar(): ReactNode {
  const { nodeIdDel, setNodeIdDel, edgeIdDel, setEdgeIdDel } = useFlowStore();
  const { setNodes, setEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const { zoom } = useViewport();
  const { active } = useDndContext();

  const [selectedElements, setSelectedElements] = useState<SelectedElementsProps>({ nodes: [], edges: [] });

  const activeId = active ? (active.id as string) : null;
  const currentElement: Node | Edge | undefined = useMemo(() => Object.values(selectedElements).flat()?.[0], [JSON.stringify(selectedElements)]);

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

  const reactFlowMenu = [
    { id: 'characterNode', name: 'Character', Icon: IconMoodHappy, Overlay: CharacterNodeOverlay },
    { id: 'characterAttributeNode', name: 'Attribute', Icon: IconTable, Overlay: CharacterAttributeNodeOverlay },
    { id: 'textNode', name: 'Text', Icon: IconNotes, Overlay: TextNodeOverlay },
    { id: 'linkNode', name: 'Link', Icon: IconLink, Overlay: LinkNodeOverlay },
    { id: 'colorNode', name: 'Color', Icon: IconBrush },
    { id: 'audioNode', name: 'Audio', Icon: IconWaveSine },
    { id: 'imageNode', name: 'Image', Icon: IconPhoto },
    { id: 'videoNode', name: 'Video', Icon: IconMovie },
  ];
  const elementMenu = [
    { id: 'comment', name: 'Comment', Icon: IconMessageDots },
    { id: 'trash', name: 'Trash', Icon: IconTrashX, onClick: deleteElement },
  ];
  const Overlay = useMemo(() => reactFlowMenu.find((x) => x.id === activeId)?.Overlay ?? null, [activeId]);

  const onChange = useCallback(
    ({ nodes, edges }: SelectedElementsProps) => {
      setSelectedElements({ nodes, edges });
    },
    [nodesInitialized]
  );

  useOnSelectionChange({ onChange });

  return (
    <div className="flex flex-col h-full w-full items-center p-1 gap-1 overflow-x-hidden bg-neutral-50">
      {!currentElement ? (
        reactFlowMenu.map((x) => <MenuItem key={x.id} item={x} draggable={!currentElement} />)
      ) : (
        <>
          <div
            className="flex h-6 w-full rounded items-center justify-center cursor-pointer hover:bg-white transition-colors"
            onClick={() => deselectAllElements(setNodes, setEdges)}
          >
            <ArrowLeft className="h-3 w-3" />
          </div>
          <Separator />
          {elementMenu.map((x) => (
            <MenuItem key={x.id} item={x} draggable={!currentElement} />
          ))}
        </>
      )}

      {activeId && Overlay && (
        <DragOverlay>
          <div className="opacity-80" style={{ transform: `scale(${zoom})` }}>
            <Overlay />
          </div>
        </DragOverlay>
      )}
    </div>
  );
}

const MenuItem = ({ item, draggable = true }: { item: any; draggable?: boolean }): ReactNode => {
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
