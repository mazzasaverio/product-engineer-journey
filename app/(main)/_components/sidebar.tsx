"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openChapters, setOpenChapters] = useState<number[]>([]);

  // This is a placeholder for the chapters and subchapters
  // In a real application, you would fetch this data from Notion
  const chapters = [
    {
      title: 'Chapter 1',
      subchapters: ['1.1 Introduction', '1.2 Getting Started'],
    },
    {
      title: 'Chapter 2',
      subchapters: ['2.1 Advanced Concepts', '2.2 Best Practices'],
    },
    // Add more chapters for testing scrolling
    {
      title: 'Chapter 3',
      subchapters: ['3.1 Further Topics', '3.2 Case Studies'],
    },
    {
      title: 'Chapter 4',
      subchapters: ['4.1 Advanced Techniques', '4.2 Troubleshooting'],
    },
  ];

  const toggleChapter = (index: number) => {
    setOpenChapters((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <aside className={`bg-gray-100 transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-16'} md:relative fixed h-full z-10`}>
      <Button
        variant="ghost"
        className="absolute right-2 top-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronRight className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center mb-6">
          <Book className="mr-2" />
          <h2 className="text-xl font-bold">Book Contents</h2>
        </div>
      </div>
      <ScrollArea className={`flex-grow ${isOpen ? 'block' : 'hidden'}`}>
        <nav className="p-4">
          {chapters.map((chapter, index) => (
            <div key={index} className="mb-4">
              <Button
                variant="ghost"
                className="w-full justify-start font-semibold mb-2 hover:bg-gray-200 transition-colors"
                onClick={() => toggleChapter(index)}
              >
                {openChapters.includes(index) ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
                {chapter.title}
              </Button>
              {openChapters.includes(index) && (
                <ul className="pl-4 space-y-2">
                  {chapter.subchapters.map((subchapter, subIndex) => (
                    <li key={subIndex}>
                      <Link 
                        href={`#${subchapter.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="text-blue-600 hover:underline hover:text-blue-800 transition-colors block py-1"
                      >
                        {subchapter}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;