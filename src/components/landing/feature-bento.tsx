"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShieldCheck, Zap, DatabaseZap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";

const features = [
  {
    title: "Natural Language to SQL",
    description: "Type what you want in plain English. Our AI instantly translates it to optimized Postgres SQL.",
    icon: <MessageSquare className="w-5 h-5 text-foreground" />,
    className: "md:col-span-2",
  },
  {
    title: "Read-Only Security",
    description: "Strict SQL validation ensures the AI can never run destructive operations like DROP or DELETE.",
    icon: <ShieldCheck className="w-5 h-5 text-foreground" />,
    className: "md:col-span-1",
  },
  {
    title: "Blazing Fast Results",
    description: "Query execution is optimized to return your data table instantly.",
    icon: <Zap className="w-5 h-5 text-foreground" />,
    className: "md:col-span-1",
  },
  {
    title: "Schema Introspection",
    description: "We automatically read your database schema to give the AI perfect context for accurate queries.",
    icon: <DatabaseZap className="w-5 h-5 text-foreground" />,
    className: "md:col-span-2",
  },
];

const CARDS = [
  {
    id: 1,
    name: "Revenue Analysis",
    designation: "Sales Database",
    content: (
      <p className="text-base text-neutral-800 dark:text-neutral-200">
        "Show me the <span className="font-bold text-blue-500">total revenue</span> by month for the last year, grouped by product category."
      </p>
    ),
  },
  {
    id: 2,
    name: "User Growth",
    designation: "Analytics DB",
    content: (
      <p className="text-base text-neutral-800 dark:text-neutral-200">
        "How many <span className="font-bold text-blue-500">new users</span> signed up last week compared to the week before?"
      </p>
    ),
  },
  {
    id: 3,
    name: "Inventory Check",
    designation: "Operations",
    content: (
      <p className="text-base text-neutral-800 dark:text-neutral-200">
        "List all products with <span className="font-bold text-blue-500">low stock</span> (under 50 units) that have high sales volume."
      </p>
    ),
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="w-full py-24 bg-background font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-foreground">
            Everything you need. <br />
            <span className="text-muted-foreground font-normal">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            GenQuery is built from the ground up to securely connect to your data and make querying as easy as chatting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[210px]">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-6 transition-shadow hover:shadow-sm",
                  feature.className
                )}
              >
                <div className="mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Card Stack and Terminal */}
          <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
            <div className="mb-8 text-center w-full max-w-sm">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">See it in action</h3>
              <p className="text-muted-foreground">Ask natural questions, get instant SQL.</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-12">
              <div className="flex items-center justify-center w-full h-[300px]">
                <CardStack items={CARDS} />
              </div>
              
              <Terminal className="max-w-md w-full">
                <TypingAnimation>&gt; genquery connect --db postgres</TypingAnimation>
                <AnimatedSpan delay={1500} className="text-muted-foreground">
                  <span>Connecting to database...</span>
                </AnimatedSpan>
                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ Successfully connected to Postgres.</span>
                </AnimatedSpan>
                <AnimatedSpan delay={3000} className="text-muted-foreground">
                  <span>Introspecting schema...</span>
                </AnimatedSpan>
                <AnimatedSpan delay={4000} className="text-green-500">
                  <span>✔ Schema loaded. 42 tables found.</span>
                </AnimatedSpan>
                <TypingAnimation delay={4500}>&gt; Ready for queries.</TypingAnimation>
              </Terminal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
