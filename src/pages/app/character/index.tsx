import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import { FlexInput } from '@/lib/component/flex/flex-input';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { ThreeDots } from '@/lib/component/loader/three-dots';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { CharacterCategories } from '@/lib/util/config/character-config';
import { stateSetter } from '@/lib/util/general/state-util';
import { errorMessage } from '@/lib/util/general/string-util';
import { getCharacterTable } from '@/lib/util/helper/get-table-util';
import { cn } from '@/lib/utils';
import { Database } from '@/schema/lib/config/supabase-schema';
import { CharacterProps } from '@/schema/pages/app/character-schema';
import { buttonCn, pageCn } from '@/styles/class';
import { IconMasksTheaterOff, IconMoodHappy } from '@tabler/icons-react';
import { LetterText, Loader2, Plus, Shapes } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';

function CharacterPage(): ReactNode {
  const router = useRouter();
  const appStore = useAppStore();
  const [newCharacter, setNewCharacter] = useState<CharacterProps>({ name: '', category: '' });
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { organizationId, characters, setCharacters } = appStore;

  const initCharacters = async (): Promise<void> => {
    try {
      const res = await getCharacterTable(organizationId as string);
      setCharacters(res as Database['public']['Tables']['st_character']['Row'][]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  const addCharacter = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await sunkistAxios({
        method: 'post',
        url: '/api/v1/service/database/supabase/protected/st_character',
        body: { row: newCharacter },
      });
      setCharacters([...(characters ?? []), res]);
      toast.success('Character created!');
      setOpen(false);
    } catch (error) {
      console.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!appStore && !!organizationId) initCharacters();
  }, [!!appStore, organizationId]);

  useEffect(() => {
    if (!open) setNewCharacter({ name: '', category: '' });
  }, [open]);

  return (
    <div className={pageCn}>
      <div className="flex w-full items-center justify-between">
        <PageHeader header="Character" />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className={cn(buttonCn, 'rounded-full')}>
              <Plus />
              <span>New</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Character Details</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col w-full gap-4 my-2">
              <FlexSelect
                label="Category"
                Icon={Shapes}
                options={CharacterCategories}
                state={{ value: newCharacter.category, setValue: (v) => stateSetter(setNewCharacter, v, 'category') }}
              />

              <FlexInput
                id="name"
                label="Name"
                Icon={LetterText}
                state={{ value: newCharacter.name, setValue: (v) => stateSetter(setNewCharacter, v, 'name') }}
              />
            </div>

            <DialogFooter>
              <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className={cn(buttonCn, 'rounded-full')} onClick={addCharacter}>
                {loading && <Loader2 className="animate-spin" />}
                <span>Create</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!Array.isArray(characters) ? (
        <div className="flex flex-1 w-full items-center justify-center">
          <ThreeDots />
        </div>
      ) : characters.length <= 0 ? (
        <div className="flex flex-col flex-1 w-full items-center justify-center gap-2 text-neutral-300">
          <IconMasksTheaterOff className="h-20 w-20" />
          <Label className="text-lg font-bold">No character found</Label>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {characters.map((x, i) => (
            <div
              key={i}
              className="group flex flex-col w-full rounded-xl border overflow-hidden cursor-pointer hover:shadow transition-shadow"
              onClick={() => router.push(`/app/character/${x.id}`)}
            >
              <div className="flex aspect-[3/2] w-full items-center justify-center">
                <IconMoodHappy className="h-12 w-12 text-neutral-200 group-hover:text-yellow-400 transition-colors" />
              </div>
              <div className="flex h-10 w-full items-center justify-center bg-neutral-100">
                <span className="font-semibold">{x.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterPage;
