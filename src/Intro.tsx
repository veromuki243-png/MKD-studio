import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro: React.FC<{ titre: string; sousTitre: string }> = ({ titre, sousTitre }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacitySous = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #1a1a2e 0%, #6a1b4d 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "white",
      }}
    >
      <div style={{ fontSize: 150, fontWeight: 800, transform: `scale(${scale})` }}>{titre}</div>
      <div style={{ fontSize: 64, marginTop: 30, opacity: opacitySous, letterSpacing: 8 }}>
        {sousTitre.toUpperCase()}
      </div>
    </AbsoluteFill>
  );
};
