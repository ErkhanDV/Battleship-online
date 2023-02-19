import './Rules.scss';

const Rules = () => {
  return (
    <main className="rules">
      <h1 className="rules_title">BattleShip Rules</h1>
      <section className="rules_section">
        <h2 className="rules_subtitle">Description</h2>
        <p className="rules_paragrath">
          The game is played on two grids, two for each player. The grids are
          typically square 10×10 and the individual squares in the grid are
          identified by letter and number. On one grid the player arranges ships
          and records the shots by the opponent. On the other grid, the player
          records their own shots.
        </p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">Arrange the ships</h2>
        <p className="rules_paragrath">
          Before play begins, each player secretly arranges their ships on their
          primary grid. Each ship occupies a number of consecutive squares on
          the grid, arranged either horizontally or vertically. The number of
          squares for each ship is determined by the type of ship. The ships
          cannot overlap (i.e., only one ship can occupy any given square in the
          grid).
        </p>
        <p className="rules_paragrath">
          The types and numbers of ships allowed are the same for each player.
          These may vary depending on the rules. The ships should be hidden from
          players sight and it's not allowed to see each other's pieces. The
          game is a discovery game which players need to discover their
          opponents ship positions.
        </p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">Ship attack</h2>
        <p className="rules_paragrath">
          After the ships have been positioned, the game proceeds in a series of
          rounds. In each round, each player takes a turn to announce a target
          square in the opponent's grid which is to be shot at. The opponent
          announces whether or not the square is occupied by a ship. If it is a
          "hit", the player who is hit marks this on their own or "ocean" grid
          (with a red peg in the pegboard version).
        </p>
        <p className="rules_paragrath">
          The attacking player marks the hit or miss on their own "tracking" or
          "target" grid with a pencil marking in the paper version of the game,
          or the appropriate color peg in the pegboard version (red for "hit",
          white for "miss"), in order to build up a picture of the
          opponent's fleet.
        </p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">Battle winner</h2>
        <p className="rules_paragrath">
          When all of the squares of a ship have been hit, the ship's owner
          announces the sinking of the Carrier, Submarine,
          Cruiser/Destroyer/Patrol Boat, or the titular Battleship. If all of a
          player's ships have been sunk, the game is over and their opponent
          wins.
        </p>
      </section>
    </main>
  );
};

export default Rules;
