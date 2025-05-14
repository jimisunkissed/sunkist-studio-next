import { BaseNode } from '@/components/base-node';
import { Label } from '@/components/ui/label';
import { FlexInput } from '@/lib/component/flex/flex-input';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { IconMoodHappy } from '@tabler/icons-react';
import { NodeProps, Position, useReactFlow } from '@xyflow/react';
import { CaseUpper, Smile, Tag } from 'lucide-react';
import React, { ReactNode, useMemo } from 'react';
import { useAppStore } from '@/hooks/app-store';
import { LabeledHandle } from '@/components/labeled-handle';
import { cn } from '@/lib/utils';

export const CharacterNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes } = useReactFlow();
  const { characters } = useAppStore();

  const name = useMemo(
    () => (Array.isArray(characters) && !!data?.character_id ? characters.find((char) => char.id === data?.character_id)?.name : undefined),
    [JSON.stringify(characters), data?.character_id]
  );

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <div className="flex flex-col w-64 rounded-xl">
        <div className="flex w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <Smile className="h-4 w-4" />
          <Label className="font-medium">Character</Label>
        </div>

        <div className="flex flex-col w-full p-3 gap-2">
          <FlexInput id="name" label="Name" size="sm" Icon={CaseUpper} state={{ value: (name ?? 'Not Found') as string }} disabled />

          <FlexInput
            id="tag"
            label="Tag"
            size="sm"
            Icon={Tag}
            state={{
              value: (data?.tag ?? '') as string,
              setValue: (v) => updateNode(setNodes, id, v, 'data,tag'),
            }}
          />
        </div>
      </div>

      <div className="relative flex w-full items-center justify-between">
        <LabeledHandle id="entity-character-event-in" title="Before" position={Position.Left} type="target" className="text-[10px] mb-2" />
        <LabeledHandle
          id="entity-character-relation-in"
          title="Relations"
          position={Position.Bottom}
          type="target"
          className="text-[10px] pb-2"
        />
        <LabeledHandle
          id="entity-character-attribute-in"
          title="Attributes"
          position={Position.Bottom}
          type="target"
          className="text-[10px] pb-2"
        />
        <LabeledHandle id="entity-character-event-out" title="After" position={Position.Right} type="source" className="text-[10px] mb-2" />
      </div>
    </BaseNode>
  );
};

export const CharacterNodeOverlay = (): ReactNode => (
  <div className="flex flex-col w-64 rounded-xl border overflow-hidden bg-white">
    <div className="flex flex-col w-full">
      <div className="flex w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
        <IconMoodHappy className="h-4 w-4" />
        <Label className="font-medium">Character</Label>
      </div>

      <div className="flex flex-col w-full p-3 gap-2">
        <FlexSelect label="Name" size="sm" Icon={CaseUpper} />
        <FlexInput id="tag" label="Tag" size="sm" Icon={Tag} />
      </div>
    </div>

    <div className="relative flex w-full items-center justify-between mb-2">
      <span className="text-[10px] ml-3">Before</span>
      <span className="text-center text-[10px]">Relations</span>
      <span className="text-center text-[10px]">Attributes</span>
      <span className="text-[10px] mr-3">After</span>
    </div>
  </div>
);
