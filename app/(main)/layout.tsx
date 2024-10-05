import Link from "next/link";
import { FaLightbulb, FaBug } from "react-icons/fa";
import FeedbackButton from "./_components/FeedbackButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <FeedbackButton />
    </div>
  );
}
