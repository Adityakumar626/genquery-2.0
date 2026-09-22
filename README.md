# GenQuery 2.0

GenQuery 2.0 is an intelligent generative AI application built with Next.js. It features a modern, responsive UI and integrates AI capabilities to process and generate query results, leveraging a robust database backend.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (React 19)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS v4, Framer Motion, GSAP, Base UI, Lucide React
- **Database & ORM:** PostgreSQL (via Postgres.js), Drizzle ORM, Supabase SSR
- **AI Integration:** Vercel AI SDK (with Google provider)
- **Testing:** Vitest
- **Linting:** ESLint

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v20 or higher)
- npm (or your preferred package manager)
- PostgreSQL Database

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

3. **Configure the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. Navigate to the **Connect page** within the application to securely provide your PostgreSQL Database URL and Google Gemini API key.

4. **Database Setup:**
   If you need to apply schema changes to your connected database, you can run Drizzle migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run db:generate`: Generates Drizzle migrations based on your schema.
- `npm run db:migrate`: Applies Drizzle migrations to your database.
- `npm run test`: Runs Vitest test suites.

## Project Structure

- `/src`: Contains the source code including application logic, components, and libraries.
- `/public`: Contains static assets like images or fonts.
- `/components.json`: UI component definitions/configuration.
- `drizzle.config.ts`: Configuration for Drizzle ORM.
- `eslint.config.mjs`: ESLint flat configuration.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.
