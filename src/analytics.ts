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

const pendingEvents: Array<{
  eventName: string;
  params: Record<string, AnalyticsParameter>;
}> = [];
let flushTimer: number | undefined;

const flushPendingEvents = () => {
  if (!window.umami) return;
  pendingEvents.splice(0).forEach(({ eventName, params }) => {
    window.umami?.track(eventName, params);
  });
};

const scheduleFlush = () => {
  if (flushTimer) return;
  let attempts = 0;
  flushTimer = window.setInterval(() => {
    attempts += 1;
    if (window.umami) {
      window.clearInterval(flushTimer);
      flushTimer = undefined;
      flushPendingEvents();
    } else if (attempts >= 20) {
      window.clearInterval(flushTimer);
      flushTimer = undefined;
      pendingEvents.length = 0;
    }
  }, 250);
};

export const trackEvent = (
  eventName: string,
  params: Record<string, AnalyticsParameter> = {},
) => {
  if (window.umami) {
    window.umami.track(eventName, params);
    return;
  }

  pendingEvents.push({ eventName, params });
  scheduleFlush();
};
