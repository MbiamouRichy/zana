import LayoutSign from "@/components/layoutSign";
import { SignInForm } from "@/components/formSignIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zana - S'identifier",
  description:
    "Inscrivez vous pour accéder à votre compte et découvrir nos collections exclusives.",
};
export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <LayoutSign imageSrc="/4.png">
      <SignInForm />
    </LayoutSign>
  );
}
