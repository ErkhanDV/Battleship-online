import { useState } from 'react';
import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';
import './Home.scss';

const Home = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const battleground: string[] = new Array(100).fill('empty');
  const [battlefield, setBattlefield] = useState(battleground);
  return (
    <main className="main">
      Players online: 0<button>Play</button>
      <Battleground battlefield={battlefield} setBattlefield={setBattlefield} coordinates={coordinates} />
      <Ship />
    </main>
  );
};

export default Home;
