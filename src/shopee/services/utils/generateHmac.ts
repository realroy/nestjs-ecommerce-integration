import { createHmac } from 'crypto';

export default function generateHmac(key: string, ...data: string[]) {
  const hmac = createHmac('sha256', key);

  data.forEach((s: string) => (!!s ? hmac.update(s) : null));

  return hmac.digest('hex');
}
