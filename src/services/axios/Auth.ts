import axios from "axios";
import { axiosAPI } from "./_index";
import { IUser } from "@/store/types/_types";
import { STATUS } from "./_constants";

export class AuthService {
  static async login(name: string): Promise<IUser | undefined> {
    try {
      const { status, data } = await axiosAPI.post<IUser>("/login", { name });

      if (status === STATUS.ok && data) {
        return data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
      }
      console.log("unexpected error: ", error);
    }
  }

  static async logout(): Promise<Boolean | undefined> {
    try {
      const { status } = await axiosAPI.delete("/logout");
      if (status === STATUS.ok) {
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
      }
      console.log("unexpected error: ", error);
    }
  }
}
