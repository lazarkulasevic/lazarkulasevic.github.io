---
type: article
title: 'Adding LLM Health Checks and Discord Alerts to the API Hub (Part 2)'
image: /blog/adding-llm-health-checks-and-discord-alerts-to-the-api-hub/featured.jpg
description: A daily LLM health check with Discord alerting for the shared serverless API hub—zero token usage, freemium, CRON_SECRET auth, all on Vercel. Covers implementation and Vercel Cron.
publishedOn: 30 January 2026
updatedOn: null
tags:
  - AI
  - Serverless
  - Monitoring
head:
  - - meta
    - property: og:title
      content: 'Adding LLM Health Checks and Discord Alerts to the API Hub (Part 2)'
  - - meta
    - property: og:description
      content: Daily LLM health check with Discord alerting for the API hub—models.list() only, no tokens, Vercel Cron + webhook.
  - - meta
    - property: keywords
      content: llm health check, discord webhook, vercel cron, groq api, serverless monitoring, api hub
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://deployandpray.com/blog/adding-llm-health-checks-discord-alerts-api-hub-part-2
  - - meta
    - property: og:image
      content: https://deployandpray.com/blog/adding-llm-health-checks-and-discord-alerts-to-the-api-hub/featured.jpg
  - - meta
    - name: twitter:title
      content: 'Adding LLM Health Checks and Discord Alerts to the API Hub (Part 2)'
  - - meta
    - name: twitter:description
      content: Daily LLM health check with Discord alerting for the API hub—models.list() only, no tokens, Vercel Cron + webhook.
  - - meta
    - property: og:url
      content: https://deployandpray.com/blog/adding-llm-health-checks-discord-alerts-api-hub-part-2
  - - meta
    - name: twitter:image
      content: https://deployandpray.com/blog/adding-llm-health-checks-and-discord-alerts-to-the-api-hub/featured.jpg
---

In [Part 1](/blog/building-a-shared-serverless-api-hub-for-ai-chat), I walked through building a shared serverless API hub that powers the AI chat on deployandpray.com—security layers, rate limiting, Prompt Guard, and the knowledge base. One thing I called out in "What I'd improve" was **monitoring**. If Groq goes down or a model disappears, I don't want to find out from a broken chat; I want an alert so I can switch to a backup or fix config. So I added a simple, freemium health check that runs on Vercel and pings Discord when something's wrong.

This post covers that implementation: a daily LLM health check with Discord alerting, all running on the same Vercel project.

## Why Bother Monitoring the LLM?

The chat API depends on two Groq models:

- **`llama-3.1-8b-instant`** — main chat model
- **`meta-llama/llama-prompt-guard-2-86m`** — prompt injection guard

If either is unavailable (provider outage, model deprecated, quota/keys misconfigured), the chat breaks. I don't have a 24/7 ops team, so I wanted:

1. **Proactive alerts** — know when something's wrong before users hit errors
2. **Minimal cost** — ideally free
3. **Same infra** — no extra services if possible; Vercel + cron + webhook is enough

A daily cron that checks "are my models still there?" and posts to Discord fit that. No tokens spent (we use the models list API), no new SaaS, and I get a message I can't miss.

## Architecture

The flow is straightforward:

- **Vercel Cron** triggers the health endpoint once per day.
- **Health endpoint** calls Groq's `models.list()`, checks that both required models appear, and returns JSON.
- **On failure** (missing model or API error), the same handler sends a Discord webhook with a short embed (title, error, suggested action).

No separate worker or external monitoring service; everything lives in the same repo and deployment.

## Implementation

### 1. Health check endpoint

The handler lives at `api/health/llm.ts`. It:

- Accepts only `GET` (Vercel Cron uses GET).
- **Requires `CRON_SECRET`** — rejects requests without a valid `Authorization: Bearer <secret>` header (returns 401).
- Reads `GROQ_API_KEY` and `DISCORD_WEBHOOK_URL` from env.
- Calls `groq.models.list()` — no chat completions, so **zero token usage**.
- Verifies that both required model IDs are in the list.
- Returns **200** with a small JSON body when healthy, **503** when not.
- On unhealthy, calls the Discord webhook with an embed (red, title + description + fields).

Core check logic:

```typescript
const REQUIRED_MODELS = ['llama-3.1-8b-instant', 'meta-llama/llama-prompt-guard-2-86m']

const groq = new Groq({ apiKey })
const modelsResponse = await groq.models.list()
const availableModelIds = modelsResponse.data.map((model) => model.id)

const missingModels = REQUIRED_MODELS.filter((m) => !availableModelIds.includes(m))

if (missingModels.length > 0) {
  // Send Discord alert, return 503 with error details
}
```

So we're only checking "are these models still listed?" — no inference, no extra cost.

### 2. Discord webhook

Discord's Incoming Webhooks accept a JSON body with an `embeds` array. I send one embed per alert:

```typescript
await fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    embeds: [
      {
        title: '🚨 LLM Health Check Failed',
        description: 'One or more required models are unavailable on Groq.',
        color: 0xff0000, // red
        timestamp: new Date().toISOString(),
        fields: [
          { name: 'Missing Models', value: missingModels.join(', '), inline: false },
          {
            name: 'Action Required',
            value: 'Check Groq status or swap to replacement models.',
            inline: false
          }
        ]
      }
    ]
  })
})
```

Same pattern is used for API errors (e.g. bad key, timeout): one embed with title, description, and an "Action required" line. I don't await or retry the webhook; if Discord fails, we still return 503 and log. Alerting is best-effort so the health check itself stays simple.

### 3. Vercel Cron

In `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/health/llm",
      "schedule": "0 9 * * *"
    }
  ]
}
```

`0 9 * * *` is daily at 09:00 UTC. Vercel's cron hits the path with a GET request.

**Important:** You must set `CRON_SECRET` in your Vercel environment variables. Vercel Cron automatically includes the `Authorization: Bearer <CRON_SECRET>` header when calling the endpoint, so authenticated requests work out of the box.

### 4. Response shape

Callers (and future tooling) get a consistent JSON body.

**Unauthorized (401):**

```json
{
  "status": "error",
  "error": "Unauthorized",
  "checkedAt": "2026-01-30T09:00:00.000Z"
}
```

**Healthy (200):**

```json
{
  "status": "healthy",
  "models": {
    "llama-3.1-8b-instant": "available",
    "meta-llama/llama-prompt-guard-2-86m": "available"
  },
  "checkedAt": "2026-01-30T09:00:00.000Z"
}
```

**Unhealthy (503):**

```json
{
  "status": "unhealthy",
  "error": "Models unavailable: llama-3.1-8b-instant",
  "models": {
    "llama-3.1-8b-instant": "unavailable",
    "meta-llama/llama-prompt-guard-2-86m": "available"
  },
  "checkedAt": "2026-01-30T09:00:00.000Z"
}
```

That makes it easy to add an external uptime check later (e.g. "GET this URL and assert status is healthy") or to extend the endpoint with more checks.

## Cost

- **Vercel** — Cron is included on the Hobby plan (one cron per day is enough for this).
- **Groq** — `models.list()` doesn't use tokens.
- **Discord** — Webhooks are free.

So the whole thing is freemium as intended.

## Testing the integration

To confirm Discord receives alerts, I temporarily added a fake model ID to `REQUIRED_MODELS`, ran `vercel dev`, and did:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/health/llm
```

Make sure `CRON_SECRET` is set in your `.env.local` for local testing. The handler reported "unhealthy" and sent the Discord message. Removed the fake model and reverted. Worth doing once so you know the channel and embed look right.

You can also trigger the cron manually from the Vercel dashboard (Settings → Crons → Run) — Vercel automatically includes the auth header.

## Security: CRON_SECRET

The endpoint requires authentication to prevent unauthorized access. Without a valid `Authorization: Bearer <CRON_SECRET>` header, requests are rejected with 401.

To set it up:

1. Generate a secure secret: `openssl rand -hex 32`
2. Add `CRON_SECRET` to your Vercel environment variables (Settings → Environment Variables)
3. For local development, add it to `.env.local`

Vercel Cron automatically includes the auth header when calling the endpoint, so no extra configuration is needed once the env var is set. This keeps the health check private — only Vercel Cron (or you with the secret) can trigger it.

## Wrapping up

- **Single codebase** — health check lives next to the chat API in the same repo.
- **Private endpoint** — `CRON_SECRET` ensures only Vercel Cron (or authorized callers) can trigger it.
- **Lightweight check** — `models.list()` only; no inference, no token cost.
- **Clear signal** — one Discord message per failure with "what's wrong" and "what to do."
- **Same platform** — Vercel cron + serverless function + env vars, no new vendors.

If you're running a small API hub like this, a daily "are my LLMs still there?" check plus a Discord webhook is a simple way to get alerted before users do. Next improvements I'm considering: response-time checks (actual completion with a tiny prompt) and a simple status page that hits this endpoint—but for "is the provider and config still okay?", this is enough for now.
