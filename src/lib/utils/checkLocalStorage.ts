export const checkLocalStorage = () => {
  if (localStorage.getItem('theme_mode') === 'light') {
    document.body.style.setProperty(
      '--background-color-100',
      'rgb(255, 255, 255, 1)',
    );
    document.body.style.setProperty('--text-color-100', 'rgb(0, 0, 0, 1)');
    document.body.style.setProperty('--text-color-50', 'rgb(0, 0, 0, 0.5)');
  }

  if (localStorage.getItem('color_scheme') === 'blue') {
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
  }
};
