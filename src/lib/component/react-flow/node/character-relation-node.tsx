import { BaseNode } from '@/components/base-node';
import { LabeledHandle } from '@/components/labeled-handle';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { CharacterRelations } from '@/lib/util/config/character-config';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { Handle, NodeProps, Position, useReactFlow, useViewport } from '@xyflow/react';
import { Blend, Smile } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

export const CharacterRelationNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const router = useRouter();
  const { characters } = useAppStore();
  const { setNodes } = useReactFlow();
  const { zoom } = useViewport();

  const characterId = router?.query?.id;

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="portal-character-relation-out" position={Position.Top} type="source" />
      <div className="flex flex-col w-64 rounded-xl">
        <div className="flex w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <Blend className="h-4 w-4" />
          <Label className="font-medium">Relation</Label>
        </div>

        <div className="flex flex-col w-full p-3 gap-2 bg-white">
          <FlexSelect
            label="Character"
            size="sm"
            scale={zoom}
            Icon={Smile}
            options={Array.isArray(characters) ? characters.filter((char) => char.id !== characterId) : []}
            state={{
              value: (data?.character_id ?? '') as string,
              setValue: (v) => updateNode(setNodes, id, v, 'data,character_id'),
            }}
            itemValue={(x) => x.id}
            Item={({ prop }) => <span>{prop?.name}</span>}
          />
        </div>

        <div className="relative flex w-full items-center justify-between">
          <LabeledHandle id="portal-relation-shift-in" title="Before" position={Position.Left} type="target" className="text-[10px] mb-2" />
          <LabeledHandle id="portal-relation-shift-out" title="After" position={Position.Right} type="source" className="text-[10px] mb-2" />
        </div>

        {CharacterRelations.map((x, i) => (
          <div key={i} className="relative flex h-8 w-full border-t items-center justify-center">
            <Handle id={`portal-${x.id}-left-in`} position={Position.Left} type="target" />
            <span className="text-xs">{x.label}</span>
            <Handle id={`portal-${x.id}-right-in`} position={Position.Right} type="target" />
          </div>
        ))}
      </div>
    </BaseNode>
  );
};

export const CharacterRelationNodeOverlay = (): ReactNode => (
  <div className="flex flex-col w-64 rounded-xl border overflow-hidden bg-white">
    <div className="flex flex-col w-full">
      <div className="flex w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
        <Blend className="h-4 w-4" />
        <Label className="font-medium">Relation</Label>
      </div>

      <div className="flex flex-col w-full p-3 gap-2 bg-white">
        <FlexSelect label="Character" size="sm" Icon={Smile} />
      </div>
    </div>

    <div className="relative flex w-full items-center justify-between mb-2">
      <span className="text-[10px] ml-3">Before</span>
      <span className="text-[10px] mr-3">After</span>
    </div>

    {CharacterRelations.map((x, i) => (
      <div key={i} className="flex h-8 w-full border-t items-center justify-center">
        <span className="text-xs">{x.label}</span>
      </div>
    ))}
  </div>
);
