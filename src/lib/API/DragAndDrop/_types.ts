import { DragEvent } from 'react';

import { IAddShip, IGameShips, IShip } from '@/store/reducers/types/shipLocation';

export type IDragHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: Boolean,
  shipLength: number | null,
  settedShips?: IShip[],
) => void;

export type IDropHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: Boolean,
  shipLength: number | null,
  callback: (
    ship: IShip,
  ) => {
    payload: IAddShip;
    type: 'gameShips/addShip';
  },
  successfullyDrop: () => {
    payload: boolean;
    type: 'ship/setDropped';
  },
) => void;
