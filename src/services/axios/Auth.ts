import axios, { AxiosError } from 'axios';
import { axiosAPI } from './_interceptors';
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
      if (error instanceof AxiosError) {
        const { status, message } = error.response?.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }
  }

  static async logout(): Promise<Boolean | undefined> {
    try {
      const { status } = await axiosAPI.delete('/logout');
      if (status === STATUS.ok) {
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, message } = error.response?.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }
  }

  static async checkAuth(): Promise<Boolean | undefined> {
    try {
      const { data } = await axios.get<IUser>(`${CLONE_SERVER}/refresh`, {
        withCredentials: true,
      });
      if (data) {
        localStorage.setItem('token', data.accessToken);
        // set user in store
        // set auth is true in store
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, message } = error.response?.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }
  }
}
