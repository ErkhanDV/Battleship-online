import axios from 'axios';
import { axiosAPI } from './_interceptors';
import { STATUS, CLONE_SERVER } from './_constants';
import { IStartGame } from '@/services/axios/_types';

export class gameService {
  static async startGame(): Promise<IStartGame | undefined> {
    try {
      const { status, data } = await axiosAPI.get<IStartGame>(
        `${CLONE_SERVER}/startgame`,
      );

      if (status === STATUS.ok && data) {
        return data;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }

    return undefined;
  }
}
