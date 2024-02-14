"use client";

import { ComponentProps, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/setCookie";

type PropTypes = {
  href: string;
  src: string;
} & ComponentProps<"a">;

export default function Button({
  href,
  src,
  children,
  ...delegated
}: PropTypes) {
  const router = useRouter();

  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    await setCookie("url", `https://dummyjson.com/products/${src}`);
    router.push(href);
  }

  return (
    <a {...delegated} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
