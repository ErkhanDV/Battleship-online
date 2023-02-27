import { useLogInActions, useGameStateActions } from '@/hook/_index';

import { MODAL } from '@/store/_constants';

import { IInvite } from '@/store/reducers/types/socket';

export const useInviteHandler = () => {
  const { setModalChildren, setModalOpen } = useLogInActions();
  const { setInvite } = useGameStateActions();

  const inviteHandler = (data: IInvite) => {
    console.log('invite', data);
    setInvite(data.server);
    setModalChildren(MODAL.invite);
    setModalOpen(true);
  };

  return { inviteHandler };
};
