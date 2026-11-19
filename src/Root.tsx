import { Composition } from "remotion";
import { Intro } from "./Intro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Format vertical 9:16 pour Reels / TikTok / Shorts */}
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ sousTitre: "More than dance" }}
      />
      <Composition
        id="Intro-FR"
        component={Intro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ sousTitre: "Bien plus que des cours de danse" }}
      />
    </>
  );
};
