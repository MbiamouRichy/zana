"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className={buttonVariants({ variant: "outline" })}
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "default" })}
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
