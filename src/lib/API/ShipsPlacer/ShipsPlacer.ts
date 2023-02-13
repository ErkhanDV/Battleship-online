const notAvailableIndexesRight = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
const notAvailableIndexesLeft = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

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

export const checkPosition = (ship: number[], cellsList: number[]) => {
  const shipCells = [...ship];
  shipCells.push(...getOccupiedCells(ship));
  return shipCells.every((cell) => !cellsList.includes(cell));
};

export const getOccupiedCells = (ship: number[]) => {
  const sortedShip = [...ship].sort((a, b) => a - b);
  const length = sortedShip.length;
  const startPosition = sortedShip[0];
  const lastPosition = sortedShip[length - 1];
  const isHorizontal = sortedShip[0] + 1 == sortedShip[1] ? true : false;
  const occupiedCells: number[] = [];

  if (isHorizontal) {
    if (startPosition > 9) {
      sortedShip.forEach((id) => occupiedCells.push(id - 10));
      if (!notAvailableIndexesLeft.includes(startPosition)) {
        occupiedCells.push(startPosition - 11);
      }
      if (!notAvailableIndexesRight.includes(startPosition + length - 1)) {
        occupiedCells.push(startPosition + length - 10);
      }
    }
    if (startPosition <= 89) {
      sortedShip.forEach((id) => occupiedCells.push(id + 10));
      if (!notAvailableIndexesLeft.includes(startPosition)) {
        occupiedCells.push(startPosition + 9);
      }
      if (!notAvailableIndexesRight.includes(startPosition + length - 1)) {
        occupiedCells.push(startPosition + length + 10);
      }
    }
    if (!notAvailableIndexesLeft.includes(startPosition)) {
      occupiedCells.push(startPosition - 1);
    }
    if (!notAvailableIndexesRight.includes(startPosition + length - 1)) {
      occupiedCells.push(startPosition + length);
    }
  } else {
    if (startPosition > 9) {
      occupiedCells.push(startPosition - 10);
    }
    if (lastPosition <= 89) {
      occupiedCells.push(lastPosition + 10);
    }
    if (!notAvailableIndexesLeft.includes(startPosition)) {
      sortedShip.forEach((id) => occupiedCells.push(id - 1));
      if (startPosition > 9) {
        occupiedCells.push(startPosition - 11);
      }
      if (lastPosition <= 89) {
        occupiedCells.push(lastPosition + 9);
      }
    }
    if (!notAvailableIndexesRight.includes(startPosition)) {
      sortedShip.forEach((id) => occupiedCells.push(id + 1));
      if (startPosition > 9) {
        occupiedCells.push(startPosition - 9);
      }
      if (lastPosition <= 89) {
        occupiedCells.push(lastPosition + 11);
      }
    }
  }
  return occupiedCells;
};
