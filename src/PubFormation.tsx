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

// rush = chemin dans public/ · duree = durée à l'écran · vitesse < 1 = ralenti
type Clip = { rush: string; debut: number; duree: number; vitesse?: number };

type Plan = {
  texte: string; // texte affiché
  petit?: string; // ligne secondaire
  clips?: Clip[]; // un ou plusieurs extraits enchaînés sous le même texte
  duree: number; // durée du plan si pas de clips (emplacement vide)
  placeholder: string; // description du plan à tourner / choisir
  enHaut?: boolean; // texte en haut pour laisser voir le sujet
};

export type PubFormationProps = { plans: Plan[]; cta: string; ctaInfos: string[]; ctaBouton: string };

const dureePlan = (p: Plan) => (p.clips ? p.clips.reduce((t, c) => t + c.duree, 0) : p.duree);
const R = (n: number) => `rushs/formation/rush${n}.mp4`;

export const PLANS_PAR_DEFAUT: PubFormationProps = {
  plans: [
    { texte: "T'as envie de faire partie d'un groupe de danse ?", clips: [{ rush: R(1), debut: 0, duree: 1.9, vitesse: 0.75 }, { rush: R(1), debut: 1.45, duree: 0.95 }], duree: 2.85, placeholder: "Couloir + studio" },
    { texte: "Le groupe formation", petit: "MKD Studio", enHaut: true, clips: [{ rush: R(5), debut: 0, duree: 2.5 }], duree: 2.5, placeholder: "Le groupe avec les lettres MKD" },
    { texte: "Voyages", clips: [{ rush: R(1), debut: 5.7, duree: 1.2 }, { rush: R(1), debut: 8.45, duree: 1.3 }], duree: 2.5, placeholder: "Aéroport + ville" },
    { texte: "Cours intensifs", clips: [{ rush: R(4), debut: 10.7, duree: 2.2 }], duree: 2.2, placeholder: "Travail au sol" },
    { texte: "Shootings", petit: "Photo & vidéo", clips: [{ rush: R(3), debut: 0.4, duree: 2.3 }], duree: 2.3, placeholder: "Backstage shooting" },
    { texte: "Profs invités", clips: [{ rush: R(1), debut: 2.42, duree: 1.2 }, { rush: R(2), debut: 10.8, duree: 1.2 }], duree: 2.4, placeholder: "Profs en cours" },
    { texte: "More than dance", clips: [{ rush: R(6), debut: 4.5, duree: 1.3 }, { rush: R(2), debut: 20, duree: 1.4 }], duree: 2.7, placeholder: "Moment collectif" },
  ],
  cta: "Inscriptions ouvertes",
  ctaInfos: ["Groupes ados & adultes", "Dès 11 ans"],
  ctaBouton: "Inscris-toi",
};

const SECONDES_CTA = 3.5;

export const dureePub = (p: PubFormationProps, fps: number) =>
  Math.round((p.plans.reduce((t, x) => t + dureePlan(x), 0) + SECONDES_CTA) * fps);
const Placeholder: React.FC<{ description: string; index: number }> = ({ description, index }) => (
  <AbsoluteFill style={{ backgroundColor: index % 2 ? "#1c1c1c" : "#262626", justifyContent: "flex-start", alignItems: "center" }}>
    <div style={{ marginTop: 300, color: "#777", fontSize: 34, fontFamily: POLICE, fontWeight: 300, textAlign: "center", maxWidth: 800, lineHeight: 1.4 }}>
      PLAN {index + 1} — À REMPLACER
      <br />
      {description}
    </div>
  </AbsoluteFill>
);

const Texte: React.FC<{ texte: string; petit?: string; grand: boolean; enHaut?: boolean }> = ({ texte, petit, grand, enHaut }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entree = spring({ frame, fps, config: { damping: 15, mass: 0.5 } });
  return (
    <AbsoluteFill style={{ justifyContent: enHaut ? "flex-start" : "center", alignItems: "center", padding: 80, paddingTop: enHaut ? 330 : 80 }}>
      <div
        style={{
          fontFamily: POLICE,
          fontWeight: 800,
          fontSize: grand ? 100 : 130,
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

const Clips: React.FC<{ clips: Clip[] }> = ({ clips }) => {
  const { fps } = useVideoConfig();
  let t = 0;
  return (
    <>
      {clips.map((c, j) => {
        const from = t;
        const d = Math.round(c.duree * fps);
        t += d;
        return (
          <Sequence key={j} from={from} durationInFrames={d}>
            <OffthreadVideo src={staticFile(c.rush)} startFrom={Math.round(c.debut * fps)} playbackRate={c.vitesse ?? 1} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        );
      })}
    </>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: "#fff", opacity: interpolate(frame, [0, 4], [0.7, 0], { extrapolateRight: "clamp" }) }} />;
};

const CarteFin: React.FC<{ cta: string; ctaInfos: string[]; ctaBouton: string }> = ({ cta, ctaInfos, ctaBouton }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  const fondu = (debut: number) => interpolate(frame, [debut, debut + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rebond = Math.abs(Math.sin((frame / fps) * Math.PI * 2)) * 18;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center", fontFamily: POLICE, color: "#fff" }}>
      <Img src={staticFile("marque/logo-blanc.png")} style={{ width: 520, transform: `scale(${interpolate(s, [0, 1], [1.2, 1])})`, opacity: s }} />
      <div style={{ fontWeight: 800, fontSize: 86, lineHeight: 1.05, textTransform: "uppercase", textAlign: "center", maxWidth: 900, opacity: fondu(8) }}>{cta}</div>
      {ctaInfos.map((info, i) => (
        <div key={i} style={{ fontWeight: 300, fontSize: 44, letterSpacing: 10, marginTop: i === 0 ? 40 : 14, textTransform: "uppercase", opacity: fondu(16 + i * 6) }}>
          {info}
        </div>
      ))}
      <div style={{ marginTop: 70, opacity: fondu(30), display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ border: "3px solid #fff", padding: "22px 60px", fontWeight: 800, fontSize: 52, textTransform: "uppercase", letterSpacing: 4 }}>{ctaBouton}</div>
        <svg width="70" height="70" viewBox="0 0 24 24" style={{ marginTop: 24, transform: `translateY(${rebond}px)` }}>
          <path d="M12 3v16M5 12l7 7 7-7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

export const PubFormation: React.FC<PubFormationProps> = ({ plans, cta, ctaInfos, ctaBouton }) => {
  const { fps } = useVideoConfig();
  let curseur = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {plans.map((plan, i) => {
        const from = curseur;
        const duree = Math.round(dureePlan(plan) * fps);
        curseur += duree;
        return (
          <Sequence key={i} from={from} durationInFrames={duree}>
            {plan.clips ? (
              <Clips clips={plan.clips} />
            ) : (
              <Placeholder description={plan.placeholder} index={i} />
            )}
            {/* Léger assombrissement pour la lisibilité du texte */}
            <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 70%)" }} />
            <Texte texte={plan.texte} petit={plan.petit} grand={i === 0} enHaut={plan.enHaut} />
            {i > 0 && <Flash />}
          </Sequence>
        );
      })}
      <Sequence from={curseur} durationInFrames={SECONDES_CTA * fps}>
        <CarteFin cta={cta} ctaInfos={ctaInfos} ctaBouton={ctaBouton} />
      </Sequence>
    </AbsoluteFill>
  );
};
