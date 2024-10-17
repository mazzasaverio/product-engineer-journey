
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from './_components/sidebar';
import FeedbackButton from './_components/FeedbackButton';
import Navbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Book',
  description: 'A book with chapters and subchapters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            {/* <Sidebar /> */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
           
          </div>
          <FeedbackButton />
        </div>
      
  );
}