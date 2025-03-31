import { GetHeadersResponse, GetSessionIdProps } from '@/schema/lib/util/server/middleware-schema';
import { type NextRequest } from 'next/server';

export const getHeaders = (req: NextRequest): GetHeadersResponse => {
  const domain: string = 'data.sunkist.cloud';
  const ip: string = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '0.0.0.0';
  const userAgent: string = req.headers.get('user-agent') ?? 'Mozilla/5.0';
  const country: string = req.headers.get('x-vercel-ip-country') ?? 'ID';

  return { domain, ip, userAgent, country };
};

export const getSessionId = async ({ domain, ip, userAgent, country }: GetSessionIdProps): Promise<string> => {
  try {
    const components = [domain, ip, userAgent, country];

    const encoder = new TextEncoder();
    const data = encoder.encode(components.join('|'));
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex.slice(0, 32);
  } catch (e) {
    throw e;
  }
};
