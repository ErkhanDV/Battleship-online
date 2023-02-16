import { useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';
import { AuthService } from '@/services/axios/Auth';

const LogIn: FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  const logInHandler = async () => {
    const response = await AuthService.login(name);
    if (typeof response === 'string') {
      setError(response);
    } else {
      navigate('/home');
    }
  };

  return (
    <div>
      <input
        onChange={inputHandler}
        value={name}
        type="text"
        placeholder="Enter name"
      />
      <button onClick={logInHandler}>Войти</button>
      <span>{error}</span>
    </div>
  );
};

export default LogIn;
