
import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Zana - Accueil",
  description:
    "Bienvenue sur Zana, votre destination de mode chic pour les jeunes. Découvrez nos collections uniques et tendance à des prix abordables.",
};
export const dynamic = "force-static";
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
