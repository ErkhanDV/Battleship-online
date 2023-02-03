import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { type TRootState, type TAppDispatch } from "@/store/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
