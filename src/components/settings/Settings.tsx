import { useAppSettingsActions } from '@/hook/use-app-settings';
import { useAppSelector } from '@/hook/use-redux';

import './Settings.scss';

const Settings = () => {
  const { language, theme, scheme, sound } = useAppSelector(
    (state) => state.appSettingsSlice,
  );

  const { changeLanguage, changeTheme, changeScheme, toggleSound } =
    useAppSettingsActions();

  const handleLightButton = () => {
    changeTheme('light');
    document.body.style.setProperty(
      '--background-color-100',
      'rgb(255, 255, 255, 1)',
    );
    document.body.style.setProperty('--text-color-100', 'rgb(0, 0, 0, 1)');
    document.body.style.setProperty('--text-color-50', 'rgb(0, 0, 0, 0.5)');
  };

  const handleDarkButton = () => {
    changeTheme('dark');
    document.body.style.removeProperty('--background-color-100');
    document.body.style.removeProperty('--background-color-90');
    document.body.style.removeProperty('--text-color-100');
    document.body.style.removeProperty('--text-color-50');
  };

  const handleGreenButton = () => {
    changeScheme('green');
    document.body.style.removeProperty('--primary-color-100');
    document.body.style.removeProperty('--primary-color-75');
    document.body.style.removeProperty('--primary-color-50');
    document.body.style.removeProperty('--primary-color-25');
  };

  const handleBlueButton = () => {
    changeScheme('blue');
    document.body.style.setProperty(
      '--primary-color-100',
      'rgb(51, 204, 255, 1)',
    );
    document.body.style.setProperty(
      '--primary-color-75',
      'rgb(51, 204, 255, 0.75)',
    );
    document.body.style.setProperty(
      '--primary-color-50',
      'rgb(51, 204, 255, 0.5)',
    );
    document.body.style.setProperty(
      '--primary-color-25',
      'rgb(51, 204, 255, 0.25)',
    );
  };

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
        <h3 className="settings_subtitle">Theme mode</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${theme === 'light' && 'active'}`}
            onClick={handleLightButton}
          >
            Light
          </button>
          <button
            className={`settings_button ${theme === 'dark' && 'active'}`}
            onClick={handleDarkButton}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">Color scheme</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${scheme === 'green' && 'active'}`}
            onClick={handleGreenButton}
          >
            Green
          </button>
          <button
            className={`settings_button ${scheme === 'blue' && 'active'}`}
            onClick={handleBlueButton}
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
            On
          </button>
          <button
            className={`settings_button ${!sound && 'active'}`}
            onClick={() => toggleSound(false)}
          >
            Off
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
