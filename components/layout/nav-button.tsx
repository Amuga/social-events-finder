// components/nav-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavButton({
  href,
  children,
  className = "",
}: NavButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (isPending) return;

    startTransition(() => {
      router.push(href);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-busy={isPending}
      className={className}
    >
      {isPending ? "Loading..." : children}
    </button>
  );
}
