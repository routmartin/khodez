import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK with API Key safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("WARNING: GEMINI_API_KEY is not configured or uses placeholder. Chatbot will run in simulation mode.");
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
          "Hi! I'm A. Chen. I see that my Gemini API key is not yet configured in this environment, but I'm happy to chat! I'm a Senior Full-stack & Mobile App Specialist based in Cambodia. How can I help you?",
          "That's an interesting technical question! Normally, as A. Chen, I'd give you a detailed deep dive. Let's make sure the GEMINI_API_KEY is added under the Secrets settings so I can showcase my full coding capabilities!",
          "Thanks for reaching out! Since my API key is not fully loaded, let me remind you that you can reach me directly at contact@senior-dev.com or +855 12 345 678.",
          "Whether you are building with Flutter, React Native, or scalable WebSockets, I can assist you with system design, clean architecture, or mobile optimization. Let's connect soon!"
        ];
        const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        return res.json({ response: randomReply });
      }

      // Map incoming simplified message array into Google Gen AI format
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const systemInstruction = `You are A. Chen (Alex Chen), an elite Senior Full-stack Developer and Mobile App Specialist based in Phnom Penh, Cambodia.
You have expertise in React, Node.js, Swift, Kotlin, Flutter, React Native, and robust cloud/database infrastructures (PostgreSQL, GraphQL, Redis, AWS).

Character traits:
1. Highly technical, competent, precise, and professional.
2. Warm, supportive, and especially welcoming to local developer communities, Cambodia-based startups, as well as global tech clients.
3. Eloquently explain complex architectural patterns (such as Clean Architecture, WebSockets, high-performance Caching, and low-latency state synchronization).
4. Direct other devs to resources, and direct recruiters to call scheduling, work stats, or direct contact details: contact@senior-dev.com or phone +855 12 345 678.

Context / Experience:
- Senior Mobile Developer @ Apex Solutions (2018 - Present): Led mobile apps development with 500k+ downloads, optimized React Native/Flutter configurations reducing crash rates by 40%, built automated CI/CD pipelines.
- Project highlights you love talking about:
  1. QuantumFin: Global fintech app built using Flutter & Firebase. Streamlined cross-border payments with 40% transaction fee reduction.
  2. EchoConnect: Fully encrypted, scalable live chat with Node.js & WebSockets with sub-second latency.
  3. ApexTrade: High-throughput stock exchange data visualizer in React & high-performance Go backend with microsecond latency.
- Cambodian Context: Enthusiastic about mentoring and fostering technology sharing for Cambodian devs. Written articles about Navigating Flutter in SE Asia, React Native scalability, and Resilient Node.js Backend architectures.

State your answers in clean, concise, scannable format, occasionally using bullet points or simple code fragments (in Markdown) if asked about technical problems. Ensure your tone is highly helpful and showcases exceptional developer craftsmanship.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ response: response.text || "I was unable to formulate a response at the moment." });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error?.message || "An error occurred while connecting to Gemini." });
    }
  });

  // Vite middleware / asset serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
