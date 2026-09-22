import { HeroSection } from "@/components/landing/hero-section";
import { FeatureBento } from "@/components/landing/feature-bento";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CallToAction } from "@/components/landing/cta-section";
import { Navbar } from "@/components/landing/navbar";

import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "GenQuery - Talk to your database in plain English",
  description: "AI-powered data analyst. Get instant answers from your Postgres database without writing SQL.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-1 pt-16">
        <HeroSection isLoggedIn={isLoggedIn} />
        <HowItWorks />
        <FeatureBento />
        <CallToAction />
      </main>

      <footer className="w-full border-t py-12 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GenQuery. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
