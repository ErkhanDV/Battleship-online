export interface IGameField {
  isReady?: boolean;
  socket?: WebSocket | null;
  readyHandler?: () => void;
}
