# Ziki sign-in and homepage

A small, standalone Next.js app containing the Ziki public homepage and Google sign-in page. It has a fresh Git history and only the routes needed for this presentation: `/` and `/login`, plus the Google OAuth callback route.

The homepage and sign-in UI were copied and adapted from the MIT-licensed Zedu-Endor issue-tracker project. The original license notice is retained in [`LICENSE`](./LICENSE). This repository is independent; it is not a Git fork and does not include the original repository history, dashboard, database, or issue-tracking API.

## Run locally

Requires Node.js 22 and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Google sign-in stays disabled until the OAuth variables are configured.

## Google OAuth

Set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` in your local `.env` file and in the Vercel project environment.

Add this authorized redirect URI to the Google OAuth client:

```text
https://YOUR_DEPLOYMENT_DOMAIN/api/auth/callback/google
```

For local development, also add:

```text
http://localhost:3000/api/auth/callback/google
```

No `.env` file or credentials belong in Git.
