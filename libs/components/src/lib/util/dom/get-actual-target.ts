/**
 * Gets actual target from open Shadow DOM if event happened within it
 */
export function prizmGetActualTarget(event: Event): Node {
  if ('composedPath' in event) {
    return (event as unknown).composedPath()[0];
  }

  return (event as unknown).target;
}
