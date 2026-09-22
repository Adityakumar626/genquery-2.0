import Link from "next/link";
import { Database, FileText, Shield, Zap, Search } from "lucide-react";

const sidebarLinks = [
  { name: "Introduction", href: "/docs", icon: FileText },
  { name: "Connecting your Database", href: "#", icon: Database },
  { name: "Security & Permissions", href: "#", icon: Shield },
  { name: "Writing Good Queries", href: "#", icon: Zap },
  { name: "How Introspection Works", href: "#", icon: Search },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      {/* <aside className="w-full md:w-64 border-r bg-muted/20 flex-shrink-0 flex flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Database className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">GenQuery</span>
          </Link>
        </div>
        <div className="p-4 flex-1">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Documentation
          </h4>
          <nav className="space-y-1">
            {sidebarLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden border-b p-4 flex items-center bg-muted/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Database className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">GenQuery Docs</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
