// Intentionally unused for Hikaflow demo
export function neverUsed() { return 42; }
export function unreachable() {
  return;
  // eslint-disable-next-line no-console
  console.log("never runs");
}
