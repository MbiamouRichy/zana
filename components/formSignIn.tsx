"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
<<<<<<< HEAD

=======
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
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
<<<<<<< HEAD
import { SignInSocialButton } from "./signInSocialButton";
=======
type providerType = Parameters<typeof signIn.social>[0]["provider"];
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1

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
<<<<<<< HEAD

  return (
    <div className=" w-full sm:max-w-md">
      <div className="w-full mt-2 flex flex-col lg:space-y-4">
        <div className="w-full p-2 md:px-4">
          <h1>Se connecter</h1>
          <p className="text-muted-foreground text-sm">
            Entrer vos informations pour vous connecter.
          </p>
        </div>
        <div className="w-full p-2 md:px-4">
=======
  async function SignInSocial(provider: providerType) {
    await signIn.social(
      {
        provider: provider,
        callbackURL: "/dashboard",
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
          playHaptic("error");
          toast.error("Une erreur s'est produite.", {
            description:
              error.error.message ||
              "Quelque chose s'est mal passé. Veuillez réessayer.",
            position: "top-center",
            className: "text-muted-foreground text-sm bg-card",
            action: {
              label: "Réessayer",
              onClick: () => {
                SignInSocial("google");
              },
            },
          });
        },
      },
    );
  }
  return (
    <div className=" w-full sm:max-w-md">
      <h1>S{`'`}identifier</h1>
      <Card className="w-full mt-2">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Entrer vos informations pour vous connecter.
          </CardDescription>
        </CardHeader>
        <CardContent>
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
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
<<<<<<< HEAD

                  {/* Se connecter avec Google */}

                  <SignInSocialButton />
=======
                  <Button
                    onClick={() => SignInSocial("google")}
                    variant="outline"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 56 56"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M28.458 5c6.167 0 11.346 2.2 15.368 5.804l.323.295l-6.62 6.464c-1.695-1.59-4.666-3.493-9.07-3.493c-6.204 0-11.47 4.093-13.372 9.749c-.47 1.46-.756 3.023-.756 4.64c0 1.615.287 3.18.782 4.639c1.877 5.656 7.142 9.748 13.345 9.748c3.347 0 5.928-.886 7.881-2.176l.251-.17l.307-.222c2.813-2.108 4.144-5.084 4.46-7.169l.03-.22h-12.93v-8.705h22.025c.339 1.46.495 2.867.495 4.795c0 7.142-2.554 13.163-6.985 17.255c-3.884 3.597-9.201 5.682-15.535 5.682c-9.031 0-16.85-5.102-20.772-12.57l-.184-.358l-.222-.457A23.45 23.45 0 0 1 5 28.458c0-3.6.827-7.01 2.28-10.073l.222-.457l.184-.357C11.608 10.1 19.426 5 28.458 5"
                      ></path>
                    </svg>
                    Se connecter avec Google
                  </Button>
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
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
<<<<<<< HEAD
        </div>
      </div>
=======
        </CardContent>
      </Card>
>>>>>>> 4f9a9f2cb12aeb63a2d58e8a536d38f1a659d2e1
    </div>
  );
}
