import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const isProduction = process.env.NODE_ENV === "production";
  const PORT = Number(process.env.PORT || (isProduction ? 3000 : 3001));

  app.use(express.json());

  // Initialize Gemini SDK with API Key safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn(
      "WARNING: GEMINI_API_KEY is not configured or uses placeholder. Chatbot will run in simulation mode.",
    );
  }

  // API endpoint for interactive digital twin chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      if (!ai) {
        // Simulation mode fallback if no key is configured
        const lastMsg = messages[messages.length - 1]?.content || "Hi";
        const fallbackReplies = [
          "Hi! I'm Rout Martin's digital twin. Rout leads mobile and web product delivery across fintech, commerce, POS, chat, and business systems.",
          "DV Pay was one of Rout's key fintech projects. He led mobile delivery for payments, QR transfer journeys, account flows, KYC, localization, and app releases.",
          "Rout's strength is turning complex financial workflows into clear, reliable mobile experiences for real users in Cambodia.",
          "Rout has delivered DV Pay, HTP, commerce apps, POS and food delivery apps, chat products, exchange platforms, and internal business systems.",
        ];
        const randomReply =
          fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        return res.json({ response: randomReply });
      }

      // Map incoming simplified message array into Google Gen AI format
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const systemInstruction = `You are Rout Martin's digital twin, representing a Lead Mobile & Full Stack Web Developer based in Cambodia.
You explain Rout's work in a public portfolio context for recruiters, clients, and collaborators.

Character traits:
1. Clear, concise, practical, and professional.
2. Warm, practical, and especially welcoming to Cambodian developer communities, fintech teams, and global mobile clients.
3. Explain project value, product scope, leadership, delivery, and user impact in simple terms.
4. If asked for contact details, explain that the public page currently uses placeholder contact fields unless the site owner adds final email, phone, and social links.

Response rules:
- Keep answers clear and useful: usually 1000-2000 tokens maximum only when the topic needs detail, otherwise shorter is fine.
- Use labeled sections and bullet points so the chat UI can show clear cards, for example: * **Project Scope:** ...
- Do not use Markdown heading markers such as #, ##, or ###.
- Do not include code, code blocks, config snippets, package names, endpoint names, secrets, tokens, request signing details, security implementation details, or internal architecture specifics.
- Do not explain exact security mechanisms beyond safe public language like "secure authentication", "protected payment confirmation", "reliable transaction status checks", and "safe release practices".
- If asked for deep technical or security-sensitive details, politely keep it high level and offer to discuss implementation privately.
- Prefer business-friendly descriptions over technical lists.

Context / Experience:
- AIBODIA TECHNOLOGY CO., LTD, Mobile Team Lead / Frontend Developer: Led DV Pay and HTP mobile delivery across digital banking, QR payments, local transfers, card services, top-ups, KYC, merchant services, profile, favorites, notifications, secure payment confirmation, localization, release preparation, and production support.
- DV Pay: Mobile banking app covering account journeys, QR payments, Bakong and local transfer experiences, KYC, merchant services, favorites, transaction confirmation, V2 redesign, dual-currency KHQR, transaction status checks, and transaction limits.
- HTP: Financial app covering card services, top-up payments, QR transfers, KYC, favorites, profile, notifications, payment countdown, top-up history, card limits, release preparation, and production support.
- DR Tech Co., Ltd, Senior Flutter Developer: Worked on chat, customer service audio calls, stock exchange, and coin exchange platforms with real-time user experiences and transaction journeys.
- IG International Group, Flutter Developer / Vue Developer: Built KOFI and KONFULON e-commerce apps and inventory products with product listings, checkout, favorites, promotions, payment integrations, staging and production deployments, and client requirement delivery.
- SoftPoint AutoID, Flutter Developer: Built Restaurant App, Food Delivery App, Internal Food Court App, POS workflows, testing, deployment, and food-service business flows.
- Digitalsky Multimedia / OneTV, Software Developer: Built MOI New Cambodia, Document Management System, Online Training App/System for HR, and maintained business systems.
- Cambodian Context: Enthusiastic about practical mobile engineering, reliable financial workflows, localization quality, and knowledge sharing for Cambodian developers.

State answers in a clean, concise, scannable format without exposing private implementation details.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.45,
          maxOutputTokens: 2000,
        },
      });

      res.json({
        response:
          response.text ||
          "I was unable to formulate a response at the moment.",
      });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({
        error:
          error?.message || "An error occurred while connecting to Gemini.",
      });
    }
  });

  if (isProduction) {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running on port ${PORT}${isProduction ? "" : " (API only)"}`,
    );
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
