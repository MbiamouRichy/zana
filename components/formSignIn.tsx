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
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useHaptics } from "@/lib/webHaptics";
import { Checkbox } from "./ui/checkbox";
import { SignInSocialButton } from "./signInSocialButton";

const formSchema = z.object({
  email: z.string().email("Entrer une addresse email."),
  password: z
    .string()
    .min(8, "La mot de passe doit contenir au moins 8 caractères.")
    .max(10, "La mot de passe doit contenir au maximum 10 caractères."),
});

export function SignInForm() {
  const router = useRouter();
  const { playHaptic } = useHaptics();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    await signIn.email(
      {
        email: data.email as string,
        password: data.password as string,
        rememberMe: checked,
      },
      {
        onSuccess: () => {
          playHaptic("success");

          toast.success("Connexion réussie.", {
            position: "top-center",
          });
          router.push("/dashboard");
        },
        onError: (error) => {
          let errorMessage = "";
          if (error.error.message === "User not found") {
            errorMessage =
              "Utilisateur non trouvé. Veuillez vérifier votre adresse e-mail.";
          } else if (error.error.message === "Invalid email or password") {
            errorMessage =
              "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.";
          } else {
            errorMessage = "Quelque chose s'est mal passé. Veuillez réessayer.";
          }

          playHaptic("error");
          toast.error("Une erreur s'est produite.", {
            description: (
              <p className="text-muted-foreground text-sm">{errorMessage}</p>
            ),
            position: "top-center",
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
    <div className=" w-full n h-auto sm:max-w-md">
      <div className="w-full mt-2 flex flex-col lg:space-y-4">
        <div className="w-full p-2 md:px-4">
          <h1>Se connecter</h1>
          <p className="text-muted-foreground text-sm">
            Entrer vos informations pour vous connecter.
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
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex flex-row w-full items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                      <Link
                        href="/forget-password"
                        className="text-sm text-muted-foreground underline focus-visible:underline"
                      >
                        Mot de passe oublié?
                      </Link>
                    </div>
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

              <Field orientation="horizontal">
                <Checkbox
                  id="terms-checkbox-desc"
                  name="terms-checkbox-desc"
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value === true)}
                />
                <FieldLabel htmlFor="terms-checkbox-desc">
                  Se souvenir de moi
                </FieldLabel>
              </Field>

              <FieldGroup>
                <Field>
                  <Button disabled={loading} type="submit" id="form-rhf-demo">
                    {loading ? <Loader className="animate-spin" /> : null}
                    Se connecter
                  </Button>

                  {/* Se connecter avec Google */}

                  <SignInSocialButton />
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
