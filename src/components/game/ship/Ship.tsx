import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/use-redux';
import { setShip, setDropped } from '@/store/reducers/shipSlice';
import { ICurrentShip } from '@/store/reducers/types/currentShip';
import { IDecks } from './_types';

import './Ship.scss';

const Ship = ({ decks }: IDecks) => {
  const [isHorizontal, setHorizonal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const dispatch = useAppDispatch();
  const setShipHandler = (currentShip: ICurrentShip) => {
    dispatch(setShip(currentShip));
  };

  const { wasDropped } = useAppSelector((state) => state.shipSlice);
  const setNotDrop = () => dispatch(setDropped(false));

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    isHorizontal: boolean,
  ) => {
    const target = event.target as HTMLDivElement;
    const decks = target.childNodes.length;
    setShipHandler({ decks, isHorizontal });
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setShipHandler({ decks: null, isHorizontal: false });
    if (!!wasDropped) {
      setNotDrop();
    }
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
        <div className="ship-cell" key={index}></div>
      ))}
    </div>
  );
};

export default Ship;
