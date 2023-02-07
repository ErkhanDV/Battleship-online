import { FC, useState } from 'react';

import { AuthService } from '@/services/axios/Auth';

import './Login.scss';

const LoGInPage: FC = () => {
  const [name, setName] = useState('');

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  const logInHandler = async () => {
    const user = await AuthService.login(name);
  };

  const logOutHandler = async () => {
    await AuthService.logout();
  };

  return (
    <div className="login">
      <h2 className="login_title">Login</h2>
      <input
        className="login_input"
        onChange={inputHandler}
        value={name}
        type="text"
        placeholder="Enter name"
      />
      <button className="login_button" onClick={logInHandler}>
        Войти
      </button>
      <button className="login_button" onClick={logOutHandler}>
        Выйти
      </button>
    </div>
  );
};

export default LoGInPage;
