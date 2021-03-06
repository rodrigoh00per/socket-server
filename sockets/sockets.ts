import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/UsuariosLista";
import { Usuario } from "../classes/usuario";

export const usuariosLista = new UsuariosLista();
//aqui estamos configurando el cliente por default
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  console.log("----------------------");
  let usuario = new Usuario(cliente.id);
  usuariosLista.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
  //aqui detectamos cuando un cliente se desconecta
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
    console.log("el usuario desconectado es ", cliente.id);

    usuariosLista.borrarUsuario(cliente.id);
    io.emit("usuarios-activos", usuariosLista.getLista());
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("El mensaje es ", payload);

    io.emit("mensaje-nuevo", payload); //aqui es cuando recibimos un mensaje lo mandamos de vuelta
  });
};

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: String }, callback: Function) => {
      usuariosLista.actualizarNombre(cliente.id, payload.nombre);
      console.log(usuariosLista.getLista().length);
      io.emit("usuarios-activos", usuariosLista.getLista());

      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre} configurado`
      });
    }
  );
};


export const clientesConectados = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("clientes-conectados", () => {
    console.log("entre a clientes conectados");
    io.in(cliente.id).emit("usuarios-activos", usuariosLista.getLista());
  });
};
