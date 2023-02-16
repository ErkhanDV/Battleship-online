export interface ICurrentShip {
  decks: number | null;
  isHorizontal: Boolean;
}

export interface IDragedShip {
  currentDragedShip: ICurrentShip;
  wasDropped: boolean;
}