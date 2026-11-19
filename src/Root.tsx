import { Composition } from "remotion";
import { Intro } from "./Intro";
import { dureePub, PLANS_PAR_DEFAUT, PubFormation } from "./PubFormation";

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
      {/* Pub Meta « Groupe Formation » — 9:16 */}
      <Composition
        id="Pub-Formation"
        component={PubFormation}
        durationInFrames={dureePub(PLANS_PAR_DEFAUT, 30)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={PLANS_PAR_DEFAUT}
        calculateMetadata={({ props }) => ({ durationInFrames: dureePub(props, 30) })}
      />
    </>
  );
};
