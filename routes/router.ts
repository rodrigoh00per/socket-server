import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosLista } from "../sockets/sockets";

const router = Router();

const instanceServer = Server.instance;

router.post("/mensajes", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;

  let payload = { cuerpo, de };
  instanceServer.io.emit("mensaje-nuevo", payload);
  return res.send({ ok: true, cuerpo, de });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;

  const { id } = req.params;
  let payload = { cuerpo, de };

  instanceServer.io.in(id).emit("mensaje-privado", payload);
  return res.send({ ok: true, cuerpo, de });
});

//obtener los id de los usuarios conectados
router.get("/usuarios", (req: Request, res: Response) => {
  instanceServer.io.clients((err: any, clientes: String[]) => {
    if (err) {
      return res.send({ ok: false, err });
    }
    return res.send({ ok: true, clientes });
  });
});

router.get("/usuarios/detalle", (req: Request, res: Response) => {
  let usuariosConec = usuariosLista.getLista();

  
  return res.send({ ok: true, clientes: usuariosConec });
});

export default router;
