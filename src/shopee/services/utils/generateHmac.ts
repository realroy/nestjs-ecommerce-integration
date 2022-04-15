import { createHmac } from 'crypto';

export function generateHmac(key: string, ...data: (string | number)[]) {
  const hmac = createHmac('sha256', key);
  data.forEach((s: string | number) =>
    !!s ? hmac.update(s.toString()) : null,
  );

  return hmac.digest('hex');
}
