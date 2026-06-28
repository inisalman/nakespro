"use client";

import { useEffect, useState, useMemo } from "react";

type TypingWordsProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
};

/**
 * Animated, typewriter-style word cycler.
 * Reserves space for the longest word so the layout never jumps.
 */
export function TypingWords({
  words,
  typingSpeed = 110,
  deletingSpeed = 55,
  pauseTime = 1400,
}: TypingWordsProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [words]
  );

  useEffect(() => {
    const current = words[wordIndex % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span
      className="relative inline-block text-teal"
      aria-label={words.join(", ")}
    >
      {/* Invisible clone of the longest word — reserves layout space */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {longestWord}
      </span>

      {/* The actual typed text overlays the spacer */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 whitespace-nowrap"
      >
        {text}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse rounded-full bg-teal align-middle"
        />
      </span>
    </span>
  );
}
