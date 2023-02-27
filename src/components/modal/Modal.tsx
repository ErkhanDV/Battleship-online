import { FC } from 'react';
import { useAppSelector, useLogInActions } from '@/hook/_index';
import './Modal.scss';
import { LogIn, Settings } from '../_index';
import SinglePlayerGameOver from '../game/singleplayerGameOver/spGameOver';

const Modal: FC = () => {
  const { setModalOpen } = useLogInActions();
  const { modalChildren, isModalOpen } = useAppSelector(
    (state) => state.logInSlice,
  );
  const modalComponent =
    modalChildren === 'log' ? (
      <LogIn />
    ) : modalChildren === 'settings' ? (
      <Settings />
    ) : (
      <SinglePlayerGameOver />
    );

  return (
    <div
      className={`modal ${isModalOpen && 'open'}`}
      onClick={() => setModalOpen(false)}
    >
      <div
        className={`modal_content ${isModalOpen && 'open'}`}
        onClick={(event) => event.stopPropagation()}
      >
        {modalComponent}
      </div>
    </div>
  );
};

export default Modal;
