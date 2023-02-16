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

export interface IShoot {
  player: string;
  cell: number;
}
