"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section id="cta" className="w-full py-32 bg-background font-sans border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6 text-foreground">
            Ready to talk to your data?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">
            Stop waiting for complex SQL queries to be written. Get instant answers from your database securely in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <button className="group inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/docs">
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-transparent px-8 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                Read the Docs
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
