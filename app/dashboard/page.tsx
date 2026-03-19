import { getUser } from "@/lib/auth-server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignOutButton from "./signOutButton";
import AlertVerifyEmail from "@/components/dashboard/alertVerifyEmail";

export default async function DashboardPage() {
  const user = await getUser(); // Get the user from the server-side session
  if (!user) {
    // If no user is found, redirect to the sign-up page
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          You must be signed in to view this page.
        </p>
        <Link href="/sign-in" className="ml-4 text-primary underline">
          Sign In
        </Link>
        <Link href="/sign-up" className="ml-4 text-muted-foreground underline">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vos infos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-1">
            <span className="w-8 h-8 rounded-full text-muted-foreground flex items-center justify-center text-sm">
              Nom
            </span>
            <p>{user.name}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-8 h-8 rounded-full text-muted-foreground flex items-center justify-center text-sm">
              Email
            </span>
            <p>{user.email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SignOutButton />
        </CardFooter>
      </Card>
      {user.emailVerified === false && <AlertVerifyEmail email={user.email} />}
    </main>
  );
}
