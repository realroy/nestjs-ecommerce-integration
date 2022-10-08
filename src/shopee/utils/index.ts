export function throwIfError(data: { error?: string; message?: string }) {
  if (data?.error?.length) {
    throw new Error(data.error + data.message);
  }
}
