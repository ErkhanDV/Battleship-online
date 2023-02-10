import './Settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <h2 className="settings_title">Settings</h2>
      <div className="settings_section">
        <h3 className="settings_subtitle">Language</h3>
        <div className="settings_options">
          <button className="settings_button active">English</button>
          <button className="settings_button">Russian</button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">Color theme</h3>
        <div className="settings_options">
          <button className="settings_button active">Green</button>
          <button className="settings_button">Blue</button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">Sound</h3>
        <div className="settings_options">
          <button className="settings_button active">Sound On</button>
          <button className="settings_button">Sound Off</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
