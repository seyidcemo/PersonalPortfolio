import { useQuery } from "@tanstack/react-query";
import { type Content } from "@shared/schema";
import ContentCard from "@/components/ContentCard";

export default function Blog() {
  const { data: contents, isLoading } = useQuery<Content[]>({ 
    queryKey: ["/api/contents/blog"]
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-2">
          Thoughts, articles and writing across various platforms
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents?.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
