import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Modal from '@/components/modal/Modal';
import Background from '@/components/background/Background';
import './Home.scss';
import { Link } from 'react-router-dom';
import Settings from '@/components/settings/Settings';

const Home: FC = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<Settings />);

  return (
    <div className="home">
      <Header setModalOpen={setModalOpen} setModalChildren={setModalChildren} />
      <main className="main">
        {/* <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        children={modalChildren}
      /> */}
        <section className="section">
          <h2 className="section_title">Welcome to the ButtleShip Online!</h2>
          <p className="section_paragraph">
            This is a strategy type guessing game for two players. It is played
            on ruled grids on which each player's fleet of warships are marked.
          </p>
          <Link to="/play" className="section_button">
            Play BattleShip
          </Link>
          <p className="section_paragraph">
            The locations of the fleets are concealed from the other player.
            Players alternate turns calling "shots" at the other player's ships,
            and the objective of the game is to destroy the opposing player's
            fleet.
          </p>

          <Link to="/rules" className="section_button">
            Rules of the game
          </Link>
        </section>
        <section className="section">
          <h2 className="section_title">Gaming profile</h2>
          <p className="section_paragraph">Nickname: Billy Herrington</p>
          <p className="section_paragraph">Rank: Capitan</p>
          <p className="section_paragraph">Games: 0</p>
          <p className="section_paragraph">Wins: 0</p>
          <p className="section_paragraph">Losses: 0</p>
          <button className="section_button">Login</button>
          <p className="section_paragraph">Please login to your account.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
