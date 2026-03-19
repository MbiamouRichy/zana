"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useState } from "react";
export default function AlertVerifyEmail({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const resendVerificationEmail = async () => {
    setLoading(true);
    await authClient.sendVerificationEmail(
      {
        email: email,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          toast.success("Email de vérification renvoyé.", {
            description: (
              <p className="text-muted-foreground text-sm">
                Un nouvel e-mail de vérification a été envoyé.
              </p>
            ),
            position: "top-center",
          });
        },
        onError: () => {
          toast.error("L'envoi de l'e-mail de vérification a échoué.", {
            description: (
              <p className="text-muted-foreground text-sm">
                Une erreur s{`'`}est produite lors de l{`'`}envoi de l{`'`}
                e-mail de vérification. Veuillez réessayer.
              </p>
            ),
            position: "top-center",
            action: {
              label: "Réessayer",
              onClick: () => resendVerificationEmail(),
            },
          });
        },
      },
    );
    setLoading(false);
  };
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Veuillez vérifier votre adresse e-mail.
          </AlertDialogTitle>
          {email ? (
            <AlertDialogDescription>
              Un e-mail de vérification a été envoyé à{" "}
              <a
                className="text-primary hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              . Rendez vous dans votre boîte de réception d{`'`}e-mail et
              cliquer sur le lien de vérification contenu dans cet e-mail.
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            disabled={loading}
            onClick={() => resendVerificationEmail()}
          >
            {loading ? <Loader className="animate-spin" /> : null}
            Renvoyer le lien
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
