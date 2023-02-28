import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { ResultTable } from '../_index';

import './Gameover.scss';

import { useAppSelector, useGameStateActions } from '@/hook/_index';

import { ROUTE } from '@/router/_constants';
import { GAMEOVERCLASS } from './_constants';
import { PERSON } from '@/store/_constants';

const Gameover = ({ isOnline }: { isOnline: boolean }) => {
  const { t } = useTranslation();
  const { user, rival, userName, opponentName, winner, winnerClassList } =
    useAppSelector((state) => {
      const { user, rival } = state.gameShipsSlice;
      const { opponentName, winner, winnerClassList } = state.gameStateSlice;
      const { userName } = state.logInSlice;
      return { user, rival, userName, opponentName, winner, winnerClassList };
    });

  const { setWinner, setClassList } = useGameStateActions();

  useEffect(() => {
    if (isOnline) {
      return;
    }

    if (winner === PERSON.you) {
      setWinner(t('winWin'));
      setClassList(GAMEOVERCLASS.win);
    }

    if (winner === PERSON.computer) {
      setWinner(t('winLose'));
      setClassList(GAMEOVERCLASS.lose);
    }
  }, [winner]);

  if (winner) {
    return (
      <div className={`gameover ${winnerClassList}`}>
        <h3>{winner}</h3>
        <div className="gamers-table">
          <ResultTable user={rival} name={isOnline ? userName : 'You'} />
          <ResultTable
            user={user}
            name={isOnline ? opponentName : PERSON.computer}
          />
        </div>
        <NavLink to={ROUTE.home} className="home-button">
          {t('home')}
        </NavLink>
      </div>
    );
  } else {
    return null;
  }
};

export default Gameover;
