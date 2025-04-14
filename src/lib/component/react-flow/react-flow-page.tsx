import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/hooks/app-store';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import ReactFlowBoard from '@/lib/component/react-flow/react-flow-board';
import { ReactFlowSidebar } from '@/lib/component/react-flow/react-flow-sidebar';
import { ReactFlowTopbar } from '@/lib/component/react-flow/react-flow-topbar';
import { errorMessage } from '@/lib/util/general/string-util';
import { getCharacterTable } from '@/lib/util/helper/get-table-util';
import { ReactFlowBoardRef } from '@/schema/lib/component/react-flow-schema';
import { Database } from '@/schema/lib/config/supabase-schema';
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

export function ReactFlow(): ReactNode {
  return (
    <ReactFlowProvider>
      <ReactFlowPage />
    </ReactFlowProvider>
  );
}

function ReactFlowPage(): ReactNode {
  const { isReady, asPath } = useRouter();
  const { organizationId, characters, setCharacters } = useAppStore();

  const [sheet, setSheet] = useState<Database['public']['Tables']['st_flow_sheet']['Row'] | null>(null);
  const boardRef = useRef<ReactFlowBoardRef | null>(null);

  const getSheet = async () => {
    try {
      const [, , type, id] = asPath.split('/');
      const sheets = (await sunkistAxios({
        method: 'get',
        url: '/api/v1/service/database/supabase/protected/st_flow_sheet',
        params: {
          filters: [
            { column: 'organization_id', func: 'eq', value: organizationId },
            { column: 'content_type', func: 'eq', value: type },
            { column: 'content_id', func: 'eq', value: id },
          ],
          page: 1,
          length: 1,
        },
      })) as Database['public']['Tables']['st_flow_sheet']['Row'][];

      if (!sheets.length) {
        const newSheet = await sunkistAxios({
          method: 'post',
          url: '/api/v1/service/database/supabase/protected/st_flow_sheet',
          body: {
            row: {
              organization_id: organizationId,
              content_type: 'character',
              content_id: id,
            },
          },
        });
        setSheet(newSheet);
        return;
      }
      setSheet(sheets[0]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  const getCharacters = async (): Promise<void> => {
    try {
      const res = await getCharacterTable(organizationId as string);
      setCharacters(res as Database['public']['Tables']['st_character']['Row'][]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    boardRef.current?.addNode(event);
  };

  const DroppableContainer = ({ children }: { children: ReactNode }) => {
    const { setNodeRef } = useDroppable({
      id: 'drop-container',
    });

    return (
      <div ref={setNodeRef} className="h-full w-full">
        {children}
      </div>
    );
  };

  useEffect(() => {
    if (isReady && asPath && !!organizationId) getSheet();
  }, [isReady, asPath, organizationId]);

  useEffect(() => {
    if (!!useAppStore && !characters && !!organizationId) getCharacters();
  }, [!!useAppStore, organizationId]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-[100vh] w-[100vw]">
        <div className="relative z-10 h-12 w-full">
          <ReactFlowTopbar sheet={sheet} />
        </div>

        <div className="relative z-0 flex h-[calc(100vh-48px)] w-full">
          <div className="h-full w-16">
            <ReactFlowSidebar />
          </div>

          <Separator orientation="vertical" />

          <div className="relative flex-1 h-full">
            <DroppableContainer>
              <ReactFlowBoard ref={boardRef} sheet={sheet} />
            </DroppableContainer>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
