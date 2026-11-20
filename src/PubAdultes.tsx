import { CheckListProps, EcranPartageProps } from "./PubAdos";
import { PubFormationProps } from "./PubFormation";

// Pubs Meta « Cours adultes » — 4 versions, 9:16.
// Message : se détendre après le boulot, ne penser à rien, s'amuser.
// Afterwork dance & hip-hop adultes, chaque jeudi. Ambiance garantie.
// Rushs : adu1 studio clair · adu2 scène violette · adu3 hip-hop (visages floutés : adu3-floute)
//         adu4 afterwork violet (s'arrêter avant 7,3 s : plan des pieds) · adu5 grand groupe violet

const D = (n: number) => `rushs/adultes/adu${n}.mp4`;
const HIPHOP = "rushs/adultes/adu3-floute.mp4"; // toujours utiliser la version floutée

const FIN = { cta: "Cours adultes", ctaInfos: ["Afterwork & hip-hop", "Chaque jeudi"], ctaBouton: "Inscris-toi" };

// ───────────── V1 « Question » ─────────────
export const ADULTES_V1: PubFormationProps = {
  plans: [
    { texte: "Envie de te détendre après le boulot ?", clips: [{ rush: D(5), debut: 0.5, duree: 3 }], duree: 3, placeholder: "" },
    { texte: "Ne pense à rien", clips: [{ rush: D(4), debut: 0.3, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Amuse-toi", clips: [{ rush: D(1), debut: 0.5, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Afterwork dance", clips: [{ rush: D(2), debut: 0, duree: 2.4 }], duree: 2.4, placeholder: "" },
    { texte: "Hip-hop", clips: [{ rush: HIPHOP, debut: 3, duree: 2.4 }], duree: 2.4, placeholder: "" },
    { texte: "Chaque jeudi", clips: [{ rush: D(1), debut: 11, duree: 2.2 }], duree: 2.2, placeholder: "" },
    { texte: "Ambiance garantie", clips: [{ rush: D(5), debut: 5.5, duree: 2.4 }], duree: 2.4, placeholder: "" },
  ],
  ...FIN,
};

// ───────────── V2 « Métro, boulot, dodo ? » ─────────────
export const ADULTES_V2: PubFormationProps = {
  plans: [
    { texte: "Métro.", fondNoir: true, duree: 0.7, placeholder: "" },
    { texte: "Boulot.", fondNoir: true, duree: 0.7, placeholder: "" },
    { texte: "Dodo ?", fondNoir: true, duree: 0.9, placeholder: "" },
    { texte: "Pas le jeudi.", clips: [{ rush: D(5), debut: 2, duree: 2 }], duree: 2, placeholder: "" },
    { texte: "Afterwork", clips: [{ rush: D(4), debut: 3.2, duree: 1.4 }], duree: 1.4, placeholder: "" },
    { texte: "Hip-hop", clips: [{ rush: HIPHOP, debut: 6, duree: 1.4 }], duree: 1.4, placeholder: "" },
    { texte: "Zéro prise de tête", clips: [{ rush: D(1), debut: 4, duree: 1.8 }], duree: 1.8, placeholder: "" },
    { texte: "Ambiance garantie", clips: [{ rush: D(2), debut: 2.5, duree: 2 }], duree: 2, placeholder: "" },
  ],
  ...FIN,
};

// ───────────── V3 « Écran partagé » ─────────────
export const ADULTES_V3: EcranPartageProps = {
  intro: { clip: { rush: D(5), debut: 0, duree: 2.6 }, texte: "Ton jeudi soir", petit: "Cours adultes" },
  duos: [
    { haut: { rush: D(4), debut: 0.3, duree: 3 }, bas: { rush: HIPHOP, debut: 2, duree: 3 }, texteHaut: "Afterwork", texteBas: "Hip-hop" },
    { haut: { rush: D(2), debut: 0, duree: 3 }, bas: { rush: D(5), debut: 5, duree: 3 }, texteHaut: "Détente", texteBas: "Ambiance" },
    { haut: { rush: D(1), debut: 1, duree: 3 }, bas: { rush: D(1), debut: 8.5, duree: 3 }, texteHaut: "Chaque", texteBas: "Jeudi" },
  ],
  fin: FIN,
};

// ───────────── V4 « Check-list » ─────────────
export const ADULTES_V4: CheckListProps = {
  clips: [{ rush: D(5), debut: 0, duree: 9 }, { rush: D(4), debut: 0.3, duree: 1.8 }],
  surtitre: "Cours adultes · MKD Studio",
  titre: "Ton jeudi soir",
  liste: ["Afterwork dance", "Hip-hop", "Zéro prise de tête", "Ambiance garantie", "Nouvelles rencontres"],
  fin: FIN,
};
