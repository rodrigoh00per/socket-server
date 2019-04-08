export class Usuario {
  id: String;//id del socket(obligatorio)
  nombre: String;//nombre del usuario
  sala: String;//para hacerlo mas especifico

  constructor(id: String) {
    this.id = id;
    this.nombre = "sin-nombre";
    this.sala = "sin-sala";
  }
}
