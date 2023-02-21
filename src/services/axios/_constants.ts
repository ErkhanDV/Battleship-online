export const CLONE_SERVER = 'https://battle-ship.up.railway.app/api';

export const SOCKET = 'wss://battle-ship.up.railway.app/game';

export enum SOCKETMETHOD {
  connect = 'connection',
  shoot = 'shoot',
  gameover = 'gameover',
  ready = 'ready',
  exit = 'exit',
  chat = 'chat',
}

export enum STATUS {
  ok = 200,
  created = 201,
  notFound = 404,
  serverError = 500,
  unAuthorized = 401,
  forbidden = 403,
}
