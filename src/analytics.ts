const websiteId =
  import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim() ||
  "c990b15b-0b2b-48c6-8f6f-95b81b8a79a7";

type AnalyticsParameter = string | number | boolean | undefined;

declare global {
  interface Window {
    umami?: {
      track: (
        eventName: string,
        data?: Record<string, AnalyticsParameter>,
      ) => void;
    };
  }
}

let initialized = false;
const pendingEvents: Array<{
  eventName: string;
  params: Record<string, AnalyticsParameter>;
}> = [];

const flushPendingEvents = () => {
  if (!window.umami) return;
  pendingEvents.splice(0).forEach(({ eventName, params }) => {
    window.umami?.track(eventName, params);
  });
};

export const initializeAnalytics = () => {
  if (!websiteId || initialized || typeof document === "undefined") {
    return;
  }

  initialized = true;
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.dataset.websiteId = websiteId;
  script.dataset.excludeSearch = "true";
  script.addEventListener("load", flushPendingEvents, { once: true });
  document.head.appendChild(script);
};

export const trackEvent = (
  eventName: string,
  params: Record<string, AnalyticsParameter> = {},
) => {
  if (window.umami) {
    window.umami.track(eventName, params);
    return;
  }

  if (websiteId) {
    pendingEvents.push({ eventName, params });
  }
};
