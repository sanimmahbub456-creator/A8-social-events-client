# HandsTogether — Social Development Events Platform (Client)

A community-driven event management platform where users create, discover, join, and track local social-service events — clothes drives, blanket distributions, plantation days, cleanups, and more.

- **Live Site URL:** https://a8-social-events-client-9231q374n-mahbub-ed.vercel.app/
- **Server repo:** <!-- add your server GitHub repo link here -->

## Features

- Full email/password authentication plus Google social login via **BetterAuth**, with password rules (min 6 chars, one uppercase, one lowercase) enforced client-side and toast feedback instead of browser `alert()`.
- Private routes (Create Event, Manage Events, Joined Events) that wait for the session to resolve before redirecting, so a logged-in user reloading a private page is never bounced to `/login`.
- Light/dark theme toggle (DaisyUI themes) applied instantly with no flash-of-wrong-theme on load or reload.
- Home page with a themed banner, feature highlights, the 6 soonest upcoming events pulled live from the API, a static gallery, and a newsletter section.
- Upcoming Events page with search + event-type filtering, showing only events whose date hasn't passed.
- Event details page (public) with a working Join Event flow that requires login.
- Create/Update event forms share one validated component; dates before today are rejected both client- and server-side.
- Manage Events page: table view of your own events with inline update (modal) and delete (confirmation modal), scoped to the logged-in user's email.
- Responsive, consistent design system (headings, buttons, spacing, cards) built with Tailwind + DaisyUI across every page.

## Tech Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, DaisyUI, BetterAuth (MongoDB adapter + JWT plugin), TanStack Query, Axios, react-hot-toast.

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in your own values
npm run dev                         # http://localhost:3000
```

Make sure the [server](../server) is running (or deployed) and `NEXT_PUBLIC_API_URL` points at it.

## Environment Variables

See `.env.local.example`:

- `MONGODB_URI` / `DB_NAME` — used by BetterAuth's Mongo adapter to store users/sessions.
- `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` — BetterAuth config.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from Google Cloud Console (OAuth consent screen + credentials).
- `JWT_SECRET` — must match the Express server's `JWT_SECRET` so it can verify tokens this app mints via `POST /jwt`.
- `NEXT_PUBLIC_API_URL` — your Express API's base URL.

## Notes on Auth Flow

1. User logs in/registers with BetterAuth (email/password or Google).
2. Once a session exists, `useAuth()` calls the Express API's `POST /jwt` with the user's email/name and stores the returned token in `localStorage`.
3. `axiosSecure` attaches that token as `Authorization: Bearer <token>` on every protected request (create/update/delete event, join event, manage/joined-events lists).
4. The Express API verifies the token and additionally checks that the email in the request matches the token's email, so users can only touch their own data.

## Deployment

Build with `npm run build`, deploy to Vercel (recommended for Next.js). Set the same environment variables in your hosting provider's dashboard, update `BETTER_AUTH_URL` / `NEXT_PUBLIC_BASE_URL` to your production domain, and add that domain to your Google OAuth client's authorized redirect URIs (`https://<your-domain>/api/auth/callback/google`).
