import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contentTypes = ["software", "music", "game-review", "blog"] as const;
export type ContentType = typeof contentTypes[number];

export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  link: text("link"),
  category: text("category"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const insertContentSchema = createInsertSchema(contents).omit({ 
  id: true,
  publishedAt: true 
});

export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof contents.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ 
  id: true,
  createdAt: true 
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
