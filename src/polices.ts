import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Police de la DA MKD Studio, stockée dans public/polices (fonctionne hors ligne)
export const POLICE = "Montserrat";

loadFont({ family: POLICE, url: staticFile("polices/montserrat-latin-300-normal.woff2"), weight: "300" });
loadFont({ family: POLICE, url: staticFile("polices/montserrat-latin-800-normal.woff2"), weight: "800" });
