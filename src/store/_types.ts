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

export interface IDragedShip {
  currentDragedShip: ICurrentShip;
  wasDropped: boolean;
}

export interface IAddShip {
  player: string;
  ship: IShip;
}

export interface IShip {
  shipLocation: number[];
  decks: number;
  occupiedCells: number[];
  woundedCells: number[];
}

export interface IAddMiss {
  player: string;
  miss: number;
}

export interface IShipsLocation {
  user: IPlayerState;
  rival: IPlayerState;
}

export interface IPlayerState {
  shipsLocation: IShip[];
  misses: number[];
}

export interface IGameState {
  state: IPlayerState;
  person: string;
}

// export interface IWoundedCell {
//   index: number;
//   cellId: number;
// }

export interface IShoot {
  player: string;
  cell: number;
}

export type ShipCoordinates = number[];

export interface IDecks {
  decks: number;
}

export interface ICell {
  coordinate: number;
  isRival?: boolean;
}
