import './PopUp.scss';

const PopUp = (modalChildren: string) => {
  const popUpMessage =
    modalChildren === 'miss'
      ? 'Промах'
      : modalChildren === 'hit'
      ? 'Попал!'
      : 'Корабль убит!';

  return <h3 className={`popup ${isPopupOpen && 'open'}`}>{popUpMessage}</h3>;
};

export default PopUp;
