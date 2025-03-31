import { nonUrlRegex, slugRegex } from '@/lib/util/general/state-util';
import { z } from 'zod';

export const orgViewSchema = z.object({
  userId: z.string(),
});

export const orgAddSchema = z.object({
  name: z
    .string()
    .max(256, { message: 'Organization name cannot exceed 256 characters' })
    .refine((value) => nonUrlRegex.test(value), { message: 'Organization name cannot contain URLs or HTML tags' }),
  slug: z
    .string()
    .max(256, { message: 'Organization name cannot exceed 256 characters' })
    .refine((value) => slugRegex.test(value), { message: "Organization slug can only contain lowercase alphanumeric and dash '-'" }),
  userId: z.string(),
});
