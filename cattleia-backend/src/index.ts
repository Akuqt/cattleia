require("dotenv").config();
import app from "./app";
import config from "./config";

//Server Listening
app.listen(config.PORT, () => {
  console.log(`server on port ${config.PORT}`);
});
