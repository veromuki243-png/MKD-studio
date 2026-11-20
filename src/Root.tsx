import { Composition } from "remotion";
import { Intro } from "./Intro";
import { ADOS_V1, ADOS_V2, ADOS_V3, ADOS_V4, CheckList, dureeCheckList, dureeEcranPartage, EcranPartage } from "./PubAdos";
import { ADULTES_V1, ADULTES_V2, ADULTES_V3, ADULTES_V4 } from "./PubAdultes";
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
      {/* Pubs Meta « Cours ados » — 4 versions, 9:16 */}
      <Composition id="Pub-Ados-V1-Question" component={PubFormation} durationInFrames={dureePub(ADOS_V1, 30)} fps={30} width={1080} height={1920} defaultProps={ADOS_V1} />
      <Composition id="Pub-Ados-V2-Rythme" component={PubFormation} durationInFrames={dureePub(ADOS_V2, 30)} fps={30} width={1080} height={1920} defaultProps={ADOS_V2} />
      <Composition id="Pub-Ados-V3-Ecran-partage" component={EcranPartage} durationInFrames={dureeEcranPartage(ADOS_V3, 30)} fps={30} width={1080} height={1920} defaultProps={ADOS_V3} />
      <Composition id="Pub-Ados-V4-Check-list" component={CheckList} durationInFrames={dureeCheckList(ADOS_V4, 30)} fps={30} width={1080} height={1920} defaultProps={ADOS_V4} />
      {/* Pubs Meta « Cours adultes » — 4 versions, 9:16 */}
      <Composition id="Pub-Adultes-V1-Question" component={PubFormation} durationInFrames={dureePub(ADULTES_V1, 30)} fps={30} width={1080} height={1920} defaultProps={ADULTES_V1} />
      <Composition id="Pub-Adultes-V2-Metro-boulot-dodo" component={PubFormation} durationInFrames={dureePub(ADULTES_V2, 30)} fps={30} width={1080} height={1920} defaultProps={ADULTES_V2} />
      <Composition id="Pub-Adultes-V3-Ecran-partage" component={EcranPartage} durationInFrames={dureeEcranPartage(ADULTES_V3, 30)} fps={30} width={1080} height={1920} defaultProps={ADULTES_V3} />
      <Composition id="Pub-Adultes-V4-Check-list" component={CheckList} durationInFrames={dureeCheckList(ADULTES_V4, 30)} fps={30} width={1080} height={1920} defaultProps={ADULTES_V4} />
    </>
  );
};
