import { ReactNode } from "react";
import Header from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </ScrollArea>
    </div>
  );
}
