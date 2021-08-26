require("dotenv").config();
import app from "./app";

//Server Listening
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
