"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useHaptics } from "@/lib/webHaptics";

const formSchema = z.object({
  email: z.string().email("Entrer une addresse email."),
});

export default function ForgetPasswordForm() {
  const router = useRouter();
  const { playHaptic } = useHaptics();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    await authClient.requestPasswordReset(
      {
        email: data.email as string,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          playHaptic("success");
          toast.success("Email de réinitialisation envoyé.", {
            description: (
              <p className="text-muted-foreground text-sm">
                Vérifiez votre boîte de réception e-mail pour les instructions
                de réinitialisation.
              </p>
            ),
            position: "top-center",
          });
          router.push(`/verify?email=${data.email}`);
        },
        onError: (error) => {
          playHaptic("error");
          toast.error("Une erreur s'est produite.", {
            description: (
              <p className="text-muted-foreground text-sm">
                {error.error.message === "User not found"
                  ? "Aucun compte trouvé avec cette adresse e-mail."
                  : "Une erreur inconnue s'est produite."}
              </p>
            ),

            position: "top-center",
            className: "text-muted-foreground text-sm bg-card",
            action: {
              label: "Réessayer",
              onClick: () => {
                onSubmit(data);
              },
            },
          });
        },
      },
    );
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="w-full mt-2 flex flex-col lg:space-y-4">
        <div className="flex flex-col">
          <h1>Mot de passe oublié ?</h1>
          <p className="text-muted-foreground text-sm">
            Entrer votre adresse e-mail pour recevoir les instructions de
            réinitialisation.
          </p>
        </div>
        <div className="w-full p-2 md:px-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Entrer votre adresse e-mail"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <FieldGroup>
                <Field>
                  <Button disabled={loading} type="submit" id="form-rhf-demo">
                    {loading ? <Loader className="animate-spin" /> : null}
                    Changer de mot de passe
                  </Button>

                  <FieldDescription className="px-6 text-center">
                    Je n{`'`}ai pas de compte?{" "}
                    <Link title="s'identifier" href="sign-up">
                      S{`'`}incrire
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
