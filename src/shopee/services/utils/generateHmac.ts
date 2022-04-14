import { createHmac } from 'crypto';

export function generateHmac(key: string, ...data: string[] | number[]) {
  const hmac = createHmac('sha256', key);
  data.forEach((s: string | number) => hmac.update(s.toString()));

  return hmac.digest('hex');
}
