export default function generateTimestamp() {
  return Math.round(Date.now() / 1_000).toString();
}
