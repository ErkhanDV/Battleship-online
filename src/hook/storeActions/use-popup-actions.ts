import { useAppDispatch } from '../use-redux';
import * as popUpSlice from '@/store/reducers/PopUpSlice';

const usePopUp = () => {
  const dispatch = useAppDispatch();

  const setVision = (vision: boolean) => dispatch(popUpSlice.setVision(vision));
  const setPopUpMessage = (message: string) =>
    dispatch(popUpSlice.setPopUpMessage(message));

  return { setVision, setPopUpMessage };
};

export default usePopUp;
