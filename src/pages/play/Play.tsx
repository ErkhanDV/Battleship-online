import './Play.scss';

import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';

const Play = () => {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  return (
    <main className="main">
      <Battleground />
      <div className="ship-station">
        {ships.map((decks) => (
          <Ship decks={decks} />
        ))}
      </div>
    </main>
  );
};

export default Play;
