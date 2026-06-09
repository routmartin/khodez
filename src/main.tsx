import { createApp } from "vue";
import App from "./App.tsx";
import { initializeAnalytics } from "./analytics";
import "./index.css";

initializeAnalytics();
createApp(App).mount("#root");
