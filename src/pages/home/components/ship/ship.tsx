import { useEffect, useState } from 'react';

import './ship.scss';

const Ship = () => {
  const [horizontal, setHorizonal] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const rotateHandler = () => {
    setClickCount(clickCount + 1);
    setTimeout(() => {
      setClickCount(0);
    }, 400);
  };

  useEffect(() => {
    if (clickCount === 2) {
      setHorizonal(!horizontal);
    }
  }, [clickCount]);
  return (
    <div className={`ship${horizontal ? ' horizontal' : ''}`} draggable={true} onClick={rotateHandler}>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
    </div>
  );
};

export default Ship;
