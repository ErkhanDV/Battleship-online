import { FC } from 'react';
import { useAppSelector, useLogInActions } from '@/hook/_index';

import './Modal.scss';
import { Settings, LogIn } from '../_index';

const Modal: FC = () => {
  const { setModalOpen } = useLogInActions();
  const { modalChildren, isModalOpen } = useAppSelector(
    (state) => state.logInSlice,
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
        {modalChildren === 'log' ? <LogIn /> : <Settings />}
      </div>
    </div>
  );
};

export default Modal;
