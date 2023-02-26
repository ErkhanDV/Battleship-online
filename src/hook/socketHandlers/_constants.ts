export const WINNER = {
  disconnect: 'Opponent has left the battle, you can wait, he may to return',
  reconnect: 'Opponent has returned',
  exit: 'The enemy has left the battle',
  win: 'You have sunk all enemy ships',
  lose(opponent: string): string {
    return `${opponent} destroyed all your ships`;
  },
};
