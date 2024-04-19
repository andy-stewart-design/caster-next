"use client";

import { useContext } from "react";
import { PlaybarContext } from "@/components/Providers/PlaybarProvider";

type ComponentProps = {
  src: string;
};

export default function PlayButton({ src }: ComponentProps) {
  const { setActiveEpisode } = useContext(PlaybarContext);

  return <button onClick={() => setActiveEpisode(src)}>Play</button>;
}
