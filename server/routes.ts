import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContentSchema, insertMessageSchema } from "@shared/schema";

const ADMIN_PASSWORD = "portfolio123"; // Basit bir şifre kontrolü için

export async function registerRoutes(app: Express) {
  // Admin authentication middleware
  const authenticateAdmin = (req: any, res: any, next: any) => {
    const password = req.headers.password;
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  app.get("/api/contents", async (req, res) => {
    const contents = await storage.getContents();
    res.json(contents);
  });

  app.get("/api/contents/:type", async (req, res) => {
    const contents = await storage.getContentsByType(req.params.type);
    res.json(contents);
  });

  // Admin routes with authentication
  app.post("/api/contents", authenticateAdmin, async (req, res) => {
    const result = insertContentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const content = await storage.createContent(result.data);
    res.json(content);
  });

  app.delete("/api/contents/:id", authenticateAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    await storage.deleteContent(id);
    res.json({ message: "Content deleted successfully" });
  });

  app.post("/api/messages", async (req, res) => {
    const result = insertMessageSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const message = await storage.createMessage(result.data);
    res.json(message);
  });

  return createServer(app);
}