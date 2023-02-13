import { DragEvent } from 'react';

import { IShip, IShipsLocation } from '@/store/_types';

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
    payload: IShip;
    type: 'shipsLocation/addShip';
  },
  successfullyDrop: () => {
    payload: boolean;
    type: 'currentShip/setDropped';
  },
) => void;
