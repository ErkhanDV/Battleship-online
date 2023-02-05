import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { AuthService } from '@/services/axios/Auth';

const LogIn: FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  const logInHandler = async () => {
    const user = await AuthService.login(name);

    navigate('/home');
  };

  return (
    <div>
      <input onChange={inputHandler} value={name} type="text" placeholder="Enter name" />
      <button onClick={logInHandler}>Войти</button>
    </div>
  );
};

export default LogIn;
