import { useQuery } from "@tanstack/react-query";
import { type Content } from "@shared/schema";
import ContentCard from "@/components/ContentCard";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import { Instagram, Twitter, Music, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: contents, isLoading } = useQuery<Content[]>({ 
    queryKey: ["/api/contents"]
  });

  return (
    <div className="space-y-12">
      <Hero>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Ben Seyidcem. 
            D ile, Cem de birleşik.
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Computer Scientist • Singer/Songwriter • Content Creator
          </p>
        </motion.div>
      </Hero>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Son İşler</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents?.slice(0, 3).map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://www.instagram.com/seyidcem/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://x.com/seyidcemzk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://open.spotify.com/artist/6D25LovobV4Uhwsdtg7g1i?si=aCMmmhY2RVq9rNzbk0-R4Q" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-500 transition-colors"
          >
            <Music className="h-6 w-6" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a 
            href="https://www.youtube.com/@seyidcem" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}
