import path from "path";
import os from "os";

export const abb_path = path.resolve(
  "../../apps/mobile/android/app/build/outputs/bundle/release/app-release.aab"
);
export const unbundle =
  "cd out && java -jar ../core/bundletool.jar build-apks --bundle=bundle.aab --output=out.apks --mode=universal";

export const rmmk = () => {
  switch (os.platform()) {
    case "win32":
      return "if not exist out (mkdir out) else (rmdir /s /q out && mkdir out)";

    default:
      return "rm -rf out && mkdir out";
  }
};

export const clean = () => {
  switch (os.platform()) {
    case "win32":
      return "cd out && del *.apks *.aab *.pb && ren universal.apk app.apk";

    default:
      return "cd out && rm *.apks *.aab *.pb && mv universal.apk app.apk";
  }
};
