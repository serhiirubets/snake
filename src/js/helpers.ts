export function loadPicture(element: HTMLImageElement, src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    element.src = src;
    element.addEventListener('load', () => resolve());
  });
}
