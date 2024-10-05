"use client";

import Link from "next/link";
import { FaLightbulb, FaBug } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FeedbackButton() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isSignedIn) {
      event.preventDefault();
      router.push("/sign-up"); // Reindirizza alla pagina di registrazione
    }
  };

  return (
    <Link href="/feedbacks" onClick={handleLinkClick}>
      <button className="fixed bottom-0 right-0 z-50 flex items-center gap-2 rounded-tl-lg border-l border-t border-gray-300 bg-white px-4 py-2 text-black shadow-md transition-all hover:bg-gray-100 hover:shadow-lg active:bg-gray-200">
        <FaLightbulb className="text-yellow-300" />
        <span className="font-bold">Idee</span>
        <FaBug className="ml-2 text-green-500" />
        <span className="font-bold">Bugs</span>
      </button>
    </Link>
  );
}
