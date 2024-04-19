"use client";

import { useContext, useEffect, useRef } from "react";
import { PlaybarContext } from "@/components/Providers/PlaybarProvider";

export default function Playbar() {
  const { activeEpisode } = useContext(PlaybarContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!activeEpisode || !audioRef.current) return;
    audioRef.current.play();
  }, [activeEpisode]);

  if (!activeEpisode) return null;

  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        background: "rgba(255 255 255 / 90%)",
        backdropFilter: "blur(4px)",
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(0 0 0 / 10%)",
      }}
    >
      <audio ref={audioRef} controls src={activeEpisode} />
    </div>
  );
}
