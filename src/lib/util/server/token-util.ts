export const createSigner = async (userId: string): Promise<string> => {
  const buffer = new TextEncoder().encode(`${process.env.NEXT_PUBLIC_APP_SIGNER}:${userId}`);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  const signer = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return signer;
};
