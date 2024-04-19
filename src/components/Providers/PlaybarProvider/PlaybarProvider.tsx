"use client";

import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface PlaybarContext {
  audioContext: AudioContext | null;
  setAudioContext: Dispatch<SetStateAction<AudioContext | null>>;
  setContext: () => void;
  activeEpisode: string | null;
  setActiveEpisode: Dispatch<SetStateAction<string | null>>;
}

export const PlaybarContext = createContext<PlaybarContext>({
  audioContext: null,
  setAudioContext: () => {},
  setContext: () => {},
  activeEpisode: null,
  setActiveEpisode: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export default function PlaybarProvider({ children }: ProviderProps) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null);

  function setContext() {
    if (!audioContext) setAudioContext(new AudioContext());
  }

  return (
    <PlaybarContext.Provider
      value={{
        audioContext,
        setAudioContext,
        setContext,
        activeEpisode,
        setActiveEpisode,
      }}
    >
      {children}
    </PlaybarContext.Provider>
  );
}
