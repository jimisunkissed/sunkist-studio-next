import { SunkistBaseURL } from '@/lib/api/sunkist-api';
import { onApiError, onApiSuccess } from '@/lib/util/server/api-util';
import { ClerkSessionSchema } from '@/schema/pages/api/auth/clerk-schema';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return onApiError(req, res, 'Request method not allowed');
  const body = req.body;

  const validation = ClerkSessionSchema.safeParse(body);
  if (!validation.success) return onApiError(req, res, { code: 400, message: validation.error.issues });

  try {
    const { signer, token } = validation.data;
    const serviceToken = await axios.post(`${SunkistBaseURL}/public/auth/clerk/token`, { appId: process.env.NEXT_PUBLIC_APP_ID, signer, token });

    return onApiSuccess(req, res, serviceToken.data);
  } catch (error) {
    return onApiError(req, res, error);
  }
}
