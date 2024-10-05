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
          <Link href="/home">
            <button>Home</button>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <SignedOut>
            <SignInButton>
              <Link href="/sign-in">Accedi</Link>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
