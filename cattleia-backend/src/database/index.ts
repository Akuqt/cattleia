import mongoose, { ConnectionOptions } from "mongoose";
import config from "../config";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const uri =
  process.env.NODE_ENV === "test"
    ? config.MONGODB.TEST_URI
    : config.MONGODB.URI;

mongoose.connect(uri, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection stablished.");
});

connection.on("error", (err) => {
  console.log("Mongodb connection error:", err);
  process.exit(0);
});
