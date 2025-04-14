import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateEdge } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { IconPinned } from '@tabler/icons-react';
import { EdgeProps, getBezierPath, useReactFlow, BaseEdge } from '@xyflow/react';
import { ReactNode } from 'react';

export const EventEdge = ({
  id,
  selected,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps): ReactNode => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />

      <foreignObject
        width={256}
        height={70}
        x={labelX - 128}
        y={labelY - 35}
        className={cn(
          'rounded-xl hover:ring-1 hover:ring-sky-200 transition-shadow',
          selected ? 'ring-1 ring-sky-300 hover:ring-sky-300' : ''
        )}
      >
        <div
          className={cn('nodrag flex flex-col w-64 rounded-xl border overflow-hidden bg-white transition-all', selected ? 'border-sky-300' : '')}
        >
          <div className="flex h-8 w-full border-b items-center px-3 py-2 bg-neutral-50">
            {/* <IconPinned className="h-4 w-4" /> */}
            <Label className="font-medium select-none">Event</Label>
          </div>

          <Input
            className="nodrag border-0 focus-visible:ring-0 text-xs md:text-xs"
            placeholder="None"
            value={(data?.event as string) ?? ''}
            onChange={(e) => updateEdge(setEdges, id, e.target.value, 'data,event')}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </foreignObject>
    </>
  );
};
