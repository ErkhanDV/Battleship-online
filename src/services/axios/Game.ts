import axios from 'axios';
import { axiosAPI } from './_index';
import { STATUS, CLONE_SERVER } from './_constants';
import { IStartGame } from '@/services/axios/_types';

export class gameService {
  static async startGame(): Promise<IStartGame | undefined> {
    try {
      const { status, data } = await axiosAPI.get<IStartGame>(`${CLONE_SERVER}/startgame`);

      if (status === STATUS.ok && data) {
        return data;
      }

      return undefined;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error instanceof Error) console.log('error message: ', error.message);
      }
      console.log('unexpected error: ', error);
    }

    return undefined;
  }
}
