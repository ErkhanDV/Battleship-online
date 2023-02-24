import { CHAT } from '@/store/_constants';

export interface IChat {
  currentChat: string;
  common: IChatMessage[];
  game: IChatMessage[];
}

export interface IChatMessage {
  name: string;
  date: string;
  text: string;
  gameId?: string;
  chatName: string;
  setDate?: boolean;
}
