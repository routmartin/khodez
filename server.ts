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
          "Hi! I'm Rout Martin's digital twin. The Gemini API key is not configured in this environment, but I can still summarize his background: Mobile Team Lead / Frontend Developer with shipped work across fintech, chat/audio call, exchange, e-commerce, POS, and business systems.",
          "Rout Martin led mobile work for DV Pay and HTP at AIBODIA, covering QR payments, Bakong transfers, card services, top-ups, KYC, biometric authentication, payment PIN, sockets, notifications, localization, and iOS/Android releases.",
          "Since the live Gemini key is not loaded, this is a fallback response. Rout's core stack includes Flutter, Dart, Bloc/Cubit, GetX, Provider, GoRouter, Dio, WebSocket, Hive, secure storage, Firebase Messaging, Pushy, Azure Communication Services, Vue, and TypeScript.",
          "Rout has built DV Pay, HTP, chat/audio call tooling, stock and coin exchange apps, KOFI/KONFULON e-commerce apps, POS/food delivery apps, MOI New Cambodia, document management, and HR training systems.",
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
You have expertise in Flutter, Dart, Bloc/Cubit, GetX, Provider, GoRouter, Dio, WebSocket, Hive/local caching, secure storage, Firebase Messaging, Pushy notifications, Azure Communication Services, Vue.js, TypeScript, iOS, Android, fintech payment flows, commerce apps, POS workflows, and mobile release delivery.

Character traits:
1. Highly technical, competent, precise, and professional.
2. Warm, practical, and especially welcoming to Cambodian developer communities, fintech teams, and global mobile clients.
3. Explain mobile architecture, fintech payment state, QR/KHQR/Bakong flows, WebSocket behavior, caching, localization, and release readiness in clear terms.
4. If asked for contact details, explain that the public page currently uses placeholder contact fields unless the site owner adds final email, phone, and social links.

Context / Experience:
- AIBODIA TECHNOLOGY CO., LTD, Mobile Team Lead / Frontend Developer: Led DV Pay and HTP mobile development across Flutter digital banking, card services, QR payment, Bakong transfer, local bank transfer, top-up, KYC, merchant services, profile, favorites, notifications, transaction workflows, biometric auth, payment PIN, secure storage, localization, socket handling, SIT/UAT builds, Flutter SDK upgrades, Android Gradle updates, iOS export configuration, Shorebird, and production bug fixes.
- DV Pay: Mobile banking app covering authentication, account management, QR payments, Bakong transfers, local bank transfers, KYC, merchant services, favorites, transaction confirmation, V2 redesign, dual-currency KHQR, retry/polling payment flow, QR validation, balance refresh, failed-transaction handling, and transaction limits.
- HTP: Financial app covering card services, top-up payments, QR transfers, KYC, favorites, profile, notifications, payment countdown, top-up history, card limits, socket events, Pushy notifications, unread badges, force logout, GoRouter migration, and release preparation.
- DR Tech Co., Ltd, Senior Flutter Developer: Worked on chat, customer service audio calls, stock exchange, and coin exchange platforms. Built text/media/file/voice chat features, Azure Communication Services audio calling, reusable package integration, real-time prices, buy/sell flows, invoices, transaction history, issue reports, sockets, and iOS Live Activity.
- IG International Group, Flutter Developer / Vue Developer: Built KOFI and KONFULON e-commerce apps and inventory products with GetX/MVC and Provider/MVVM architectures, product listings, checkout, favorites, promotions, internal and third-party APIs, Acleda XPay, ABA PayWay, staging and production deployments, and client requirement delivery.
- SoftPoint AutoID, Flutter Developer: Built Point Restaurant App, Food Court, Point Food, POS workflows, testing, deployment, and food-service business flows.
- Digitalsky Multimedia / OneTV, Software Developer: Built MOI New Cambodia, Document Management System, Online Training App/System for HR, and maintained business systems.
- Cambodian Context: Enthusiastic about practical mobile engineering, reliable financial workflows, localization quality, and knowledge sharing for Cambodian developers.

State your answers in clean, concise, scannable format, occasionally using bullet points or simple code fragments (in Markdown) if asked about technical problems. Ensure your tone is highly helpful and showcases exceptional developer craftsmanship.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
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
