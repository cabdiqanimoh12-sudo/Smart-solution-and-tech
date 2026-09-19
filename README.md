# Smart Solution & Tech

A mobile-first e-commerce and electronics repair platform built with Next.js, TypeScript, Prisma and PostgreSQL.

## Architecture

- `app/` — App Router pages and API route handlers
- `components/` — reusable storefront and admin UI
- `lib/` — Prisma client, validation, auth and business configuration
- `prisma/` — relational database schema and seed data
- `public/` — static assets

## Run locally

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
2. Install dependencies: `npm install`.
3. Create tables: `npm run db:push`.
4. Seed the catalog: `npm run db:seed`.
5. Start the app: `npm run dev`.

The storefront works with seeded products and the API persists products, orders and repairs in PostgreSQL. Configure `WHATSAPP_NUMBER` and business settings in environment variables before deployment.

## API surface

`/api/products`, `/api/categories`, `/api/orders`, `/api/repairs`, `/api/auth/register`, `/api/auth/[...nextauth]`, `/api/admin/dashboard`.

Admin access is role-based (`STAFF` and `ADMIN`) through NextAuth credentials. Never commit real secrets.
