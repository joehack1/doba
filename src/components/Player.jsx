import React from "react";
import styled from "styled-components";
import useAudio from "../hooks/useAudio";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Container = styled.div`
  grid-column: 1 / -1;
  background: rgba(255,255,255,0.03);
  border-radius: ${(p) => p.theme.radius};
  padding: 16px 20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
`;

const Info = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
`;
const Cover = styled.img`
  width:64px; height:64px; border-radius:8px; object-fit:cover;
  box-shadow: 0 6px 18px rgba(0,0,0,0.6);
`;
const Text = styled.div`
  line-height:1;
  h4{ margin:0; font-size:16px; color: ${({ theme }) => theme.colors.text}; }
  p{ margin:0; font-size:12px; color: ${({ theme }) => theme.colors.subtext}; }
`;
const Controls = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
`;
const Slider = styled.input.attrs({ type: "range" })`
  width: 360px;
  accent-color: #9d4edd;
`;

export default function Player({ tracks, currentIndex, onNext, onPrev }) {
  const track = tracks[currentIndex] || {};
  const { playing, setPlaying, toggle, time, duration, seek } = useAudio(track?.url);

  // Auto-play when track changes
  React.useEffect(() => {
    if (track?.url) setPlaying(true);
    else setPlaying(false);
  }, [track?.url, setPlaying]);

  // Format seconds -> mm:ss
  const fmt = (t = 0) => {
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${String(m).padStart(1,"0")}:${String(s).padStart(2,"0")}`;
  };

  return (
    <Container as={motion.div} initial={{ y: 30, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ ease: "easeOut" }}>
      <Info>
        <Cover src={track.cover || "/assets/cover-placeholder.png"} alt="cover" />
        <Text>
          <h4>{track.title || "No track selected"}</h4>
          <p>{track.artist || "—"}</p>
        </Text>
      </Info>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Controls>
          <button onClick={onPrev} aria-label="previous" title="Previous">
            <FaBackward />
          </button>
          <button onClick={toggle} aria-label="play" title="Play/Pause" style={{ fontSize: 18 }}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={onNext} aria-label="next" title="Next">
            <FaForward />
          </button>
        </Controls>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>{fmt(time)}</span>
          <Slider min={0} max={duration || 0} step={0.01} value={time} onChange={(e) => seek(Number(e.target.value))} />
          <span style={{ fontSize: 12 }}>{fmt(duration)}</span>
        </div>
      </div>

      <div style={{ width: 140, textAlign: "right" }}>
        <small style={{ color: "rgba(255,255,255,0.6)" }}>Your Library</small>
      </div>
    </Container>
  );
}
