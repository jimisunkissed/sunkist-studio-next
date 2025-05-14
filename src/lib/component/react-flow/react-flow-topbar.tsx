import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppStore } from '@/hooks/app-store';
import { useFlowStore } from '@/hooks/flow-store';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import { errorMessage, kebabCaseToText } from '@/lib/util/general/string-util';
import { cn } from '@/lib/utils';
import { ReactFlowTopbarProps } from '@/schema/lib/component/react-flow-schema';
import { buttonCn } from '@/styles/class';
import { IconSitemap } from '@tabler/icons-react';
import { useReactFlow } from '@xyflow/react';
import { Loader2 } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { toast } from 'sonner';

export function ReactFlowTopbar({ sheet }: ReactFlowTopbarProps): ReactNode {
  const { organizationId } = useAppStore();
  const { nodeIdDel, setNodeIdDel, edgeIdDel, setEdgeIdDel } = useFlowStore();
  const { getNodes, getEdges } = useReactFlow();
  const [loading, setLoading] = useState<boolean>(false);

  const saveSheet = async () => {
    if (!sheet || !organizationId) return;
    setLoading(true);
    try {
      const nodes = getNodes().map((node) => ({
        id: node.id,
        organization_id: organizationId,
        flow_sheet_id: sheet.id,
        type: node.type,
        position_x: Math.round(node.position.x),
        position_y: Math.round(node.position.y),
        data: node.data,
      }));
      const edges = getEdges()
        .filter((edge) => nodes.some((node) => node.id === edge.source) && nodes.some((node) => node.id === edge.target))
        .map((edge) => ({
          id: edge.id,
          organization_id: organizationId,
          flow_sheet_id: sheet.id,
          type: edge.type ?? null,
          source: edge.source,
          source_handle: edge.sourceHandle,
          target: edge.target,
          target_handle: edge.targetHandle,
          data: edge.data,
        }));

      const nodePromise = [];
      if (nodes.length)
        nodePromise.push(
          sunkistAxios({
            method: 'put',
            url: '/v1/cloud/supabase/protected/st_flow_node',
            body: {
              rows: nodes,
            },
          })
        );
      if (nodeIdDel.length)
        nodePromise.push(
          sunkistAxios({
            method: 'delete',
            url: '/v1/cloud/supabase/protected/st_flow_node',
            body: {
              ids: nodeIdDel,
            },
          })
        );
      await Promise.all(nodePromise);
      setNodeIdDel([]);

      const edgePromise = [];
      if (edges.length)
        edgePromise.push(
          sunkistAxios({
            method: 'put',
            url: '/v1/cloud/supabase/protected/st_flow_edge',
            body: {
              rows: edges,
            },
          })
        );
      if (edgeIdDel.length)
        edgePromise.push(
          sunkistAxios({
            method: 'delete',
            url: '/v1/cloud/supabase/protected/st_flow_edge',
            body: {
              ids: edgeIdDel,
            },
          })
        );
      await Promise.all(edgePromise);
      setEdgeIdDel([]);

      toast.success('Flow chart successfully saved!');
    } catch (error) {
      console.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex h-full w-full items-center px-5 gap-2 bg-white"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <IconSitemap strokeWidth={2} className="size-6 text-amber-500" />
      {!!sheet ? <Label className="text-md font-semibold">{kebabCaseToText(sheet.content_type)}</Label> : <Skeleton className="h-6 w-24" />}

      <Button size="sm" className={cn(buttonCn, 'h-7 rounded-full ml-auto')} disabled={loading} onClick={saveSheet}>
        {loading && <Loader2 className="animate-spin" />}
        <span>Save</span>
      </Button>
    </div>
  );
}
