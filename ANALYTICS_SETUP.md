# Umami Cloud Analytics

The portfolio uses Umami Cloud for visitor statistics and privacy-safe
interaction events. The production website ID is already configured in the
tracker. Reports are viewed in Umami's dashboard; the portfolio has no
analytics admin page or analytics server credentials.

## Setup

No production environment variable is required for the configured portfolio.
To point another deployment at a different Umami website, set:

```dotenv
VITE_UMAMI_WEBSITE_ID="00000000-0000-0000-0000-000000000000"
```

Run `npm run build` again after changing the value because Vite embeds it in
the frontend bundle. The environment variable overrides the default website
ID.

## What Is Tracked

Umami automatically records page views, visitors, referrers, countries,
devices, browsers, bounce rate, and session duration. The portfolio also sends
these custom events:

- `section_view`
- `project_open`
- `article_open`
- `store_click`
- `github_click`
- `contact_click`
- `download_click`
- `chat_open`
- `chat_question_submit`

Event properties contain only action labels and portfolio item IDs. Contact
values and chat message text are never sent.

## Verify

Open the deployed portfolio, perform an interaction, then open the website in
Umami Cloud and check its Realtime and Events views. Local visits are also
tracked when the Website ID is configured unless the browser blocks the script.
