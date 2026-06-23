"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
};

export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!isDeleting && text === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const delta = isDeleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );
    }, delta);

    return () => clearTimeout(t);
  }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[3px] -translate-y-0.5 self-center bg-teal align-middle"
        style={{
          height: "0.9em",
          animation: "typewriter-blink 1s steps(2) infinite",
        }}
      />
    </span>
  );
}
