"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-6 md:px-7
    py-2 md:py-2.5 
    font-medium 
    transition-all duration-300 
    text-[11px] md:text-[12px]
   whitespace-normal break-words text-center leading-snug
    uppercase
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-[#C1BEB9] to-white 
      hover:from-[#b4b1ac] hover:to-[#f2f2f2] 
      text-black 
      shadow-md hover:shadow-lg
      rounded-none
    `,
    secondary: `
      bg-white text-black border border-gray-300
    `,
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}