"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function DemoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrent(video.currentTime);
    const onLoaded = () => setDuration(video.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, []);

  const unmute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    if (v.paused) v.play();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 1;
  }, []);

  const onScrub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const t = Number(e.target.value);
    v.currentTime = t;
    setCurrent(t);
  }, []);

  const progressPct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="relative overflow-hidden rounded-b-xl border border-gray-200 bg-[#fafafa] aspect-video group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        aria-label="Démonstration de Rivjob"
      />

      {/* Overlay "Rétablir le son" (style Gojiberry) */}
      {isMuted && (
        <button
          type="button"
          onClick={unmute}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 hover:bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg backdrop-blur-sm transition-colors flex items-center gap-2 z-10"
          aria-label="Rétablir le son"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          Rétablir le son
        </button>
      )}

      {/* Barre de contrôles (apparition au hover) */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 pt-6 pb-3 transition-opacity duration-200 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 text-white">
          <button
            type="button"
            onClick={togglePlay}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span className="text-xs font-medium tabular-nums text-white/90 min-w-[70px]">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.05}
            value={current}
            onChange={onScrub}
            aria-label="Position dans la vidéo"
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer accent-indigo-400 outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            style={{
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${progressPct}%, rgba(255,255,255,0.25) ${progressPct}%, rgba(255,255,255,0.25) 100%)`,
            }}
          />

          <button
            type="button"
            onClick={toggleMute}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label={isMuted ? "Rétablir le son" : "Couper le son"}
          >
            {isMuted ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
