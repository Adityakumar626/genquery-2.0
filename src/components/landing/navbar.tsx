"use client";

import Link from "next/link";
import { Database } from "lucide-react";
import { motion } from "framer-motion";
import StaggeredMenu from "@/components/ui/staggered-menu";

import { logout } from "@/app/(auth)/actions";

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const menuItems = [
    ...(isLoggedIn 
      ? [
          { label: 'Connect', ariaLabel: 'Connect a Database', link: '/connect' },
          { label: 'Ask AI', ariaLabel: 'Go to AI Analyst', link: '/analyst' },
        ]
      : [
          { label: 'Login', ariaLabel: 'Login to your account', link: '/login' },
          { label: 'Sign Up', ariaLabel: 'Create an account', link: '/signup' }
        ]
    )
  ];
  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 border-b bg-background/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Database className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">GenQuery</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#cta" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/analyst" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                  Ask AI
                </Link>
                <form action={logout}>
                  <button type="submit" className="h-9 px-4 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <button className="h-9 px-4 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

        </div>
      </motion.nav>

      {/* StaggeredMenu is positioned fixed to cover the screen when opened */}
      <div className="md:hidden text-foreground">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displayItemNumbering={true}
          menuButtonColor="currentColor"
          openMenuButtonColor="currentColor"
          changeMenuColorOnOpen={true}
          colors={['#f8fafc', '#e2e8f0']}
          logoUrl=""
          accentColor="#0f172a"
          isFixed={true}
        />
      </div>
    </>
  );
}
