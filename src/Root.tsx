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
        defaultProps={{ titre: "MKD Studio", sousTitre: "École de danse" }}
      />
    </>
  );
};
