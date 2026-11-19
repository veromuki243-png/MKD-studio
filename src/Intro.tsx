import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import { POLICE } from "./polices";

const fontFamily = POLICE;

export const Intro: React.FC<{ sousTitre: string }> = ({ sousTitre }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Le logo arrive avec un léger rebond, en partant un peu plus grand
  const entree = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const scale = interpolate(entree, [0, 1], [1.25, 1]);
  const opaciteLogo = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Le sous-titre apparaît après le logo
  const opaciteSous = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fondu au noir final
  const sortie = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center", fontFamily, color: "#fff" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: sortie }}>
        <Img src={staticFile("marque/logo-blanc.png")} style={{ width: 760, transform: `scale(${scale})`, opacity: opaciteLogo }} />
        <div style={{ fontSize: 46, fontWeight: 300, letterSpacing: 14, marginTop: 20, opacity: opaciteSous, textAlign: "center" }}>
          {sousTitre.toUpperCase()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
