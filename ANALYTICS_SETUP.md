# Umami Cloud Analytics

The portfolio uses Umami Cloud for visitor statistics and privacy-safe
interaction events. The production tracking tag is configured directly in the
HTML `<head>`. Reports are viewed in Umami's dashboard; the portfolio has no
analytics admin page or analytics server credentials.

## Setup

No production environment variable is required. To use another Umami website,
replace `data-website-id` in `index.html` and rebuild.

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
