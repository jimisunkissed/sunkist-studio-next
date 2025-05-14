import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { FlexInput } from '@/lib/component/flex/flex-input';
import { nonUrlRegex, stateSetter } from '@/lib/util/general/state-util';
import { convertToSlug, errorMessage } from '@/lib/util/general/string-util';
import { cn } from '@/lib/utils';
import { SetState, State } from '@/schema/lib/util/general/state-util-schema';
import { buttonCn } from '@/styles/class';
import { IconFolder, IconMailFast } from '@tabler/icons-react';
import axios from 'axios';
import { LetterText, Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

export function ProjectSubmenuHeader(): ReactNode {
  const { superUsers, userId } = useAppStore();
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const addProject = async (): Promise<void> => {
    setLoading(true);
    try {
      const req = {
        name,
        slug: convertToSlug(name),
        userId,
      };
      await axios.post('/api/v1/clerk/auth/organization', req);
      setOpen(false);
    } catch (error) {
      console.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) setName('');
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" className={cn(buttonCn, 'h-6 w-6 rounded-full')} disabled={!superUsers.includes(userId)}>
            <Plus className="max-h-3.5 max-w-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col w-full gap-4 my-2">
            <FlexInput
              id="name"
              label="Name"
              Icon={LetterText}
              state={{ value: name, setValue: (v) => stateSetter(setName as SetState<State>, v, '', nonUrlRegex) }}
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className={cn(buttonCn, 'rounded-full')} onClick={addProject}>
              {loading && <Loader2 className="animate-spin" />}
              <span>Create</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ProjectSubmenuBody(): ReactNode {
  const router = useRouter();
  const { organizations, organizationId, setOrganizationId } = useAppStore();

  const selectProject = (orgId: string): void => {
    localStorage.setItem('organizationId', orgId);
    setOrganizationId(orgId);
    setTimeout(() => {
      router.push('/app').then(() => window.location.reload());
    }, 25);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full items-center gap-2 mb-1">
          <Label>Invitation</Label>
        </div>
        {[{ name: 'Ayat-ayat Cinta' }]?.map((x, i) => (
          <Button key={i} size="sm" variant="ghost" className="group justify-start">
            <IconMailFast className="h-4 w-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
            <span>{x?.name}</span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full items-center gap-2 mb-1">
          <Label>Member</Label>
        </div>
        {organizations?.map((x, i) => (
          <Button key={i} size="sm" variant="ghost" className="group justify-start" onClick={() => selectProject(x.id)}>
            <IconFolder className="h-4 w-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
            <span>{x?.name}</span>

            {x.id === organizationId && <div className="h-2 w-2 rounded-full ml-auto bg-emerald-500" />}
          </Button>
        ))}
      </div>
    </div>
  );
}
