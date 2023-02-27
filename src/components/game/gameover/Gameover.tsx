import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hook/_index';
import { type FC } from 'react';
import './Gameover.scss';
import { ROUTE } from '@/router/_constants';

const Gameover: FC = () => {
  const { t } = useTranslation();
  const { winner } = useAppSelector((state) => state.gameStateSlice);

  if (winner) {
    return (
      <div className="gameover">
        <span className="winner">{winner}</span>
        <NavLink to={ROUTE.home} className="home">
          {t('home')}
        </NavLink>
      </div>
    );
  } else {
    return null;
  }
};

export default Gameover;
