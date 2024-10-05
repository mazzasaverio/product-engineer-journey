import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
//
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";

import PostEditorButton from "@/components/PostEditorButton";
import UserButtonProfile from "@/components/UserButton";

import { auth } from "@clerk/nextjs/server";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { userId } = auth();

  if (!userId) return null;

  // const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
  //   prisma.notification.count({
  //     where: {
  //       recipientId: userId,
  //       read: false,
  //     },
  //   }),
  //   (await streamServerClient.getUnreadCount(userId)).total_unread_count,
  // ]);

  return (
    <div className={className}>
      {/* <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} /> */}
      {/* <PostEditorButton /> */}
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
      <UserButtonProfile />
    </div>
  );
}
