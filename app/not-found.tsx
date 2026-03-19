"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import Link from "next/link";

export default function NotFound() {
  return (
    <Empty className="h-screen w-screen flex flex-col justify-center items-center p-6">
      <EmptyHeader>
        <EmptyTitle>404 - cette page n{`'`}existe pas</EmptyTitle>
        <EmptyDescription>
          La page que vous recherchez n{`'`}existe pas. Essayez de chercher ce
          que vous voulez ci-dessous.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Command className="max-w-sm border">
          <CommandInput placeholder="Rechercher une page..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Link className="w-full text-start hit-area-r-10" href="/">
                  Accueil
                </Link>
              </CommandItem>
              <CommandItem>
                <Link
                  className="w-full text-start hit-area-r-10"
                  href="/sign-in"
                >
                  S{`'`}identifier
                </Link>
              </CommandItem>
              <CommandItem>
                <Link
                  className="w-full text-start hit-area-r-10"
                  href="/sign-up"
                >
                  S{`'`}inscrire
                </Link>
              </CommandItem>
              <CommandItem>
                <Link
                  href="/forgot-password"
                  className="w-full text-start hit-area-r-10"
                >
                  Changer de mot de passe
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <EmptyDescription>
          Besoin d{`'`}aide?{" "}
          <Link title="contactez-nous" href="/contact">
            Contactez-nous
          </Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
