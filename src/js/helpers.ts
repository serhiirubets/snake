export function loadPicture(element: HTMLImageElement, src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    element.src = src;
    element.addEventListener('load', () => resolve());
  });
}

export function getRandomInteger(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
