export const getShip = (
  startPosition: number,
  length: number,
  isHorizontal: boolean,
) => {
  return new Array(length).fill(0).map((_, index) => {
    const i = isHorizontal ? 1 * index : 10 * index;
    return startPosition + i;
  });
};
export const checkPosition = (
  startPosition: number,
  length: number,
  isHorizontal: boolean,
) => {
  const ship = getShip(startPosition, length, isHorizontal);
  
};

export const shipsPlacer = (
  startPosition: number,
  length: number,
  isHorizontal: boolean,
) => {
  if (checkPosition(startPosition, length, isHorizontal)) {
    return getShip(startPosition, length, isHorizontal);
  }
};
