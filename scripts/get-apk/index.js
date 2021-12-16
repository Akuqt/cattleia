import path from "path";
import fs from "fs/promises";
import extract from "extract-zip";
import { abb_path, rmmk, unbundle, clean } from "./helper/index.js";
import { exec as execute } from "child_process";
import { promisify } from "util";

const exec = promisify(execute);

export const getApk = async () => {
  try {
    await exec(rmmk());
    await fs.copyFile(abb_path, "./out/bundle.aab");
    await exec(unbundle);
    await extract("./out/out.apks", { dir: path.resolve("./out") });
    await exec(clean());
    console.log(`Output: ${path.resolve("./out/app.apk")}`);
  } catch (error) {
    console.error(error.message);
  }
};

await getApk();
