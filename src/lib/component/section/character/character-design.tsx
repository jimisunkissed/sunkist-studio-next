import { Label } from '@/components/ui/label';
import { FlexInput } from '@/lib/component/flex/flex-input';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { FlexTextarea } from '@/lib/component/flex/flex-textarea';
import { CharacterCategories } from '@/lib/util/config/character-config';
import { stateSetter } from '@/lib/util/general/state-util';
import { SetState, State } from '@/schema/lib/util/general/state-util-schema';
import { CharacterDesignProps } from '@/schema/pages/app/character-schema';
import { LetterText, Loader2, Shapes, Smile } from 'lucide-react';
import React, { ReactNode } from 'react';

export function CharacterDesign({ character, setCharacter }: CharacterDesignProps): ReactNode {
  return (
    <div className="flex flex-1 w-full gap-6">
      <div className="flex flex-col h-full max-h-full w-80 min-w-80 rounded-xl overflow-hidden bg-neutral-50">
        <div className="flex h-10 w-full items-center px-4 bg-neutral-200">
          <Label className="text-md font-semibold">Profile</Label>
        </div>

        <div className="flex flex-col flex-1 max-h-[calc(100vh-192px)] w-full overflow-y-auto">
          <div className="flex flex-col h-full min-h-fit w-full p-5 gap-5">
            {!character ? (
              <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-12 w-12 text-neutral-400 animate-spin" />
              </div>
            ) : (
              <>
                <div className="aspect-square w-full rounded-xl border-[1.5px] overflow-hidden">
                  {character?.image ? (
                    <img src={character.image} alt="profile image" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white">
                      <Smile className="h-12 w-12 text-yellow-400" />
                    </div>
                  )}
                </div>

                <FlexSelect
                  label="Category"
                  Icon={Shapes}
                  options={CharacterCategories}
                  state={{
                    value: character?.category,
                    setValue: (v) => {
                      stateSetter(setCharacter as SetState<State>, v, 'category');
                      stateSetter(setCharacter as SetState<State>, CharacterCategories.find((cat) => cat.label === v)?.priority, 'priority');
                    },
                  }}
                  itemValue={(value) => value.label}
                  Item={({ prop }) => <span>{prop.label}</span>}
                />

                <FlexInput
                  id="name"
                  label="Name"
                  Icon={LetterText}
                  state={{ value: character?.name, setValue: (v) => stateSetter(setCharacter as SetState<State>, v, 'name') }}
                />

                <FlexTextarea
                  id="description"
                  label="Description"
                  height="flex-1"
                  Icon={LetterText}
                  state={{ value: character?.description, setValue: (v) => stateSetter(setCharacter as SetState<State>, v, 'description') }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
