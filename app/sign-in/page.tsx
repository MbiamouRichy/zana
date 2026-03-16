"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type providerType = Parameters<typeof signIn.social>[0]["provider"]

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },{
onSuccess: () => {
            router.push("/dashboard");
        },
onError: (error) => {
                setError(error.error.message || "Something went wrong.");
            }
}
    
  )}
  async function SignInSocial(provider: providerType) {
    setError(null);


    await signIn.social({
      provider: provider,
      callbackURL: "/dashboard",
    },{
onSuccess: () => {
            router.push("/dashboard");
        },
onError: (error) => {
                setError(error.error.message || "Something went wrong.");
            }
}
    
  )}

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />{" "}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />{" "}
        <Button
          type="submit" 
          className="w-full font-medium rounded-md px-4 py-2"
        >
          Sign In
        </Button>{" "}
      </form>{" "}
      <Button onClick={()=> SignInSocial("google")}
          variant="outline" className="w-full"
        >
          Sign In with Google
        </Button>
    </main>
  );
}
