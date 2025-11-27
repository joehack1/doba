import { useEffect, useRef, useState } from "react";

export default function useAudio(src) {
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src || "";
    audio.preload = "metadata";
    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setReady(true);
    };
    const onTime = () => setTime(audio.currentTime);
    const onEnd = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    playing ? audio.play().catch(() => setPlaying(false)) : audio.pause();
  }, [playing]);

  const toggle = () => setPlaying((p) => !p);
  const seek = (t) => {
    audioRef.current.currentTime = t;
    setTime(t);
  };
  const setVolume = (v) => { audioRef.current.volume = v; };

  return { audioRef, playing, setPlaying, toggle, time, duration, seek, ready, setVolume };
}
