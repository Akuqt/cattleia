import { io, Socket } from "socket.io-client";
import { Server } from "http";
import axios, { AxiosRequestHeaders } from "axios";

interface Options {
  url: string;
  method: "get" | "post";
  header?: AxiosRequestHeaders;
  body?: object;
}

class Bridge {
  constructor(
    private socket: Socket,
    private app: Server,
    private timeOut: number
  ) {}

  public on<T>(ev: string) {
    return new Promise<T>((resolve, reject) => {
      const time = setTimeout(() => {
        this.app.close();
        this.socket.close();
        const err = new Error("Invalid connection.");
        err.name = "Connection Error.";
        reject(err);
      }, this.timeOut);
      this.socket.on(ev, (data: T) => {
        this.app.close();
        this.socket.close();
        resolve(data);
        clearTimeout(time);
      });
    });
  }

  public onWithHttp<T>(ev: string, opts: Options) {
    return new Promise<T>(async (resolve, reject) => {
      const time = setTimeout(() => {
        this.app.close();
        this.socket.close();
        const err = new Error("Invalid connection.");
        err.name = "Connection Error.";
        reject(err);
      }, this.timeOut);

      const time2 = setTimeout(async () => {
        await axios("http://localhost:45000" + opts.url, {
          method: opts.method,
          data: opts.body,
          headers: opts.header,
        });
      }, this.timeOut / 2);

      this.socket.on(ev, (data: T) => {
        this.app.close();
        this.socket.close();
        resolve(data);
        clearTimeout(time2);
        clearTimeout(time);
      });
    });
  }

  public emit(ev: string, data: any) {
    this.socket.emit(ev, data);
    return new Bridge(this.socket, this.app, this.timeOut);
  }
}

/**
 * Makes a request using websockets.
 * @param app Http Server with websocket upgrade.
 * @param path Root for websocket server.
 * @param timeout Time to wait for server answer. Min: 3000 ms. Beware test timeouts.
 * @returns Bringe between on and emit socket methods.
 */
export const wsreq = (app: Server, path: string, timeout?: number) => {
  app.listen(45000);
  const socket = io("http://localhost:45000", {
    path,
  });

  if (timeout && timeout < 3000) {
    timeout = 3000;
  }

  return new Bridge(socket, app, timeout ? timeout : 3000);
};
