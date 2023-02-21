export interface ISetShip {
  decks: number | null;
  isHorizontal: Boolean;
}

export interface IShipDnD {
  shipDnD: ISetShip;
  wasDropped: boolean;
}