import './ship.scss';

const Ship = () => {
  return (
    <div
      className="ship"
      draggable={true}
      onWheel={() => {
        console.log('123');
      }}
    >
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
    </div>
  );
};

export default Ship;
