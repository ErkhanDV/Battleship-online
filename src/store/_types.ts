export interface IUser {
  id: string;
  name: string | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface ICurrentShip {
  decks: number | null;
  isHorizontal: Boolean;
}
