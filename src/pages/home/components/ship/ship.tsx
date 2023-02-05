import { useState } from 'react';
import { dragStartHandler } from '../../../../lib/API/DargNDrop';
import Cell from '../cell/Cell';
import './ship.scss';

const Ship = ({
  coordinates,
  setCoordinates,
}: {
  coordinates: { x: number; y: number };
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}) => {
  const [isClicked, setClicked] = useState(false);
  return (
    <div
      className="ship"
      draggable={true}
      onMouseDown={(event) => {
        // const parent = event.target.parentElement as HTMLDivElement;
        // event.target.parentElement.style.position = 'absolute';
        // event.target.parentElement.style.left = `${event.clientX - 14}px`;
        // event.target.parentElement.style.top = `${event.clientY - 14}px`;
        setClicked(true);
      }}
      onMouseMove={(event) => {
        if (isClicked) {
          const x = event.clientX - 14;
          event.target.parentNode.style.left = `${x}px`;
          const y = event.clientY - 14;
          event.target.parentNode.style.top = `${y}px`;
          if (Math.abs(coordinates.x - x) > 14 || Math.abs(coordinates.y - y) > 14) {
            setCoordinates({
              x: event.clientX,
              y: event.clientY,
            });
          }
        }
      }}
      onMouseUp={(event) => {
        setClicked(false);
        // event.target.parentNode.style.position = 'fixed';
      }}
    >
      <Cell cell={'ship'} coordinate={1} />
      <Cell cell={'ship'} coordinate={2} />
      <Cell cell={'ship'} coordinate={3} />
    </div>
  );
};

export default Ship;
