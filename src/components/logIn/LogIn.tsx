import { FC, useEffect, useState } from 'react';
import { authService } from '@/services/axios/Auth';
import { useLogInActions, useAppSelector } from '@/hook/_index';
import './Login.scss';
import { IUser } from '@/services/axios/_types';

const LogIn: FC = () => {
  const [name, setName] = useState('');
  const [validation, setValidation] = useState('');
  const { setUser, setModalOpen } = useLogInActions();
  const { isModalOpen } = useAppSelector((state) => state.logInSlice);

  useEffect(() => {
    setValidation('');
    setName('');
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  const logInHandler = async () => {
    const response: IUser = await authService.login(name);
    if (typeof response === 'string') {
      setValidation(response);
      return;
    }

    if (response.name) {
      setName('');
      setUser(response.name);
      setModalOpen(false);
    }
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
      <div className="login_validation">{validation}</div>
      <button className="login_button" onClick={logInHandler}>
        Войти
      </button>
    </div>
  );
};

export default LogIn;
