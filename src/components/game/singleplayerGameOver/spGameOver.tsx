import {
  useGameShipsActions,
  useGameStateActions,
  useLogInActions,
} from '@/hook/_index';
import { useNavigate } from 'react-router-dom';

const SinglePlayerGameOver = () => {
  const { resetGameShips } = useGameShipsActions();
  const { setIsReady } = useGameStateActions();
  const { setModalOpen } = useLogInActions();
  
  const navigate = useNavigate();

  const toMainPageHandler = () => {
    resetGameShips();
    setIsReady(false);
    setModalOpen(false);
    navigate('/');
  };
  const onceMoreHandler = () => {
    resetGameShips();
    setIsReady(false);
    setModalOpen(false);
  };
  return (
    <div className="login">
      <h1>Поздравляем!</h1>
      <button onClick={toMainPageHandler}>Вернуться на главную страницу</button>
      <button onClick={onceMoreHandler}>Сыграть еще раз</button>
    </div>
  );
};

export default SinglePlayerGameOver;
