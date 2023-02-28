import { useLogInActions } from '@/hook/_index';

import { IOnline } from '@/store/reducers/types/socket';

export const useOnlineHandler = () => {
  const { setOnlinePlayers } = useLogInActions();

  const onlineHandler = ({ count }: IOnline) => { 
    console.log(true);
    setOnlinePlayers(count);
  };

  return { onlineHandler };
};
