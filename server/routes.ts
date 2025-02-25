import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContentSchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/contents", async (req, res) => {
    const contents = await storage.getContents();
    res.json(contents);
  });

  app.get("/api/contents/:type", async (req, res) => {
    const contents = await storage.getContentsByType(req.params.type);
    res.json(contents);
  });

  app.post("/api/contents", async (req, res) => {
    const result = insertContentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const content = await storage.createContent(result.data);
    res.json(content);
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
