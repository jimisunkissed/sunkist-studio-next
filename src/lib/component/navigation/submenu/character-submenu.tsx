import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { errorMessage } from '@/lib/util/general/string-util';
import { getCharactersByOrg } from '@/lib/util/helper/get-table-util';
import { Database } from '@/schema/lib/config/supabase-schema';
import { Frown, Loader2, Smile } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

export function CharacterSubmenuBody(): ReactNode {
  const router = useRouter();
  const appStore = useAppStore();
  const { organizationId, characters, setCharacters } = appStore;

  const getCharacters = async (): Promise<void> => {
    try {
      const res = await getCharactersByOrg(organizationId as string);
      setCharacters(res as Database['public']['Tables']['st_character']['Row'][]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  useEffect(() => {
    if (!!appStore && !characters && !!organizationId) getCharacters();
  }, [!!appStore, organizationId]);

  return (
    <div className="flex flex-col h-full w-full gap-1">
      {!Array.isArray(characters) ? (
        <div className="flex h-48 w-full items-center justify-center">
          <Loader2 className="h-12 w-12 text-neutral-300 animate-spin" />
        </div>
      ) : characters.length === 0 ? (
        <div className="flex flex-col h-48 w-full items-center justify-center gap-2 text-neutral-300">
          <Frown className="h-12 w-12" />
          <Label>No character found</Label>
        </div>
      ) : (
        characters?.map((x, i) => (
          <Button key={i} size="sm" variant="ghost" className="group justify-start" onClick={() => router.push(`/app/character/${x.id}`)}>
            <Smile className="h-4 w-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
            <span>{x?.name}</span>
          </Button>
        ))
      )}
    </div>
  );
}
