import { createHmac } from 'node:crypto';

export default function getSignedPath(
  secret: string,
  pathName: string,
  params: Record<string, any>,
) {
  const sortedParams = Object.entries(params).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB),
  );

  const search = new URLSearchParams(sortedParams);
  const pathNameWithSearch = `${pathName}?${search}`;

  const hmac = createHmac('sha256', secret);

  const signed = hmac.update(pathNameWithSearch).digest('hex');

  return `${pathNameWithSearch}&signed=${signed}`;
}
