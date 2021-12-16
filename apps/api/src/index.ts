require("dotenv").config();
import app from "./app";
import config from "./config";
import { connect } from "./database";

//Server Listening
app.listen(config.PORT, async () => {
  console.log(`Local: http://localhost:${config.PORT}/`);
  await connect();
});
