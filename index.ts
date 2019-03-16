import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//vamos a configurar cors aunque no esten en el mismo dominio
server.app.use(cors({ origin: true, credentials: true }));

server.app.use("/api", router);

server.start(() => {
  console.log(`Servidor levantado en  puerto ${SERVER_PORT}`);
});
