import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { CharacterDesign } from '@/lib/component/section/character/character-design';
import { CharacterFlow } from '@/lib/component/section/character/character-flow';
import { errorMessage } from '@/lib/util/general/string-util';
import { Database } from '@/schema/lib/config/supabase-schema';
import { CharacterTabProps } from '@/schema/pages/app/character-schema';
import { pageCn } from '@/styles/class';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

function CharacterDetailPage(): ReactNode {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [character, setCharacter] = useState<Database['public']['Tables']['st_character']['Row'] | null | undefined>(undefined);

  const id: string | undefined = useMemo(() => (router?.query?.id ?? '') as string, [router?.query]);

  const characterTab: CharacterTabProps[] = [
    {
      id: 'overview',
      label: 'Overview',
      Content: <CharacterDesign character={character} setCharacter={setCharacter} />,
    },
    { id: 'flow', label: 'Flow', Content: <CharacterFlow /> },
    { id: 'story-cards', label: 'Story Cards', Content: <></> },
  ];
  const currentTab = useMemo(() => characterTab.find((x) => x.id === activeTab) ?? characterTab[0], [activeTab, character]);

  const getCharacter = async (): Promise<void> => {
    try {
      const res = await sunkistAxios({ method: 'get', url: `/v1/cloud/supabase/protected/st_character/${id}` });
      setCharacter(res);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  useEffect(() => {
    if (id) getCharacter();
  }, [id]);

  return (
    <div className={pageCn}>
      <div className="flex w-full items-center justify-between">
        <PageHeader header="Character Detail" />
        <AnimatedTabs tabs={characterTab} defaultTab={activeTab} onChange={setActiveTab} />
      </div>

      {currentTab.Content}
    </div>
  );
}

export default CharacterDetailPage;
