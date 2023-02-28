import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '@/router/_constants';
import { useTranslation } from 'react-i18next';

import './Status.scss';

import { useAppSelector } from '@/hook/_index';

const Status: FC = () => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.gameStateSlice);

  if (status)
    return (
      <div className="status">
        <p className="status_value">status</p>
        <NavLink to={ROUTE.home} className="home-button">
          {t('home')}
        </NavLink>
      </div>
    );
  else {
    return null;
  }
};

export default Status;
