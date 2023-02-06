import { DragEvent } from 'react';

export const dragOverHandler = (event: DragEvent<HTMLDivElement>, horizontalRotation: Boolean, shipLength: number) => {
  event.preventDefault();
  const notAvailableIndexesRight = [9, 19, 29, 39, 49, 59, 69, 79, 89];
  const notAvailableIndexesLeft = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = event.target.parentElement;
  const delta1 = 10;
  const delta2 = 20;
  const delta3 = 30;
  if (!horizontalRotation) {
    switch (shipLength) {
      case 2:
        if (!parent.childNodes[targetId + delta1]) {
          target.classList.add('red');
        }
        if (parent.childNodes[targetId + delta1]) {
          target.classList.add('green');
          parent.childNodes[targetId + delta1].classList.add('green');
        }
        break;
      case 3:
        if (!parent.childNodes[targetId + delta1] && !parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
        }
        if (parent.childNodes[targetId + delta1] && !parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
          parent.childNodes[targetId + delta1].classList.add('red');
        }
        if (!parent.childNodes[targetId + delta1] && parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
          parent.childNodes[targetId + delta2].classList.add('red');
        }
        if (parent.childNodes[targetId + delta1] && parent.childNodes[targetId + delta2]) {
          target.classList.add('green');
          parent.childNodes[targetId + delta1].classList.add('green');
          parent.childNodes[targetId + delta2].classList.add('green');
        }
        break;
      case 4:
        if (
          !parent.childNodes[targetId + delta1] &&
          !parent.childNodes[targetId + delta2] &&
          !parent.childNodes[targetId + delta3]
        ) {
          target.classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          !parent.childNodes[targetId + delta2] &&
          !parent.childNodes[targetId + delta3]
        ) {
          target.classList.add('red');
          parent.childNodes[targetId + delta1].classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          parent.childNodes[targetId + delta2] &&
          !parent.childNodes[targetId + delta3]
        ) {
          target.classList.add('red');
          parent.childNodes[targetId + delta1].classList.add('red');
          parent.childNodes[targetId + delta2].classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          parent.childNodes[targetId + delta2] &&
          parent.childNodes[targetId + delta3]
        ) {
          target.classList.add('green');
          parent.childNodes[targetId + delta1].classList.add('green');
          parent.childNodes[targetId + delta2].classList.add('green');
          parent.childNodes[targetId + delta3].classList.add('green');
        }
        break;
    }
  } else {
    const delta1 = 1;
    const delta2 = -1;
    const delta3 = -2;
    const elements = [
      parent.childNodes[targetId + delta1],
      parent.childNodes[targetId + delta2],
      parent.childNodes[targetId + delta3],
    ];
    switch (shipLength) {
      case 2:
        if (!parent.childNodes[targetId + delta2] || Math.floor(targetId / 10) !== Math.floor((targetId - 1) / 10)) {
          target.classList.add('red');
        } else {
          target.classList.add('green');
          parent.childNodes[targetId + delta2].classList.add('green');
        }
        break;
      case 3:
        if (!parent.childNodes[targetId + delta1] && !parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
        }
        if (parent.childNodes[targetId + delta1] && !parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
          parent.childNodes[targetId + delta1].classList.add('red');
        }
        if (!parent.childNodes[targetId + delta1] && parent.childNodes[targetId + delta2]) {
          target.classList.add('red');
          parent.childNodes[targetId + delta2].classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          parent.childNodes[targetId + delta2] &&
          notAvailableIndexesRight.includes(targetId)
        ) {
          target.classList.add('red');
          parent.childNodes[targetId + delta2].classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          parent.childNodes[targetId + delta2] &&
          notAvailableIndexesLeft.includes(targetId)
        ) {
          target.classList.add('red');
          parent.childNodes[targetId + delta1].classList.add('red');
        }
        if (
          parent.childNodes[targetId + delta1] &&
          parent.childNodes[targetId + delta2] &&
          !notAvailableIndexesRight.includes(targetId) &&
          !notAvailableIndexesLeft.includes(targetId)
        ) {
          target.classList.add('green');
          parent.childNodes[targetId + delta1].classList.add('green');
          parent.childNodes[targetId + delta2].classList.add('green');
        }
        break;
      case 4:
        if (notAvailableIndexesRight.includes(targetId)) {
          target.classList.add('red');
          elements.filter((element, index) => element && index > 0).forEach((element) => element.classList.add('red'));
        }
        if (notAvailableIndexesLeft.includes(targetId) || notAvailableIndexesLeft.includes(targetId - 1)) {
          target.classList.add('red');
          elements
            .filter((element) => Number(element.id) >= Math.floor(targetId / 10) * 10)
            .forEach((element) => element.classList.add('red'));
        }
        if (!elements.every((element) => element)) {
          target.classList.add('red');
          elements.filter((element) => element).forEach((element) => element.classList.add('red'));
        }
        if (
          elements.every((element) => element) &&
          !notAvailableIndexesRight.includes(Number(target.id)) &&
          !notAvailableIndexesLeft.includes(Number(target.id)) &&
          !notAvailableIndexesLeft.includes(Number(target.id) - 1)
        ) {
          target.classList.add('green');
          elements.forEach((element) => element.classList.add('green'));
        }
        break;
    }
  }
};

export const dragEndHandler = (event: DragEvent<HTMLDivElement>, horizontalRotation: Boolean, shipLength: number) => {
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = target.parentElement as HTMLDivElement;
  const delta1 = !horizontalRotation ? 10 : 1;
  const delta2 = !horizontalRotation ? 20 : -1;
  const delta3 = !horizontalRotation ? 30 : -2;
  switch (shipLength) {
    case 2:
      target.classList.remove('green', 'red');
      if (parent.childNodes[targetId + delta2]) {
        parent.childNodes[targetId + delta2].classList.remove('green', 'red');
      }
      break;
    case 3:
      target.classList.remove('green', 'red');
      const neighbor1 = parent.childNodes[targetId + delta1] as HTMLDivElement;
      const neighbor2 = parent.childNodes[targetId + delta2] as HTMLDivElement;
      if (neighbor1) {
        neighbor1.classList.remove('green', 'red');
      }
      if (neighbor2) {
        neighbor2.classList.remove('green', 'red');
      }
      break;
    case 4:
      target.classList.remove('green', 'red');
      if (parent.childNodes[targetId + delta1]) {
        parent.childNodes[targetId + delta1].classList.remove('green', 'red');
      }
      if (parent.childNodes[targetId + delta2]) {
        parent.childNodes[targetId + delta2].classList.remove('green', 'red');
      }
      if (parent.childNodes[targetId + delta3]) {
        parent.childNodes[targetId + delta3].classList.remove('green', 'red');
      }
      break;
  }
};

export const dropHadler = (event: DragEvent<HTMLDivElement>, horizontalRotation: Boolean, shipLength: number) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const children = event.target.parentNode.childNodes;
  const parent = event.target.parentElement;
  if (!horizontalRotation) {
    switch (shipLength) {
      case 2:
        if (children[targetId + 10]) {
          children[targetId].classList.add('ship-1');
          children[targetId + 10].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId + 10]) {
            parent.childNodes[targetId + 10].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 3:
        if (children[targetId + 10] && children[targetId + 20]) {
          children[targetId].classList.add('ship-1');
          children[targetId + 10].classList.add('ship-1');
          children[targetId + 20].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId + 10]) {
            parent.childNodes[targetId + 10].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId + 20]) {
            parent.childNodes[targetId + 20].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 4:
        if (children[targetId + 10] && children[targetId + 20] && children[targetId + 30]) {
          children[targetId].classList.add('ship-1');
          children[targetId + 10].classList.add('ship-1');
          children[targetId + 20].classList.add('ship-1');
          children[targetId + 30].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId + 10]) {
            parent.childNodes[targetId + 10].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId + 20]) {
            parent.childNodes[targetId + 20].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId + 30]) {
            parent.childNodes[targetId + 30].classList.remove('green', 'red');
          }
          return;
        }
        break;
    }
  } else {
    const notAvailableIndexesRight = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    const notAvailableIndexesLeft = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    switch (shipLength) {
      case 2:
        if (notAvailableIndexesRight.includes(targetId) || notAvailableIndexesLeft.includes(targetId)) {
          children[targetId].classList.remove('red');
          children[targetId - 1].classList.remove('red');
          return;
        } else if (children[targetId - 1]) {
          children[targetId].classList.add('ship-1');
          children[targetId - 1].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId - 1]) {
            parent.childNodes[targetId - 1].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 3:
        if (notAvailableIndexesRight.includes(targetId) || notAvailableIndexesLeft.includes(targetId)) {
          children[targetId].classList.remove('red');
          children[targetId + 1].classList.remove('red');
          children[targetId - 1].classList.remove('red');
          return;
        } else if (children[targetId + 1] && children[targetId - 1]) {
          children[targetId].classList.add('ship-1');
          children[targetId + 1].classList.add('ship-1');
          children[targetId - 1].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId + 1]) {
            parent.childNodes[targetId + 1].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId - 1]) {
            parent.childNodes[targetId - 1].classList.remove('green', 'red');
          }
          return;
        }
        break;
      case 4:
        if (notAvailableIndexesRight.includes(targetId) || notAvailableIndexesLeft.includes(targetId)) {
          children[targetId].classList.remove('red');
          children[targetId + 1].classList.remove('red');
          children[targetId - 1].classList.remove('red');
          children[targetId - 2].classList.remove('red');
          return;
        } else if (
          children[targetId + 1] &&
          children[targetId - 1] &&
          children[targetId - 2] &&
          Math.floor((targetId - 2) / 10) === Math.floor(targetId / 10)
        ) {
          children[targetId].classList.add('ship-1');
          children[targetId + 1].classList.add('ship-1');
          children[targetId - 1].classList.add('ship-1');
          children[targetId - 2].classList.add('ship-1');
        } else {
          target.classList.remove('green', 'red');
          if (parent.childNodes[targetId + 1]) {
            parent.childNodes[targetId + 1].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId - 1]) {
            parent.childNodes[targetId - 1].classList.remove('green', 'red');
          }
          if (parent.childNodes[targetId - 2]) {
            parent.childNodes[targetId - 2].classList.remove('green', 'red');
          }
          return;
        }
        break;
    }
  }
};
