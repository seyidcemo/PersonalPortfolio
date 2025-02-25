import { Content, InsertContent, Message, InsertMessage, contents, messages } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getContents(): Promise<Content[]>;
  getContentsByType(type: string): Promise<Content[]>;
  getContent(id: number): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  deleteContent(id: number): Promise<void>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getContents(): Promise<Content[]> {
    return await db.select().from(contents).orderBy(contents.publishedAt);
  }

  async getContentsByType(type: string): Promise<Content[]> {
    return await db
      .select()
      .from(contents)
      .where(eq(contents.type, type))
      .orderBy(contents.publishedAt);
  }

  async getContent(id: number): Promise<Content | undefined> {
    const [content] = await db
      .select()
      .from(contents)
      .where(eq(contents.id, id));
    return content;
  }

  async createContent(content: InsertContent): Promise<Content> {
    const [newContent] = await db
      .insert(contents)
      .values({
        ...content,
        publishedAt: new Date(),
        link: content.link || null,
        category: content.category || null,
      })
      .returning();
    return newContent;
  }

  async deleteContent(id: number): Promise<void> {
    await db.delete(contents).where(eq(contents.id, id));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values({
        ...message,
        createdAt: new Date(),
      })
      .returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();