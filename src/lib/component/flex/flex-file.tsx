import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileStore } from '@/hooks/file-store';
import { CloudUpload, Plus } from 'lucide-react';
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { v4 } from 'uuid';

export function FlexFile({ fileType = 'audio/*' }): ReactNode {
  const { appFiles, setAppFiles } = useFileStore();
  const [files, setFiles] = useState<{ id: string; name: string; type: string; buffer: ArrayBuffer }[]>([]);
  console.log('files', files);

  const onFileSelect = async (fileList: FileList | null) => {
    if (!fileList) return;
    const promise = Object.values(fileList).map(async (file) => {
      const buffer = await file.arrayBuffer();
      return { id: v4(), name: file.name, type: file.type, buffer };
    });

    const fileArr = await Promise.all(promise);
    console.log('fileArr', fileArr);
    setFiles(fileArr);
  };

  return (
    <div className="flex h-24 w-full rounded-xl border">
      {!files.length ? (
        <div className="relative flex flex-col h-full w-full items-center justify-center text-neutral-400 hover:text-amber-500 transition-colors">
          <CloudUpload className="h-6 w-6" />
          <Label className="text-xs">Select Files</Label>
          <Input
            type="file"
            className="absolute z-10 top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            onChange={(e) => onFileSelect(e.target.files)}
          />
        </div>
      ) : null}
    </div>
  );
}
