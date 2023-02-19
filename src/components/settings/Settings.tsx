import { useAppSettingsActions } from '@/hook/use-app-settings';
import { useAppSelector } from '@/hook/use-redux';
import './Settings.scss';

const Settings = () => {
  const { language, theme, sound } = useAppSelector(
    (state) => state.appSettingsSlice,
  );

  const { changeLanguage, changeTheme, toggleSound } = useAppSettingsActions();

  return (
    <div className="settings">
      <h2 className="settings_title">Settings</h2>
      <div className="settings_section">
        <h3 className="settings_subtitle">Language</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${language === 'en' && 'active'}`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={`settings_button ${language === 'ru' && 'active'}`}
            onClick={() => changeLanguage('ru')}
          >
            Russian
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">Color theme</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${theme === 'green' && 'active'}`}
            onClick={() => changeTheme('green')}
          >
            Green
          </button>
          <button
            className={`settings_button ${theme === 'blue' && 'active'}`}
            onClick={() => changeTheme('blue')}
          >
            Blue
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">Sound</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${sound && 'active'}`}
            onClick={() => toggleSound(true)}
          >
            Sound On
          </button>
          <button
            className={`settings_button ${!sound && 'active'}`}
            onClick={() => toggleSound(false)}
          >
            Sound Off
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
