import { setCurrentShip } from '@/store/reducers/CurrentShipSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ship.scss';

const Ship = ({ decks }: { decks: number }) => {
  const [isHorizontal, setHorizonal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const dispatch = useDispatch();

  const setShipHandler = (decks: number | null, isHorizontal: boolean) => {
    dispatch(setCurrentShip({ decks, isHorizontal }));
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
        return 'ship';
    }
  };

  const classList = ['ship', getDeckClass(decks)];
  return (
    <div
      className={`${classList.join(' ')}${isHorizontal ? ' horizontal' : ''}`}
      draggable={true}
      onClick={() => rotateHandler(decks)}
      onDragStart={(event) => {
        const decks: number = event.target.childNodes.length;
        setShipHandler(decks, isHorizontal);
      }}
      onDragEnd={() => {
        setShipHandler(null, false);
      }}
    >
      {new Array(decks).fill(null).map((_, index) => (
        <div className="cell" key={index}></div>
      ))}
    </div>
  );
};

export default Ship;
