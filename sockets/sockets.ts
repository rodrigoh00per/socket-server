import { Socket } from "socket.io";
import socketIO from "socket.io";

export const desconectar = (cliente: Socket) => {
  //aqui detectamos cuando un cliente se desconecta
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("El mensaje es ", payload);

    io.emit("mensaje-nuevo", payload); //aqui es cuando recibimos un mensaje lo mandamos de vuelta
  });
};
