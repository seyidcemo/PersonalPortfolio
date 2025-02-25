import { Content, InsertContent, Message, InsertMessage } from "@shared/schema";

export interface IStorage {
  getContents(): Promise<Content[]>;
  getContentsByType(type: string): Promise<Content[]>;
  getContent(id: number): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private contents: Map<number, Content>;
  private messages: Map<number, Message>;
  private contentId: number;
  private messageId: number;

  constructor() {
    this.contents = new Map();
    this.messages = new Map();
    this.contentId = 1;
    this.messageId = 1;

    // Add some sample content
    this.createContent({
      type: "software",
      title: "Portfolio Website",
      description: "A modern portfolio built with React and Express",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: "Web Development",
      link: "https://github.com/sample/portfolio"
    });

    this.createContent({
      type: "music",
      title: "Summer Nights",
      description: "An acoustic indie song about warm summer evenings",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      category: "Original",
      link: "https://soundcloud.com/sample/summer-nights"
    });
  }

  async getContents(): Promise<Content[]> {
    return Array.from(this.contents.values());
  }

  async getContentsByType(type: string): Promise<Content[]> {
    return Array.from(this.contents.values()).filter(
      content => content.type === type
    );
  }

  async getContent(id: number): Promise<Content | undefined> {
    return this.contents.get(id);
  }

  async createContent(content: InsertContent): Promise<Content> {
    const id = this.contentId++;
    const newContent = {
      ...content,
      id,
      publishedAt: new Date()
    };
    this.contents.set(id, newContent);
    return newContent;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const newMessage = {
      ...message,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
