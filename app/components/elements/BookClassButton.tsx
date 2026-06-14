"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookClassButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BookClassButton({ className = "", children = "Book a Class" }: BookClassButtonProps) {
  const router = useRouter();
  const [href, setHref] = useState("/login");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setHref(token ? "/dashboard/book-class" : "/login");
  }, []);

  return (
    <button
      onClick={() => router.push(href)}
      className={className}
    >
      {children}
    </button>
  );
}
