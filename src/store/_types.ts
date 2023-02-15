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
  user: {
    shipsLocation: IShip[];
    misses: number[];
  };
  rival: {
    shipsLocation: IShip[];
    misses: number[];
  };
}

export interface IWoundedCell {
  // index: number;
  cellId: number;
}

export interface IAddWoundedCell {
  player: string;
  cell: IWoundedCell;
}

export interface IShoots {
  own: {
    hits: number[];
    misses: number[];
  };
  rival: {
    hits: number[];
    misses: number[];
  };
}

export type ShipCoordinates = number[];

export interface IDecks {
  decks: number;
}

export interface ICell {
  coordinate: number;
  isRival?: boolean;
}
