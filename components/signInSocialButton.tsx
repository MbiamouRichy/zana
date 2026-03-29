import { signIn } from "@/lib/auth-client";
import { useHaptics } from "@/lib/webHaptics";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
type providerType = Parameters<typeof signIn.social>[0]["provider"];

export function SignInSocialButton() {
  const router = useRouter();
  const { playHaptic } = useHaptics();
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
    <>
      <div className="w-full flex flex-row gap-2 justify-center items-center">
        <span className="h-px w-full bg-muted" />
        <span className="text-sm text-muted-foreground">Ou</span>
        <span className="h-px w-full bg-muted" />
      </div>
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
        Continuer avec Google
      </Button>
      <Button
        onClick={() => SignInSocial("facebook")}
        variant="outline"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 64 64"
        >
          <path
            fill="currentColor"
            d="M59.5 1h-55C2.5 1 1 2.6 1 4.5v55c0 2 1.6 3.5 3.5 3.5h29.6V38.9h-8v-9.3h8v-6.9c0-8 4.8-12.4 12-12.4c2.4 0 4.8.1 7.2.4V19h-4.8c-3.8 0-4.6 1.8-4.6 4.5v5.9H53l-1.3 9.4h-8v23.8h15.8c2 0 3.5-1.5 3.5-3.5V4.5c-.1-2-1.7-3.5-3.5-3.5"
          ></path>
        </svg>
        Continuer avec Facebook
      </Button>
    </>
  );
}
