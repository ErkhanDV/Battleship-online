import { useAppDispatch } from './use-redux';
import * as appSettings from '@/store/reducers/AppSettingsSlice';

export const useAppSettingsActions = () => {
  const dispatch = useAppDispatch();

  const changeLang = (lang: string) => {
    dispatch(appSettings.changeLang(lang));
  };

  const changeTheme = (theme: string) => {
    dispatch(appSettings.changeTheme(theme));
  };

  const toggleSound = (sound: boolean) => {
    dispatch(appSettings.toggleSound(sound));
  };

  return {
    changeLang,
    changeTheme,
    toggleSound,
  };
};
