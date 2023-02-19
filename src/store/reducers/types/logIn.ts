import { MODAL } from '@/components/modal/_constants';
export interface ILogIn {
  user: string;
  isAuthorized: boolean;
  isModalOpen: boolean;
  modalChildren: keyof typeof MODAL;
}
