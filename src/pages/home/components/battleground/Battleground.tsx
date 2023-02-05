import { useState } from 'react';
import Cell from '../cell/Cell';

import './row.scss';

const Battleground = () => {
  const battleground: string[] = new Array(100).fill('empty');
  return (
    <div className="battleground">
      {battleground.map((cell, index) => (
        <Cell key={Math.random()} coordinate={index} cell={cell} />
      ))}
    </div>
  );
};

export default Battleground;
