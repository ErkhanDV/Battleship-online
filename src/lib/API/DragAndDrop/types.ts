import { DragEvent } from 'react';

import { IAddShip, IShip, IShipsLocation } from '@/store/_types';

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
  callback: (ship: IShip) => {
    payload: IAddShip;
    type: 'shipsLocation/addShip';
  },
  successfullyDrop: () => {
    payload: boolean;
    type: 'currentShip/setDropped';
  },
) => void;
