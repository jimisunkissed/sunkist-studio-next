import { ReactFlowDisplay } from '@/lib/component/react-flow/react-flow-display';
import React, { ReactNode } from 'react';

export function CharacterFlow(): ReactNode {
  return (
    <div className="flex flex-1 w-full gap-6">
      <ReactFlowDisplay />
    </div>
  );
}
