import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import './Gameover.scss';
import { ROUTE } from '@/router/_constants';
import ResultTable from '../resultTable/resultTable';
import { useEffect, useState } from 'react';

const Gameover = ({ isOnline }: { isOnline: boolean }) => {
  const { t } = useTranslation();
  const { user, rival, userName, opponentName, winner } = useAppSelector(
    (state) => {
      const { user, rival } = state.gameShipsSlice;
      const { opponentName, winner } = state.gameStateSlice;
      const { userName } = state.logInSlice;
      return { user, rival, userName, opponentName, winner };
    },
  );
  const { resetGameShips } = useGameShipsActions();
  const { resetGameState } = useGameStateActions();

  const [meWin, setMeWin] = useState<boolean>(false);

  useEffect(() => {
    if (isOnline) {
      if (winner === userName) {
        setMeWin(true);
      }
    }
    if (winner === 'You') {
      setMeWin(true);
    }
  }, [winner]);

  let classList = 'gameover';

  if (meWin) {
    classList += ' winner-background';
  } else {
    classList += ' looser-background';
  }

  const title = meWin
    ? t('Congratulations on the victory!')
    : isOnline
    ? `${t('This time lucky')} ${winner}`
    : t('Youve been beaten by artificial intelligence');

  const homeButtonHandler = () => {
    resetGameShips();
    resetGameState();
  };

  if (winner) {
    return (
      <div className={classList}>
        <h3>{title}</h3>
        <div className="gamers-table">
          <ResultTable user={rival} name={isOnline ? userName : 'You'} />
          <ResultTable
            user={user}
            name={isOnline ? opponentName : 'Computer'}
          />
        </div>
        <NavLink to={ROUTE.home} className="home" onClick={homeButtonHandler}>
          {t('home')}
        </NavLink>
        {/* <button>Сыграть еще раз</button> */}
      </div>
    );
  } else {
    return null;
  }
};

export default Gameover;
