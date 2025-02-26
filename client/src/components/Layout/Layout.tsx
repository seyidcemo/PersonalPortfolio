import { ReactNode } from "react";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: ReactNode }) {
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
