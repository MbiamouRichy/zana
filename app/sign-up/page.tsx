import { SignUpForm } from "@/components/formSignup";
import LayoutSign from "@/components/layoutSign";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zana - S'incrire",
  description:
    " Créez votre compte et découvrez notre collection exclusive de vêtements tendance.",
};

export const dynamic = "force-static";
export default function SignUpPage() {
  return (
    <LayoutSign imageSrc="/4.jpg">
      <SignUpForm />
    </LayoutSign>
  );
}
