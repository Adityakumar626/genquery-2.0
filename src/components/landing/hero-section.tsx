"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";

export function HeroSection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl px-4 z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background text-sm font-medium text-muted-foreground shadow-sm"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Connect Postgres instantly</span>
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter mb-6 text-foreground">
          Chat with your database. <br className="hidden md:block" />
          <Highlighter color="#fbbf24" action="highlight" strokeWidth={2}>
            <span className="text-foreground px-2">In plain English.</span>
          </Highlighter>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          GenQuery transforms your natural language questions into perfectly optimized <span><Highlighter color="#FF9800" action="underline"> SQL queries</Highlighter></span> . Get the answers you need  without writing a single line of code.
        </p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <Link href={isLoggedIn ? "/analyst" : "/signup"}>
            <button className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90">
              {isLoggedIn ? "Go to Dashboard" : "Get Started Free"}
            </button>
          </Link>

        </motion.div>
      </motion.div>
    </section>
  );
}
