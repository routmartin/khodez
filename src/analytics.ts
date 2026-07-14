import { track } from "@vercel/analytics";

type AnalyticsParameter = string | number | boolean | undefined;

export const trackEvent = (
  eventName: string,
  params: Record<string, AnalyticsParameter> = {},
) => {
  track(eventName, params as Record<string, string | number | boolean>);
};
