import cookieParser from "cookie-parser";
import WebSocket from "./websocket";
import express from "express";
import morgan from "morgan";
import events from "./events";
import config from "./config";
import cors from "cors";
import http from "http";
import { initRoles, initRanks } from "./libs";

//Inits
const app = express();
import "./database";

initRoles();
initRanks();

//import Routes
import routes from "./routes";

//Middlewares
app.use(
  cors({
    origin: config.CORS.ORIGIN,
    credentials: true,
  })
);

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/v1", routes);

// HTTP Server
const httpServer = http.createServer(app);

// WebSocket
const socket = new WebSocket(httpServer, {
  cors: { origin: "*" },
  path: "/api/v1/ws",
});
socket.init(events);

export default httpServer;
