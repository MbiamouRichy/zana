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
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useHaptics } from "@/lib/webHaptics";
import { SignInSocialButton } from "./signInSocialButton";

const formSchema = z
  .object({
    nom: z
      .string()
      .min(5, "Votre nom doit contenir au moins 02 caractères.")
      .max(32, "Votre nom doit contenir au maximum 50 caractères."),
    email: z.string().email("Entrer une addresse email."),
    password: z
      .string()
      .min(8, "La mot de passe doit contenir au moins 8 caractères.")
      .max(10, "La mot de passe doit contenir au maximum 10 caractères."),
    confirmPassword: z
      .string()
      .min(8, "La mot de passe doit contenir au moins 8 caractères.")
      .max(10, "La mot de passe doit contenir au maximum 10 caractères."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const router = useRouter();
  const { playHaptic } = useHaptics();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    await signUp.email(
      {
        name: data.nom as string,
        email: data.email as string,
        password: data.password as string,
      },
      {
        onSuccess: () => {
          playHaptic("success");

          toast.success("Compte créé avec succès.", {
            position: "top-center",
          });
          router.push("/dashboard");
        },
        onError: (error) => {
          playHaptic("error");
          toast.error("Une erreur s'est produite.", {
            description:
              error.error.message === "User already exists. Use another email."
                ? "Cet email est déjà utilisé. Veuillez en utiliser un autre."
                : "Quelque chose s'est mal passé. Veuillez réessayer.",
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
    <div className=" w-full  h-auto sm:max-w-md">
      <div className="w-full mt-2 flex flex-col lg:space-y-4">
        <div className="w-full p-2 md:px-4">
          <h1>Creer un compte</h1>
          <p className="text-muted-foreground text-sm">
            Entrer vos informations pour créer un compte.
          </p>
        </div>
        <div className="w-full p-2 md:px-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="nom"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Entrer votre nom complet."
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Le mot de passe doit contenir au moins 8 caractères."
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-0 rounded-md p-0 data-[state=open]:bg-transparent"
                        type="button"
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirmer le mot de passe
                    </FieldLabel>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Retaper le mot de passe pour confirmation."
                        autoComplete="off"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-2 top-0 rounded-md p-0 data-[state=open]:bg-transparent"
                        type="button"
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
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
                    Creer un compte
                  </Button>
                  {/* Se connecter avec les reseaux sociaux */}
                  <SignInSocialButton />
                  <FieldDescription className="px-6 text-center">
                    Avez-vous déjà un compte?{" "}
                    <Link title="s'identifier" href="/sign-in">
                      S{`'`}identifier
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
