import { useQuery } from "@tanstack/react-query";
import { type Content } from "@shared/schema";
import ContentCard from "@/components/ContentCard";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function Home() {
  const { data: contents, isLoading } = useQuery<Content[]>({ 
    queryKey: ["/api/contents"]
  });

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to My Portfolio
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Software Engineer • Musician • Content Creator
        </p>
      </motion.div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Featured Work</h2>
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

      <ContactForm />
    </div>
  );
}
