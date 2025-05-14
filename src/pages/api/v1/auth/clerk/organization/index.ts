import { clerkOrgAdd, clerkOrgGet } from '@/lib/api/clerk-api';
import { onApiError, onApiSuccess } from '@/lib/util/server/api-util';
import { ClerkOrgAddSchema, ClerkOrgGetSchema } from '@/schema/pages/api/auth/clerk-schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowedMethods = ['GET', `1`];
  const method = req.method;
  if (!method || !allowedMethods.includes(method)) return onApiError(req, res, { code: 400, message: 'Request method not allowed' });

  try {
    if (method === 'GET') {
      const query = req.query;
      const validation = ClerkOrgGetSchema.safeParse(query);
      if (!validation.success) return onApiError(req, res, { code: 400, message: validation.error.issues });

      const { userId } = validation.data;
      const result = await clerkOrgGet(userId);

      return onApiSuccess(req, res, result);
    } else if (method === 'POST') {
      const body = req.body;
      const validation = ClerkOrgAddSchema.safeParse(body);
      if (!validation.success) return onApiError(req, res, { code: 400, message: validation.error.issues });

      const { name, slug, userId } = validation.data;
      const result = await clerkOrgAdd(name, slug, userId);

      return onApiSuccess(req, res, result.data);
    }
  } catch (error) {
    return onApiError(req, res, { code: 500, message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}
