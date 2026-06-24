"use client";

import { useEffect, useState } from "react";

type TypingWordsProps = {
  words: string[];
  /** ms per character while typing */
  typingSpeed?: number;
  /** ms per character while deleting */
  deletingSpeed?: number;
  /** ms to hold a fully-typed word before deleting */
  pauseTime?: number;
};

/**
 * Animated, typewriter-style word cycler.
 * Types a word, pauses, deletes it, then moves on to the next word — looping forever.
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
    <span className="inline text-teal" aria-label={words.join(", ")}>
      {text}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse rounded-full bg-teal align-middle"
      />
    </span>
  );
}
