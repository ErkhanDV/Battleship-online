export interface IUser {
  id: string;
  name: string | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface IUserState {
  user: IUser | null;
}
