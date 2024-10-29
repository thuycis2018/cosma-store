# About

This is a shopping cart built with Next.js and React (TypeScript). Both authentication and payment are using developer account so it will show 'development mode' and 'test mode' indication.

# Get Started

- Authentication is using Clerk. Sign up and get NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY and add to .env.local.

  [Clerk + Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)

- Data is stored in Supabase. Sign up and get DATABASE_URL, DIRECT_URL, SUPABASE_URL, and SUPABASE_KEY and add to .env.

  [Supbase](https://supabase.com/)

- Payment is done by using Stripe. Sign up and get NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY and add to .env.

  [Stripe Embedded Form](https://docs.stripe.com/checkout/embedded/quickstart)

### Install packages

```bash
npm i
```

### Set up data models in Supabase

```bash
npx prisma db push
```

### Populate sample products data (/prisma/products.json)

```bash
node prisma/seed.js
```

### Start dev server

```bash
npm run dev
```
