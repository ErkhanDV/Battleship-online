import { DragEvent } from 'react';

export const dragStartHandler = (event: DragEvent<HTMLDivElement>) => {
  console.log(event.target.childNodes.length);
};

export const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const target = event.target;
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
  // const target = event.target;
  // const targetId = Number(target.id);
  // const parent = event.target.parentElement;
  // if (!parent.childNodes[targetId + 10] && !parent.childNodes[targetId + 20]) {
  //   target.classList.remove('red');
  //   target.classList.remove('green');
  // }
  // if (parent.childNodes[targetId + 10] && !parent.childNodes[targetId + 20]) {
  //   target.classList.remove('red');
  //   parent.childNodes[targetId + 10].classList.add('red');
  // } else {
  //   target.classList.remove('green');
  //   parent.childNodes[targetId + 10].classList.remove('green');
  //   parent.childNodes[targetId + 20].classList.remove('green');
  // }
};

export const dropHadler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const children = event.target.parentNode.childNodes;
  const startId = Number(event.target.id);
  children[startId].classList.add('ship-1');
  children[startId + 10].classList.add('ship-1');
  children[startId + 20].classList.add('ship-1');
};
