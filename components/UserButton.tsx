"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/use-auth";
import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

export function UserButton() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsPending = useAuthStore((state) => state.setIsPending);

  // Credits state management
  const [credits, setCredits] = useState<number | null>(null);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [creditsError, setCreditsError] = useState<string | null>(null);

  // Function to fetch user credits
  const fetchCredits = async () => {
    if (!session?.user) return;

    setCreditsLoading(true);
    setCreditsError(null);

    try {
      const response = await fetch("/api/credits");

      if (!response.ok) {
        throw new Error("Failed to fetch credits");
      }

      const data = await response.json();
      setCredits(data.credits);
    } catch (error) {
      console.error("Error fetching credits:", error);
      setCreditsError("Failed to load credits");
    } finally {
      setCreditsLoading(false);
    }
  };

  useEffect(() => {
    setIsPending(isPending);
    if (session?.user) {
      setUser(session.user as any);
      // Fetch credits when user is authenticated
      fetchCredits();
    } else {
      setUser(null);
      // Reset credits when user is not authenticated
      setCredits(null);
      setCreditsError(null);
    }
  }, [session, isPending, setUser, setIsPending]);

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <div>
      {isPending && <Spinner />}
      {!isPending && !session && (
        <button
          onClick={handleGoogleSignIn}
          className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Sign In
        </button>
      )}
      {!isPending && session && (
        <div className="flex items-center gap-3">
          {/* Credits display */}
          {!creditsLoading && (
            <div className="flex items-center gap-1 text-sm text-gray-600 rounded-md bg-gray-100 p-1">
              <Coins className="w-4 h-4" />
              <span className="font-semibold">
                {credits !== null ? credits : 0}
              </span>
            </div>
          )}

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 hover:cursor-pointer">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "avatar"}
                />
                <AvatarFallback className="bg-blue-500 text-white font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>{session.user?.name}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/my-genassets">User Center</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
