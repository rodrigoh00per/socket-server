/* 
    ================================================= 
    =================================================
// AQUI ESTA CENTRALIZADO TODA LA LOGICA DE LOS USUARIOS //
    =================================================
    =================================================
*/

import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[];//Aqui vamos a agregar los usuarios conectados 

  constructor() {
    this.lista = [];
  }
  //agregamos un usuario
  agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }
  //actualizamos el nombre del usuario que entro a la sala
  actualizarNombre(id: String, nombre: String) {
    this.lista.forEach(usuario => {
      if (usuario.id === id) {
        usuario.nombre = nombre;
      }
    });
   
  }
  //Regresa la lista de todos los usuarios que estan ahorita en el arreglo
  getLista() {
    return this.lista;
  }
  //nos regresa un solo usuario
  getUsuario(id: String) {
    return this.lista.find(usuario => usuario.id === id);
  }

  //nos regresa todos los usuarios de la sala
  getUsuariosSala(sala: String) {
    return this.lista.filter(usuario => usuario.sala === sala);
  }
  //sacamos un usuario del arreglo
  borrarUsuario(id: String) {
    let usuarioTemp = this.getUsuario(id);

    this.lista = this.lista.filter(usuario => {
      return usuario.id! == id;
    });

    return usuarioTemp;
  }




  
}
