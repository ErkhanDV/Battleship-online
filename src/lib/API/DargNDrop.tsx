import { DragEvent } from 'react';

export const dragStartHandler = (event: DragEvent<HTMLDivElement>) => {
  console.log(event.target.childNodes.length);
};

export const dragEndHandler = () => {};

export const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export const dropHadler = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  const children = event.target.parentNode.childNodes;
  console.log(Array.from(children).find((element) => element == event.target));
  const startId = Number(event.target.id);
  children[startId].classList.add('ship-1');
  console.log(startId);
  console.log(children[startId], children[startId + 10], children[startId + 20]);
  children[startId + 10].classList.add('ship-1');
  children[startId + 20].classList.add('ship-1');
  // dispatch(addCells(updatedBattleground));
};
