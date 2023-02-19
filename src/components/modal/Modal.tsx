import { FC } from 'react';
import { useAppSelector, useLogInActions } from '@/hook/_index';
import { MODAL } from './_constants';
import './Modal.scss';

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
        {MODAL[modalChildren]}
      </div>
    </div>
  );
};

export default Modal;
