import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.send({ mensaje: "El mensajazo de los dioses" });
});

router.post("/", (req: Request, res: Response) => {
  return res.send({ mensaje: "El mensajazo de los dioses" });
});

export default router;
