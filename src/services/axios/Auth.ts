import axios from 'axios';
import { axiosAPI } from './_index';
import { IUser } from '@/store/_types';
import { STATUS, CLONE_SERVER } from './_constants';

export class AuthService {
  static async login(name: string): Promise<IUser | undefined> {
    try {
      const { status, data } = await axiosAPI.post<IUser>('/login', { name });

      if (status === STATUS.ok && data) {
        localStorage.setItem('token', data.accessToken);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(): Promise<Boolean> {
    try {
      const { status } = await axiosAPI.delete('/logout');
      if (status === STATUS.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  static async checkAuth(): Promise<Boolean> {
    try {
      const { data } = await axios.get<IUser>(`${CLONE_SERVER}/refresh`, { withCredentials: true });
      if (data) {
        localStorage.setItem('token', data.accessToken);
        // set user in store
        // set auth is true in store
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
