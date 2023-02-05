import { useState } from 'react';
import Cell from '../cell/Cell';

import './row.scss';

const Battleground = ({
  battlefield,
  coordinates,
  setBattlefield,
}: {
  battlefield: string[];
  coordinates: { x: number; y: number };
  setBattlefield: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className="battleground">
      {battlefield.map((cell, index) => (
        <>
          {
            <Cell
              key={Math.random()}
              coordinate={index}
              cell={cell}
              coordinates={coordinates}
              battlefield={battlefield}
              setBattlefield={setBattlefield}
            />
          }
        </>
      ))}
    </div>
  );
};

export default Battleground;
