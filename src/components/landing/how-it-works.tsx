"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MessageSquare, ShieldCheck, Zap, DatabaseZap } from "lucide-react";

const content = [
  {
    title: "Connect your Database",
    description:
      "Securely connect your PostgreSQL database. We instantly introspect your schema, tables, and relationships to give the AI perfect context without storing your actual data.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" alt="Database" className="object-cover w-full h-full" />
      </div>
    ),
  },
  {
    title: "Ask in Plain English",
    description:
      "Stop wrestling with complex JOINs and aggregate functions. Just type what you want to see, like 'Show me the top 10 users by revenue this month'.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVuZ2xpc2h8ZW58MHx8MHx8fDA%3D" alt="Chat" className="object-cover w-full h-full" />
      </div>
    ),
  },
  {
    title: "Strictly Read-Only Security",
    description:
      "Rest easy knowing your data is safe. Our multi-layered SQL validation engine ensures the AI can only ever run SELECT statements. Destructive operations are strictly blocked.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D" alt="Security" className="object-cover w-full h-full" />
      </div>
    ),
  },
  {
    title: "Instant Results",
    description:
      "Get your data back instantly in a clean, readable data table. No more waiting for data engineers to build custom dashboards or run ad-hoc queries for you.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1651922118990-4017b1f29fd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3VsdHxlbnwwfHwwfHx8MA%3D%3D" alt="Dashboard" className="object-cover w-full h-full" />
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-24 bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-foreground">
            How GenQuery Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            From connection to insights in seconds. See how easy it is to chat with your database.
          </p>
        </div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
