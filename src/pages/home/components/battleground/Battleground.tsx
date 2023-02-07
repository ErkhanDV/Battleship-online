import { useState } from 'react';
import Cell from '../cell/Cell';

import './row.scss';

const Battleground = () => {
  const battleground: string[] = new Array(100).fill('empty');
  return (
    <div className="battleground">
      {battleground.map((_, index) => (
        <Cell key={index} coordinate={index} />
      ))}
    </div>
  );
};

export default Battleground;
