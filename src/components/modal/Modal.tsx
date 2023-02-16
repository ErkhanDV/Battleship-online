import { IModal } from './_types';
import './Modal.scss';

const Modal = ({ modalOpen, setModalOpen, children }: IModal) => {
  return (
    <div
      className={`modal ${modalOpen && 'open'}`}
      onClick={() => setModalOpen(false)}
    >
      <div
        className={`modal_content ${modalOpen && 'open'}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
