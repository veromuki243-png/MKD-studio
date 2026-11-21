import { CheckListProps, EcranPartageProps } from "./PubAdos";
import { PubFormationProps } from "./PubFormation";

// Pubs Meta « Cours enfants » — 4 versions, 9:16. On parle aux parents (vouvoiement).
// Messages : votre enfant aime bouger / plein d'énergie · danse · confiance en soi ·
// préparation physique · breakdance (attirer plus de garçons) · mercredi & jeudi.
// Rushs : enf1 circuit au sol (cerceaux, pompes) · enf2 échelle de rythme + course à quatre pattes
//         enf3 grand cours face au miroir · enf4 garçons en cours de break · enf5 break au sol (figures)
//         enf6 garçon en rouge qui danse · enf7 chorégraphie de dos · (enf5 = extrait de enf4)

const E = (n: number) => `rushs/enfants/enf${n}.mp4`;

const FIN = { cta: "Cours enfants", ctaInfos: ["Mercredi & jeudi", "MKD Studio"], ctaBouton: "Je l'inscris" };

// ───────────── V1 « Question » ─────────────
export const ENFANTS_V1: PubFormationProps = {
  plans: [
    { texte: "Votre enfant aime bouger ?", clips: [{ rush: E(6), debut: 0, duree: 2.6, vitesse: 0.85 }], duree: 2.6, placeholder: "" },
    { texte: "Plein d'énergie ?", clips: [{ rush: E(2), debut: 0.2, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Danse", clips: [{ rush: E(3), debut: 4, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Breakdance", clips: [{ rush: E(5), debut: 0, duree: 2.4 }], duree: 2.4, placeholder: "" },
    { texte: "Préparation physique", clips: [{ rush: E(1), debut: 0.3, duree: 2.4 }], duree: 2.4, placeholder: "" },
    { texte: "Confiance en soi", clips: [{ rush: E(7), debut: 1, duree: 2.3 }], duree: 2.3, placeholder: "" },
    { texte: "Mercredi & jeudi", clips: [{ rush: E(3), debut: 9, duree: 2.2 }], duree: 2.2, placeholder: "" },
  ],
  ...FIN,
};

// ───────────── V2 « Breakdance » : pensée pour attirer les garçons ─────────────
export const ENFANTS_V2: PubFormationProps = {
  plans: [
    { texte: "Votre fils ne tient pas en place ?", clips: [{ rush: E(4), debut: 0, duree: 2.7 }], duree: 2.7, placeholder: "" },
    { texte: "Il a besoin de se dépenser ?", clips: [{ rush: E(2), debut: 4.2, duree: 2.4 }], duree: 2.4, placeholder: "" },
    { texte: "Breakdance", petit: "Cours enfants", clips: [{ rush: E(5), debut: 0, duree: 2.6 }], duree: 2.6, placeholder: "" },
    { texte: "Force & agilité", clips: [{ rush: E(1), debut: 1, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Confiance en soi", clips: [{ rush: E(4), debut: 2.7, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Mercredi & jeudi", clips: [{ rush: E(4), debut: 5, duree: 2.2 }], duree: 2.2, placeholder: "" },
  ],
  ...FIN,
  cta: "Breakdance enfants",
};

// ───────────── V3 « Écran partagé » ─────────────
export const ENFANTS_V3: EcranPartageProps = {
  intro: { clip: { rush: E(3), debut: 0, duree: 2.6 }, texte: "Cours enfants" },
  duos: [
    { haut: { rush: E(7), debut: 0, duree: 3 }, bas: { rush: E(5), debut: 0, duree: 3 }, texteHaut: "Danse", texteBas: "Breakdance" },
    { haut: { rush: E(1), debut: 0.3, duree: 3 }, bas: { rush: E(4), debut: 2.5, duree: 3 }, texteHaut: "Prépa physique", texteBas: "Confiance en soi" },
    { haut: { rush: E(3), debut: 6, duree: 3 }, bas: { rush: E(2), debut: 0, duree: 3 }, texteHaut: "Mercredi", texteBas: "Jeudi" },
  ],
  fin: FIN,
};

// ───────────── V4 « Check-list » ─────────────
export const ENFANTS_V4: CheckListProps = {
  clips: [{ rush: E(3), debut: 0, duree: 11 }],
  surtitre: "Cours enfants · MKD Studio",
  titre: "Plein d'énergie ?",
  liste: ["Danse", "Breakdance", "Préparation physique", "Confiance en soi", "Mercredi & jeudi"],
  fin: FIN,
};
