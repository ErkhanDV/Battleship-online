import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';
import './Home.scss';

const Home = () => {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  return (
    <main className="main">
      Players online: 0<button>Play</button>
      <Battleground />
      <div className="ships-station">
        {ships.map((decks, index) => (
          <Ship decks={decks} key={index} />
        ))}
      </div>
    </main>
  );
};

export default Home;
