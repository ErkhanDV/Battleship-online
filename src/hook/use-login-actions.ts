import { useAppDispatch } from '@/hook/use-redux';
import * as logInActions from '@/store/reducers/LogInSlice';
// import { MODAL } from '@/components/modal/_constants';

export const useLogInActions = () => {
  const dispatch = useAppDispatch();

  const setUser = (user: string) => dispatch(logInActions.setUser(user));

  const setModalOpen = (state: boolean) =>
    dispatch(logInActions.setModalOpen(state));

  const setModalChildren = (component: string) =>
    dispatch(logInActions.setModalChildren(component));

  return {
    setUser,
    setModalOpen,
    setModalChildren,
  };
};
