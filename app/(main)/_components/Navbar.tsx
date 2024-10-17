"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="text-xl font-bold hover:text-gray-600 transition-colors">
          My Book
        </Link>
        
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 md:top-auto bg-card md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
          <nav className="mb-4 md:mb-0 space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/" className="block md:inline-block py-2 md:py-0 hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="block md:inline-block py-2 md:py-0 hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block md:inline-block py-2 md:py-0 hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <SignedOut>
              <SignInButton>
                <button className="rounded-md border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
      </div>
    </header>
  );
};

export default Navbar;