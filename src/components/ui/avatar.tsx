import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
};

export function Avatar({ name, src, className, ...props }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-teal-50 text-sm font-bold text-teal-700 ring-1 ring-teal-100",
        className,
      )}
      {...props}
    >
      {src ? <Image src={src} alt={name} width={40} height={40} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}
