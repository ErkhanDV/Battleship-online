import { useEffect, useState } from 'react';

import { useAppDispatch } from '@/store/hook/hook';
import { setCurrentShip } from '@/store/reducers/CurrentShipSlice';

import './ship.scss';
import { ICurrentShip } from '@/store/_types';

const Ship = ({ decks }: { decks: number }) => {
  const [isHorizontal, setHorizonal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const dispatch = useAppDispatch();

  const setShipHandler = (currentShip: ICurrentShip) => {
    dispatch(setCurrentShip(currentShip));
  };

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, isHorizontal: boolean) => {
    const target = event.target as HTMLDivElement;
    const decks = target.childNodes.length;
    setShipHandler({ decks, isHorizontal });
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setShipHandler({ decks: null, isHorizontal: false });
    event.target.remove();
  };

  const rotateHandler = (decks: number) => {
    if (decks > 1) {
      setClickCount(clickCount + 1);
      setTimeout(() => {
        setClickCount(0);
      }, 400);
    }
  };

  useEffect(() => {
    if (clickCount === 2) {
      setHorizonal(!isHorizontal);
    }
  }, [clickCount]);

  const getDeckClass = (decks: number) => {
    switch (decks) {
      case 1:
        return 'one-deck';
      case 2:
        return 'two-deck';
      case 3:
        return 'three-deck';
      case 4:
        return 'four-deck';
      default:
        return '';
    }
  };

  const classList = ['ship', getDeckClass(decks)];

  return (
    <div
      className={`${classList.join(' ')}${isHorizontal ? ' horizontal' : ''}`}
      draggable={true}
      onClick={() => rotateHandler(decks)}
      onDragStart={(event) => {
        dragStartHandler(event, isHorizontal);
      }}
      onDragEnd={(event) => {
        dragEndHandler(event);
      }}
    >
      {new Array(decks).fill(null).map((_, index) => (
        <div className="cell" key={index}></div>
      ))}
    </div>
  );
};

export default Ship;
