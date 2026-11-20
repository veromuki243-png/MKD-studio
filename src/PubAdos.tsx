import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { POLICE } from "./polices";
import { CarteFin, Clip, Clips, Flash, PubFormationProps, SECONDES_CTA, Texte } from "./PubFormation";

// Pubs Meta « Cours ados » — 4 versions, 9:16.
// Rushs par style (validé par l'école) : hip-hop = ado7, 11, 12, 13, 15 · afro = ado3, 6, 9, 10 · freestyle = ado14, 16
// Messages : hip-hop & afro · freestyle & chorés commerciales · mercredi & jeudi · dès 11 ans.

const A = (n: number) => `rushs/ados/ado${n}.mp4`;

const FIN = { cta: "Cours ados", ctaInfos: ["Mercredi & jeudi", "Dès 11 ans"], ctaBouton: "Inscris-toi" };

// ───────────── V1 « Question » : accroche + une rubrique par message ─────────────
export const ADOS_V1: PubFormationProps = {
  plans: [
    { texte: "Tu cherches un cours de danse ?", clips: [{ rush: A(1), debut: 0, duree: 2.6 }], duree: 2.6, placeholder: "" },
    { texte: "Cours ados", petit: "MKD Studio", clips: [{ rush: A(2), debut: 0.5, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Hip-hop", clips: [{ rush: A(15), debut: 5, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Afro", clips: [{ rush: A(9), debut: 2, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Freestyle", clips: [{ rush: A(16), debut: 0, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Chorés commerciales", clips: [{ rush: A(4), debut: 1, duree: 2.3 }], duree: 2.3, placeholder: "" },
    { texte: "Mercredi & jeudi", clips: [{ rush: A(8), debut: 0.5, duree: 2.4 }], duree: 2.4, placeholder: "" },
  ],
  ...FIN,
  cta: "Inscriptions ouvertes",
  ctaInfos: ["Cours ados · Mercredi & jeudi", "Dès 11 ans"],
};

// ───────────── V2 « Rythme » : mots-chocs, coupes rapides ─────────────
export const ADOS_V2: PubFormationProps = {
  plans: [
    { texte: "Hip-hop", clips: [{ rush: A(12), debut: 1, duree: 1.2 }], duree: 1.2, placeholder: "" },
    { texte: "Afro", clips: [{ rush: A(10), debut: 10, duree: 1.2 }], duree: 1.2, placeholder: "" },
    { texte: "Freestyle", clips: [{ rush: A(14), debut: 0.3, duree: 1.2 }], duree: 1.2, placeholder: "" },
    { texte: "Chorés", petit: "commerciales", clips: [{ rush: A(8), debut: 2, duree: 1.4 }], duree: 1.4, placeholder: "" },
    { texte: "Tous les mercredis & jeudis", clips: [{ rush: A(7), debut: 0, duree: 1.4 }, { rush: A(5), debut: 1, duree: 1.4 }], duree: 2.8, placeholder: "" },
    { texte: "Pour les ados", petit: "Dès 11 ans", clips: [{ rush: A(2), debut: 4.5, duree: 2.2 }], duree: 2.2, placeholder: "" },
  ],
  ...FIN,
  ctaInfos: ["Mercredi & jeudi", "MKD Studio"],
};

// ───────────── utilitaires communs V3 / V4 ─────────────
const Video: React.FC<{ clip: Clip }> = ({ clip }) => {
  const { fps } = useVideoConfig();
  return (
    <OffthreadVideo src={staticFile(clip.rush)} startFrom={Math.round(clip.debut * fps)} playbackRate={clip.vitesse ?? 1} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  );
};

const Etiquette: React.FC<{ texte: string; retard?: number }> = ({ texte, retard = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - retard, fps, config: { damping: 14, mass: 0.5 } });
  return (
    <div
      style={{
        fontFamily: POLICE,
        fontWeight: 800,
        fontSize: 84,
        textTransform: "uppercase",
        color: "#000",
        backgroundColor: "#fff",
        padding: "12px 34px",
        lineHeight: 1.1,
        textAlign: "center",
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        opacity: s,
      }}
    >
      {texte}
    </div>
  );
};

// ───────────── V3 « Écran partagé » : les styles face à face ─────────────
type Duo = { haut: Clip; bas: Clip; texteHaut: string; texteBas: string };

const Partage: React.FC<Duo> = ({ haut, bas, texteHaut, texteBas }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 957, overflow: "hidden" }}>
      <Video clip={haut} />
    </div>
    <div style={{ position: "absolute", top: 963, left: 0, width: 1080, height: 957, overflow: "hidden" }}>
      <Video clip={bas} />
    </div>
    <div style={{ position: "absolute", top: 957, left: 0, width: 1080, height: 6, backgroundColor: "#fff" }} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 120 }}>
      <Etiquette texte={texteHaut} />
      <Etiquette texte={texteBas} retard={8} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const V3_SEQ = { intro: 2.6, duo1: 2.8, duo2: 2.8, jours: 2.8 };
export const dureeAdosV3 = (fps: number) => Math.round((V3_SEQ.intro + V3_SEQ.duo1 + V3_SEQ.duo2 + V3_SEQ.jours + SECONDES_CTA) * fps);

export const PubAdosV3: React.FC = () => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  let t = 0;
  const at = (d: number) => {
    const from = t;
    t += f(d);
    return { from, durationInFrames: f(d) };
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...at(V3_SEQ.intro)}>
        <Clips clips={[{ rush: A(10), debut: 0, duree: V3_SEQ.intro }]} />
        <AbsoluteFill style={{ background: "rgba(0,0,0,0.3)" }} />
        <Texte texte="Cours ados" petit="Le programme" grand={false} />
      </Sequence>
      <Sequence {...at(V3_SEQ.duo1)}>
        <Partage haut={{ rush: A(11), debut: 1, duree: 3 }} bas={{ rush: A(9), debut: 3, duree: 3 }} texteHaut="Hip-hop" texteBas="Afro" />
        <Flash />
      </Sequence>
      <Sequence {...at(V3_SEQ.duo2)}>
        <Partage haut={{ rush: A(14), debut: 0, duree: 3 }} bas={{ rush: A(4), debut: 3, duree: 3 }} texteHaut="Freestyle" texteBas="Chorés commerciales" />
        <Flash />
      </Sequence>
      <Sequence {...at(V3_SEQ.jours)}>
        <Partage haut={{ rush: A(2), debut: 3, duree: 3 }} bas={{ rush: A(5), debut: 2, duree: 3 }} texteHaut="Mercredi" texteBas="Jeudi" />
        <Flash />
      </Sequence>
      <Sequence from={t} durationInFrames={f(SECONDES_CTA)}>
        <CarteFin {...FIN} ctaInfos={["Mercredi & jeudi", "Dès 11 ans"]} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ───────────── V4 « Check-list » : un seul plan immersif, infos qui s'empilent ─────────────
const V4_LISTE = ["Hip-hop", "Afro", "Freestyle", "Chorés commerciales", "Mercredi & jeudi"];
const V4_TITRE = 2.2; // secondes avant le 1er élément
const V4_PAS = 1.6; // secondes entre deux éléments
const V4_FIN_LISTE = 2.2; // temps de lecture après le dernier élément
const V4_PLAN = V4_TITRE + V4_PAS * (V4_LISTE.length - 1) + V4_FIN_LISTE;
export const dureeAdosV4 = (fps: number) => Math.round((V4_PLAN + SECONDES_CTA) * fps);

const Coche: React.FC<{ texte: string; retard: number }> = ({ texte, retard }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - retard, fps, config: { damping: 13, mass: 0.5 } });
  const trait = interpolate(frame - retard, [3, 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-80, 0])}px)` }}>
      <div style={{ width: 74, height: 74, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="54" height="54" viewBox="0 0 24 24">
          <path d="M4 12.5l5 5L20 6.5" stroke="#000" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset={trait} />
        </svg>
      </div>
      <div style={{ fontFamily: POLICE, fontWeight: 800, fontSize: 70, color: "#fff", textTransform: "uppercase", textShadow: "0 3px 20px rgba(0,0,0,0.8)", lineHeight: 1.05 }}>{texte}</div>
    </div>
  );
};

export const PubAdosV4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const plan = Math.round(V4_PLAN * fps);
  const titre = spring({ frame, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={plan}>
        <Clips clips={[{ rush: A(10), debut: 1, duree: V4_PLAN }]} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.55) 100%)" }} />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 260 }}>
          <div style={{ fontFamily: POLICE, fontWeight: 300, fontSize: 44, letterSpacing: 10, color: "#fff", textTransform: "uppercase", opacity: titre, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
            Cours ados · MKD Studio
          </div>
          <div style={{ fontFamily: POLICE, fontWeight: 800, fontSize: 88, color: "#fff", textTransform: "uppercase", textAlign: "center", lineHeight: 1.05, marginTop: 20, maxWidth: 940, opacity: titre, textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
            Ce qui t'attend
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "flex-end", paddingLeft: 90, paddingBottom: 470, gap: 26 }}>
          {V4_LISTE.map((item, i) => (
            <Coche key={item} texte={item} retard={Math.round((V4_TITRE + i * V4_PAS) * fps)} />
          ))}
        </AbsoluteFill>
      </Sequence>
      <Sequence from={plan} durationInFrames={Math.round(SECONDES_CTA * fps)}>
        <CarteFin {...FIN} ctaInfos={["Mercredi & jeudi", "Dès 11 ans"]} />
      </Sequence>
    </AbsoluteFill>
  );
};
