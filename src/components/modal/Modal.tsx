import { FC } from 'react';
import { useAppSelector, useLogInActions } from '@/hook/_index';
import './Modal.scss';
import { LogIn, Settings, Friend } from '../_index';
import { MODAL } from '@/store/_constants';

const Modal: FC = () => {
  const { setModalOpen } = useLogInActions();
  const { modalChildren, isModalOpen } = useAppSelector(
    (state) => state.logInSlice,
  );
  let modalComponent;

  switch (modalChildren) {
    case MODAL.log:
      modalComponent = <LogIn />;
      break;

    case MODAL.settings:
      modalComponent = <Settings />;
      break;

    case MODAL.friend:
      modalComponent = <Friend />;
      break;

    default:
      break;
  }

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
