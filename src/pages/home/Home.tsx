import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';
import './Home.scss';

const Home = () => {
  return (
    <main className="main">
      Players online: 0<button>Play</button>
      <Battleground />
      <Ship />
    </main>
  );
};

export default Home;
