'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';

type TableOfContentsItem = {
  id: string;
  label: string;
};

type LegalLayoutProps = {
  title: string;
  tableOfContents: TableOfContentsItem[];
  children: ReactNode;
};

export default function LegalLayout({ title, tableOfContents, children }: LegalLayoutProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      // Find the last item that is visible on the screen
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top < 150) {
          currentId = item.id;
          break;
        }
      }
      setActiveId(currentId || (tableOfContents[0]?.id ?? ''));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);
  

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          {title}
        </h1>
      </div>
      <div className="grid md:grid-cols-4 gap-12">
        <aside className="md:col-span-1 hidden md:block">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-4 font-headline">Table of Contents</h3>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`${pathname}#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // Manually update URL hash
                      window.history.pushState(null, '', `#${item.id}`);
                    }}
                    className={cn(
                      'text-sm text-muted-foreground hover:text-primary transition-colors',
                      activeId === item.id && 'text-primary font-semibold'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="md:col-span-3 prose dark:prose-invert prose-lg max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}
