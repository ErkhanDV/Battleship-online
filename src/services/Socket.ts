import { SOCKET } from '@/services/axios/_constants';

export class Socket {
  instance: WebSocket;

  constructor(id: string) {
    this.instance = new WebSocket(SOCKET);

    this.instance.onopen = () => {
      this.instance.send(JSON.stringify({ gameId: id, method: 'connection' }));
    };

    this.instance.onmessage = (event) => {
      console.log(event.data);
    };
  }
}
