import { useAppDispatch } from '@/hook/_index';
import * as appSettings from '@/store/reducers/AppSettingsSlice';

export const useAppSettingsActions = () => {
  const dispatch = useAppDispatch();

  const changeLanguage = (language: string) => {
    dispatch(appSettings.changeLanguage(language));
  };

  const changeTheme = (theme: string) => {
    dispatch(appSettings.changeTheme(theme));
  };

  const changeScheme = (scheme: string) => {
    dispatch(appSettings.changeScheme(scheme));
  };

  const toggleSound = (sound: boolean) => {
    dispatch(appSettings.toggleSound(sound));
  };

  return {
    changeLanguage,
    changeTheme,
    changeScheme,
    toggleSound,
  };
};
