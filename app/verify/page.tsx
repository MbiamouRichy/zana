import AlertVerifyEmail from "@/components/dashboard/alertVerifyEmail";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const user = await getUser(); // Get the user from the server-side session

  if (!user) {
    redirect("/sign-in");
  }
  if (user.emailVerified) {
    redirect("/dashboard");
  }
  const searchParams = await props.searchParams;
  const email = searchParams.email;

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col mx-auto p-2 md:p-6 space-y-4 text-white">
      {!email ? (
        <AlertVerifyEmail email={user.email} />
      ) : (
        <>
          <h1>Vérification de l{`'`}e-mail</h1>
          <Card className="w-full max-w-prose">
            <CardHeader>
              <CardTitle>Veuillez vérifier votre adresse e-mail.</CardTitle>

              <CardDescription>
                Un e-mail de vérification a été envoyé à{" "}
                <a
                  className="text-primary hover:underline"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
                . Rendez vous dans votre boîte de réception d{`'`}e-mail et
                cliquer sur le lien de vérification contenu dans cet e-mail.
              </CardDescription>
            </CardHeader>
          </Card>
        </>
      )}
    </main>
  );
}
