import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import type { TRootState, TAppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
