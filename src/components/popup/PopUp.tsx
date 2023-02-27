import usePopUp from '@/hook/storeActions/use-popup-actions';
import { useAppSelector } from '@/hook/use-redux';
import './PopUp.scss';

const PopUp = () => {
  const { isVision, popUpMessage } = useAppSelector(
    (state) => state.PopUpSlice,
  );

  const { setVision } = usePopUp();
  setTimeout(() => {
    setVision(false);
  }, 2000);

  return <h3 className={`popup ${isVision && 'open'}`}>{popUpMessage}</h3>;
};

export default PopUp;
