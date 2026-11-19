import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { POLICE } from "./polices";

// Pub Meta « Groupe Formation » — 9:16 (Reels / Stories), textes dans la zone centrale
// pour qu'un recadrage 4:5 (fil d'actualité) reste lisible.

type Plan = {
  texte: string; // texte affiché
  petit?: string; // ligne secondaire
  rush?: string; // chemin dans public/, ex. "rushs/formation/voyage.mp4"
  debut?: number; // seconde de départ dans le rush
  duree: number; // durée du plan en secondes
  placeholder: string; // description du plan à tourner / choisir
};

export type PubFormationProps = { plans: Plan[]; cta: string; ctaPetit: string };

export const PLANS_PAR_DEFAUT: PubFormationProps = {
  plans: [
    { texte: "T'as envie de faire partie du groupe ?", duree: 3, placeholder: "Le groupe en ligne, face caméra, sur un gros temps fort" },
    { texte: "Le groupe formation", petit: "MKD Studio", duree: 2.5, placeholder: "Plan large du groupe à l'entraînement" },
    { texte: "Voyages", duree: 2.2, placeholder: "Le groupe en voyage / en déplacement" },
    { texte: "Cours intensifs", duree: 2.2, placeholder: "Entraînement intense, sueur, répétition" },
    { texte: "Shootings", petit: "Photo & vidéo", duree: 2.2, placeholder: "Backstage d'un shooting" },
    { texte: "Profs invités", duree: 2.2, placeholder: "Workshop avec un prof invité" },
    { texte: "Concours", duree: 2.2, placeholder: "Scène / battle / podium" },
    { texte: "More than dance", duree: 2.5, placeholder: "Moment fort collectif : cri, câlin de groupe, salut" },
  ],
  cta: "Rejoins le groupe",
  ctaPetit: "Envoie-nous un message",
};

const SECONDES_CTA = 3;

export const dureePub = (p: PubFormationProps, fps: number) =>
  Math.round((p.plans.reduce((t, x) => t + x.duree, 0) + SECONDES_CTA) * fps);

const Placeholder: React.FC<{ description: string; index: number }> = ({ description, index }) => (
  <AbsoluteFill style={{ backgroundColor: index % 2 ? "#1c1c1c" : "#262626", justifyContent: "flex-start", alignItems: "center" }}>
    <div style={{ marginTop: 300, color: "#777", fontSize: 34, fontFamily: POLICE, fontWeight: 300, textAlign: "center", maxWidth: 800, lineHeight: 1.4 }}>
      PLAN {index + 1} — À REMPLACER
      <br />
      {description}
    </div>
  </AbsoluteFill>
);

const Texte: React.FC<{ texte: string; petit?: string; grand: boolean }> = ({ texte, petit, grand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entree = spring({ frame, fps, config: { damping: 15, mass: 0.5 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div
        style={{
          fontFamily: POLICE,
          fontWeight: 800,
          fontSize: grand ? 110 : 130,
          lineHeight: 1.05,
          color: "#fff",
          textTransform: "uppercase",
          textAlign: "center",
          textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          transform: `translateY(${interpolate(entree, [0, 1], [60, 0])}px) scale(${interpolate(entree, [0, 1], [1.15, 1])})`,
          opacity: entree,
        }}
      >
        {texte}
      </div>
      {petit && (
        <div style={{ fontFamily: POLICE, fontWeight: 300, fontSize: 46, letterSpacing: 14, color: "#fff", marginTop: 30, textTransform: "uppercase", opacity: interpolate(frame, [6, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {petit}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: interpolate(frame, [0, 4], [0.7, 0], { extrapolateRight: "clamp" }) }} />;
};

const CarteFin: React.FC<{ cta: string; ctaPetit: string }> = ({ cta, ctaPetit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center", fontFamily: POLICE, color: "#fff" }}>
      <Img src={staticFile("marque/logo-blanc.png")} style={{ width: 560, transform: `scale(${interpolate(s, [0, 1], [1.2, 1])})`, opacity: s }} />
      <div style={{ fontWeight: 800, fontSize: 84, textTransform: "uppercase", marginTop: 10, textAlign: "center", opacity: interpolate(frame, [8, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {cta}
      </div>
      <div style={{ fontWeight: 300, fontSize: 40, letterSpacing: 10, marginTop: 30, textTransform: "uppercase", opacity: interpolate(frame, [16, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {ctaPetit}
      </div>
    </AbsoluteFill>
  );
};

export const PubFormation: React.FC<PubFormationProps> = ({ plans, cta, ctaPetit }) => {
  const { fps } = useVideoConfig();
  let curseur = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {plans.map((plan, i) => {
        const from = curseur;
        const duree = Math.round(plan.duree * fps);
        curseur += duree;
        return (
          <Sequence key={i} from={from} durationInFrames={duree}>
            {plan.rush ? (
              <OffthreadVideo src={staticFile(plan.rush)} startFrom={Math.round((plan.debut ?? 0) * fps)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Placeholder description={plan.placeholder} index={i} />
            )}
            <Texte texte={plan.texte} petit={plan.petit} grand={i === 0} />
            {i > 0 && <Flash />}
          </Sequence>
        );
      })}
      <Sequence from={curseur} durationInFrames={SECONDES_CTA * fps}>
        <CarteFin cta={cta} ctaPetit={ctaPetit} />
      </Sequence>
    </AbsoluteFill>
  );
};
