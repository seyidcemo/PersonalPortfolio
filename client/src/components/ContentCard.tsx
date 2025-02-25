import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Content } from "@shared/schema";
import { Link } from "lucide-react";

export default function ContentCard({ content }: { content: Content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="aspect-video relative">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </CardContent>
        {content.link && (
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href={content.link} target="_blank" rel="noopener noreferrer">
                <Link className="w-4 h-4 mr-2" />
                View Project
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
