import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from '@/components/_index';

import { useTranslation } from 'react-i18next';

import './Home.scss';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <main className="main">
        <section className="section">
          <h2 className="section_title">{t('welcomeTitle')}</h2>
          <p className="section_paragraph">{t('welcomeFirst')}</p>
          <Link to="/game" className="section_button">
            {t('playBattleShip')}
          </Link>
          <p className="section_paragraph">{t('welcomeSecond')}</p>
          <Link to="/rules" className="section_button">
            {t('rulesOfTheGame')}
          </Link>
        </section>
        <section className="section">
          <h2 className="section_title">{t('profile')}</h2>
          <p className="section_paragraph">Nickname: Billy Herrington</p>
          <p className="section_paragraph">Rank: Capitan</p>
          <p className="section_paragraph">Games: 0</p>
          <p className="section_paragraph">Wins: 0</p>
          <p className="section_paragraph">Losses: 0</p>
          <button className="section_button">{t('login')}</button>
          <p className="section_paragraph">{t('loginPlease')}</p>
        </section>
      </main>
      <Chat />
    </div>
  );
};

export default Home;
