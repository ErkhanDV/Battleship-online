import { IDropHandler } from './types';

export const dropHadler: IDropHandler = (event, horizontalRotation, shipLength, callback) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const children = event.target.parentNode.childNodes;
  const parent = event.target.parentElement;
  if (!horizontalRotation) {
    switch (shipLength) {
      case 1:
        target.classList.add('ship-1');
        target.classList.remove('green', 'red');
        break;
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
          callback([targetId, targetId + 10, targetId + 20, targetId + 30]);
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
