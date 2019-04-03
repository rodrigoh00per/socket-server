import { Router, Request, Response } from "express";
import Server from "../classes/server";

const router = Router();

const instanceServer = Server.instance;
router.get("/", (req: Request, res: Response) => {
  return res.send({ mensaje: "El mensajazo de los dioses" });
});

router.post("/", (req: Request, res: Response) => {
  return res.send({ mensaje: "El mensajazo de los dioses" });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  const { id } = req.params;
  let payload = { cuerpo, de };

  instanceServer.io.in(id).emit("mensaje-privado", payload);
  return res.send({ ok: true, cuerpo, de });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  let payload = { de, cuerpo };
  instanceServer.io.emit("mensaje-nuevo", payload);
  return res.send({ ok: true, cuerpo, de });
});

export default router;
