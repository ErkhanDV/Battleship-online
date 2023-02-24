import { FC, useEffect, useState } from 'react';

import { authService } from '@/services/axios/Auth';
import { useLogInActions, useAppSelector } from '@/hook/_index';
import { useTranslation } from 'react-i18next';

import './Login.scss';

import { IUser } from '@/services/axios/_types';

const LogIn: FC = () => {
  const [loginValue, setLoginValue] = useState('');
  const [validation, setValidation] = useState('');
  const { setUserName, setModalOpen } = useLogInActions();
  const { isModalOpen } = useAppSelector((state) => state.logInSlice);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setValidation('');
    setLoginValue('');
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setLoginValue(target.value);

  const logInHandler = async () => {
    const response: IUser = await authService.login(loginValue);
    if (typeof response === 'string') {
      setValidation(response);
      return;
    }

    if (response.name) {
      setLoginValue('');
      setUserName(response.name);
      setModalOpen(false);
    }
  };

  return (
    <div className="login">
      <h2 className="login_title">{t('authorization')}</h2>
      <input
        className="login_input"
        onChange={inputHandler}
        value={loginValue}
        type="text"
        placeholder={`${t('enterName')}`}
      />
      <div className="login_validation">{validation}</div>
      <button className="login_button" onClick={logInHandler}>
        {t('login')}
      </button>
    </div>
  );
};

export default LogIn;
