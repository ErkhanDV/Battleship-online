import * as AIStateSlice from '@/store/reducers/AIState';
import { useAppDispatch } from '../use-redux';

export const useAIState = () => {
  const dispatch = useAppDispatch();

  // const setCurrentHit = (hit: number) =>
  //   dispatch(AIStateSlice.setCurrentHit(hit));

  // const setPossibleCells = (cells: number[]) =>
  //   dispatch(AIStateSlice.setPossibleCells(cells));

  // const setCheckedCells = (cell: number) =>
  //   dispatch(AIStateSlice.setCheckedCells(cell));

  const setAvailableShoots = (cells: number[]) =>
    dispatch(AIStateSlice.setAvailableShoots(cells));

  const setTurnToDestroy = (amount: number) =>
    dispatch(AIStateSlice.setTurnToDestroy(amount));

  const setHitted = (index: number) => dispatch(AIStateSlice.setHitted(index));

  return {
    // setCurrentHit,
    // setPossibleCells,
    // setCheckedCells,
    setAvailableShoots,
    setTurnToDestroy,
    setHitted,
  };
};
