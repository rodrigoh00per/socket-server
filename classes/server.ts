import express from "express";
import { SERVER_PORT } from "../global/enviroment";

import http from "http";
import SocketIO from "socket.io";
import * as socket from "../sockets/sockets";

//recuerda instalar types/express

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  public io: SocketIO.Server; //es la configuracion de los sockets
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);

    this.io = SocketIO(this.httpServer); //tenemos que poner este mismo configurado
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new Server());
  }

  private escucharSockets() {
    console.log("escuchando conexiones");
    //el on es para escuchar eventos
    this.io.on("connection", cliente => {
      socket.conectarCliente(cliente, this.io);

      //configurar usuario
      socket.configurarUsuario(cliente, this.io);

      socket.clientesConectados(cliente,this.io);

      //mensajes
      socket.mensaje(cliente, this.io);
      //desconectar
      socket.desconectar(cliente, this.io); //aqui mandamos a llamar la funcion de cuando un cliente se desconecta
    });
  }
  start(callback: any) {
    return this.httpServer.listen(this.port, callback);
  }
}
