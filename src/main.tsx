import { createApp } from "vue";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";

// Initialize Vercel Web Analytics
inject();

createApp(App).mount("#root");
