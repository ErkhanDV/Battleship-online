import { DragEvent } from 'react';

import { ShipCoordinates } from '@/store/_types';

export type IDragHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: Boolean,
  shipLength: number | null,
) => void;

export type IDropHandler = (
  event: DragEvent<HTMLDivElement>,
  horizontalRotation: Boolean,
  shipLength: number | null,
  callback: (ship: number[]) => {
    payload: ShipCoordinates;
    type: 'shipsLocation/setShipsLocation';
  },
) => void;
