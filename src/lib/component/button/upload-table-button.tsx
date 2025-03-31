import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { buttonCn } from '@/styles/class';
import { IconExclamationCircle, IconFileTypeXls, IconFileUpload, IconTable } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

export function UploadTableButton(): ReactNode {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonCn, 'w-28')}>
          <IconFileUpload />
          <span>File</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full gap-2 mt-2">
          <div className="flex h-10 w-full rounded-lg items-center justify-center px-2 gap-2 bg-yellow-100 text-yellow-600">
            <IconExclamationCircle className="h-6 w-6" />
            <span className="text-xs font-medium">Uploading a file will reset your table</span>
          </div>

          <Button size="sm" variant="ghost" className="rounded-full">
            <IconTable className="h-3 w-3" />
            <span className="text-xs">Download table format</span>
          </Button>

          <div className="relative flex flex-col h-48 w-full rounded-xl border border-dashed items-center justify-center gap-2 cursor-pointer bg-neutral-50 hover:bg-neutral-100 border-neutral-300 text-neutral-400 hover:text-emerald-500 transition-all">
            <>
              <IconFileTypeXls className="h-12 w-12" />
              <Label className="text-xs font-medium">Select .xlsx file</Label>
            </>
            <Input
              type="file"
              accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" className="rounded-full">
            Cancel
          </Button>
          <Button className={cn(buttonCn, 'rounded-full')}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
