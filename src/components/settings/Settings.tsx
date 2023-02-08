import './Settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <h2 className="settings_title">Settings</h2>
      <div className="settings_section">
        <h3 className="section-title">Language</h3>
        <div className="section-options">
          <input type="radio" name="language" value="english" checked />
          <label htmlFor="language">English</label>
          <input type="radio" name="language" value="russian" />
          <label htmlFor="language">Russian</label>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="section-title">Color theme</h3>
        <div className="section-options">
          <input type="radio" name="theme" value="green" checked />
          <label htmlFor="theme">Green</label>
          <input type="radio" name="theme" value="blue" />
          <label htmlFor="theme">Blue</label>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="section-title">Sound</h3>
        <div className="section-options">
          <input type="radio" name="sound" value="on" checked />
          <label htmlFor="sound">Sound On</label>
          <input type="radio" name="sound" value="off" />
          <label htmlFor="sound">Sound Off</label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
