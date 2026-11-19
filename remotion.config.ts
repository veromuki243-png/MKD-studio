import { Config } from "@remotion/cli/config";
import { existsSync } from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Dans l'environnement cloud, le téléchargement du navigateur est bloqué :
// on utilise le Chromium déjà installé s'il est présent.
const chromiumLocal = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (existsSync(chromiumLocal)) {
  Config.setBrowserExecutable(chromiumLocal);
}
