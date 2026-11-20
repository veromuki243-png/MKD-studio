import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { POLICE } from "./polices";
import { CarteFin, Clip, Clips, Flash, PubFormationProps, SECONDES_CTA, Texte } from "./PubFormation";

// Pubs Meta « Cours ados » — 4 versions, 9:16.
// Rushs par style (validé par l'école) : hip-hop = ado7, 11, 12, 13, 15, 17 (trio, extrait de 15), 18 (groupe, extrait de 1) · afro = ado3, 6, 9, 10 · freestyle = ado14, 16
// Messages : hip-hop & afro · freestyle & chorégraphie · mercredi & jeudi · dès 11 ans.

const A = (n: number) => `rushs/ados/ado${n}.mp4`;

const FIN = { cta: "Cours ados", ctaInfos: ["Mercredi & jeudi", "Dès 11 ans"], ctaBouton: "Inscris-toi" };

// ───────────── V1 « Question » : accroche + une rubrique par message ─────────────
export const ADOS_V1: PubFormationProps = {
  plans: [
    { texte: "Tu cherches un cours de danse ?", clips: [{ rush: A(1), debut: 0, duree: 2.6 }], duree: 2.6, placeholder: "" },
    { texte: "Cours ados", petit: "MKD Studio", clips: [{ rush: A(2), debut: 0.5, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Hip-hop", clips: [{ rush: A(17), debut: 0.2, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Afro", clips: [{ rush: A(9), debut: 2, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Freestyle", clips: [{ rush: A(16), debut: 0, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Chorégraphie", clips: [{ rush: A(18), debut: 2.5, duree: 2.6 }], duree: 2.6, placeholder: "" },
    { texte: "Mercredi & jeudi", clips: [{ rush: A(8), debut: 0.5, duree: 2.4 }], duree: 2.4, placeholder: "" },
  ],
  ...FIN,
  cta: "Inscriptions ouvertes",
  ctaInfos: ["Cours ados · Mercredi & jeudi", "Dès 11 ans"],
};

// ───────────── V2 « Rythme » : mots-chocs, coupes rapides ─────────────
export const ADOS_V2: PubFormationProps = {
  plans: [
    { texte: "Hip-hop", clips: [{ rush: A(18), debut: 0.5, duree: 1.2 }], duree: 1.2, placeholder: "" },
    { texte: "Afro", clips: [{ rush: A(10), debut: 10, duree: 1.2 }], duree: 1.2, placeholder: "" },
    { texte: "Freestyle", clips: [{ rush: A(14), debut: 0.3, duree: 1.2 }], duree: 1.2, placeholder: "" },
    // Le groupe (ado18) est déjà utilisé pour le hip-hop dans cette version : on garde le quatuor seul
    { texte: "Chorégraphie", clips: [{ rush: A(8), debut: 2, duree: 1.4 }], duree: 1.4, placeholder: "" },
    { texte: "Tous les mercredis & jeudis", clips: [{ rush: A(7), debut: 0, duree: 1.4 }, { rush: A(5), debut: 1, duree: 1.4 }], duree: 2.8, placeholder: "" },
    { texte: "Pour les ados", petit: "Dès 11 ans", clips: [{ rush: A(2), debut: 4.5, duree: 2.2 }], duree: 2.2, placeholder: "" },
  ],
  ...FIN,
  ctaInfos: ["Mercredi & jeudi", "MKD Studio"],
};

// ───────────── utilitaires communs V3 / V4 ─────────────
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
type Duo = { haut: Clip | Clip[]; bas: Clip | Clip[]; texteHaut: string; texteBas: string };
const liste = (c: Clip | Clip[]) => (Array.isArray(c) ? c : [c]);

const Partage: React.FC<Duo> = ({ haut, bas, texteHaut, texteBas }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 957, overflow: "hidden" }}>
      <Clips clips={liste(haut)} />
    </div>
    <div style={{ position: "absolute", top: 963, left: 0, width: 1080, height: 957, overflow: "hidden" }}>
      <Clips clips={liste(bas)} />
    </div>
    <div style={{ position: "absolute", top: 957, left: 0, width: 1080, height: 6, backgroundColor: "#fff" }} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 120 }}>
      <Etiquette texte={texteHaut} />
      <Etiquette texte={texteBas} retard={8} />
    </AbsoluteFill>
  </AbsoluteFill>
);

// Composant générique, réutilisé pour les adultes
export type EcranPartageProps = {
  intro: { clip: Clip; texte: string; petit?: string };
  duos: Duo[];
  fin: { cta: string; ctaInfos: string[]; ctaBouton: string };
};
const INTRO_S = 2.6;
const DUO_S = 2.8;
export const dureeEcranPartage = (p: EcranPartageProps, fps: number) => Math.round((INTRO_S + DUO_S * p.duos.length + SECONDES_CTA) * fps);

export const EcranPartage: React.FC<EcranPartageProps> = ({ intro, duos, fin }) => {
  const { fps } = useVideoConfig();
  const f = (x: number) => Math.round(x * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={f(INTRO_S)}>
        <Clips clips={[{ ...intro.clip, duree: INTRO_S }]} />
        <AbsoluteFill style={{ background: "rgba(0,0,0,0.3)" }} />
        <Texte texte={intro.texte} petit={intro.petit} grand={false} />
      </Sequence>
      {duos.map((d, i) => (
        <Sequence key={i} from={f(INTRO_S + i * DUO_S)} durationInFrames={f(DUO_S)}>
          <Partage {...d} />
          <Flash />
        </Sequence>
      ))}
      <Sequence from={f(INTRO_S + duos.length * DUO_S)} durationInFrames={f(SECONDES_CTA)}>
        <CarteFin {...fin} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ADOS_V3: EcranPartageProps = {
  intro: { clip: { rush: A(10), debut: 0, duree: INTRO_S }, texte: "Cours ados" },
  duos: [
    { haut: { rush: A(11), debut: 1, duree: 3 }, bas: { rush: A(9), debut: 3, duree: 3 }, texteHaut: "Hip-hop", texteBas: "Afro" },
    { haut: { rush: A(14), debut: 0, duree: 3 }, bas: { rush: A(18), debut: 2.5, duree: 3 }, texteHaut: "Freestyle", texteBas: "Chorégraphie" },
    { haut: { rush: A(2), debut: 3, duree: 3 }, bas: { rush: A(5), debut: 2, duree: 3 }, texteHaut: "Mercredi", texteBas: "Jeudi" },
  ],
  fin: { ...FIN, ctaInfos: ["Mercredi & jeudi", "Dès 11 ans"] },
};

// ───────────── V4 « Check-list » : un seul plan immersif, infos qui s'empilent ─────────────
// Composant générique, réutilisé pour les adultes
export type CheckListProps = {
  clips: Clip[]; // plan(s) de fond, durée totale ≥ durée du plan
  surtitre: string;
  titre: string;
  liste: string[];
  fin: { cta: string; ctaInfos: string[]; ctaBouton: string };
};
const CL_TITRE = 2.2; // secondes avant le 1er élément
const CL_PAS = 1.6; // secondes entre deux éléments
const CL_FIN_LISTE = 2.2; // temps de lecture après le dernier élément
const dureePlanCL = (p: CheckListProps) => CL_TITRE + CL_PAS * (p.liste.length - 1) + CL_FIN_LISTE;
export const dureeCheckList = (p: CheckListProps, fps: number) => Math.round((dureePlanCL(p) + SECONDES_CTA) * fps);

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

export const CheckList: React.FC<CheckListProps> = (props) => {
  const { clips, surtitre, titre, liste, fin } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const plan = Math.round(dureePlanCL(props) * fps);
  const t = spring({ frame, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={plan}>
        <Clips clips={clips} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.55) 100%)" }} />
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 260 }}>
          <div style={{ fontFamily: POLICE, fontWeight: 300, fontSize: 44, letterSpacing: 10, color: "#fff", textTransform: "uppercase", opacity: t, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
            {surtitre}
          </div>
          <div style={{ fontFamily: POLICE, fontWeight: 800, fontSize: 88, color: "#fff", textTransform: "uppercase", textAlign: "center", lineHeight: 1.05, marginTop: 20, maxWidth: 940, opacity: t, textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
            {titre}
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "flex-end", paddingLeft: 90, paddingBottom: 470, gap: 26 }}>
          {liste.map((item, i) => (
            <Coche key={item} texte={item} retard={Math.round((CL_TITRE + i * CL_PAS) * fps)} />
          ))}
        </AbsoluteFill>
      </Sequence>
      <Sequence from={plan} durationInFrames={Math.round(SECONDES_CTA * fps)}>
        <CarteFin {...fin} />
      </Sequence>
    </AbsoluteFill>
  );
};

const ADOS_V4_PLAN = CL_TITRE + CL_PAS * 4 + CL_FIN_LISTE;
export const ADOS_V4: CheckListProps = {
  clips: [{ rush: A(10), debut: 1, duree: ADOS_V4_PLAN }],
  surtitre: "Cours ados · MKD Studio",
  titre: "Ce qui t'attend",
  liste: ["Hip-hop", "Afro", "Freestyle", "Chorégraphie", "Mercredi & jeudi"],
  fin: { ...FIN, ctaInfos: ["Mercredi & jeudi", "Dès 11 ans"] },
};
