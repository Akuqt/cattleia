import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import { initRoles, initRanks } from "./libs";

//Inits
const app = express();
import "./database";

initRoles();
initRanks();

//import Routes
import routes from "./routes";

//settings
app.set("port", config.PORT);

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

export default app;
