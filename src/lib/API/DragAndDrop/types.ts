import { DragEvent } from 'react';

import { IShip } from '@/store/_types';

export type IDragHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: Boolean,
  shipLength: number | null,
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
