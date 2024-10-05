"use client";
import SearchField from "@/components/SearchField";
import UserButtonProfile from "@/components/UserButton";
import FilterButton from "@/components/FilterButton";
import SortButton from "@/components/SortButton";
import Link from "next/link";
import PostEditorButton from "@/components/PostEditorButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-5">
          {/* <FilterButton /> */}
          <SortButton />
        </div>

        <div className="flex items-center gap-5">
          <SignedOut>
            <SignInButton>
              <button className="rounded-md border border-white bg-black px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Accedi
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: { width: "35px", height: "35px" } },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
