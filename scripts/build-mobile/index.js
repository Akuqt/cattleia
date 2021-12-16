import { exec as execute } from "child_process";
import { promisify } from "util";
import { app_path } from "./helper/index.js";

const exec = promisify(execute);

try {
  await exec(`cd ${app_path} && gradlew bundleRelease`);
} catch (error) {
  console.error(error.message);
}
