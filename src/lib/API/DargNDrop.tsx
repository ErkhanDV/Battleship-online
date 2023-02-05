import { DragEvent } from 'react';

// export const dragStartHandler = (event: DragEvent<HTMLDivElement>) => {
//   console.log(event.target.childNodes.length);
// };

export const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = event.target.parentElement;
  if (!parent.childNodes[targetId + 10] && !parent.childNodes[targetId + 20]) {
    target.classList.add('red');
  }
  if (parent.childNodes[targetId + 10] && !parent.childNodes[targetId + 20]) {
    target.classList.add('red');
    parent.childNodes[targetId + 10].classList.add('red');
  }
  if (parent.childNodes[targetId + 10] && parent.childNodes[targetId + 20]) {
    target.classList.add('green');
    parent.childNodes[targetId + 10].classList.add('green');
    parent.childNodes[targetId + 20].classList.add('green');
  }
};

export const dragEndHandler = (event: DragEvent<HTMLDivElement>) => {
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const parent = target.parentElement as HTMLDivElement;
  target.classList.remove('green', 'red');
  const neighbor1 = parent.childNodes[targetId + 10] as HTMLDivElement;
  const neighbor2 = parent.childNodes[targetId + 20] as HTMLDivElement;
  if (neighbor1) {
    neighbor1.classList.remove('green', 'red');
  }
  if (neighbor2) {
    neighbor2.classList.remove('green', 'red');
  }
};

export const dropHadler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;
  const targetId = Number(target.id);
  const children = event.target.parentNode.childNodes;
  const parent = event.target.parentElement;
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
};
