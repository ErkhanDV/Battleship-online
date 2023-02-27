import usePopUp from '@/hook/storeActions/use-popup-actions';
import { useAppSelector } from '@/hook/use-redux';
// import { useEffect } from 'react';
import './PopUp.scss';

const PopUp = () => {
  const { isVision, popUpMessage } = useAppSelector(
    (state) => state.PopUpSlice,
  );

  const { setVision } = usePopUp();
  // useEffect(() => {
  const timer = setTimeout(() => {
    setVision(false);
    clearTimeout(timer);
  }, 1000);
  // }, [isVision]);

  return (
    <div className={`popup ${isVision && 'open'}`}>
      <h3>{popUpMessage}</h3>
    </div>
  );
};

export default PopUp;
