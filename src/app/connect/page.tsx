import { ConnectDatabaseForm } from "@/components/database/connect-database-form";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConnectPage() {
  return (
    <StarsBackground className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10 text-sm font-medium backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="relative z-10 mx-auto max-w-xl w-full px-6 py-12 mt-10">
        <div className="bg-background/90 backdrop-blur-md rounded-xl shadow-2xl border-white/10 border">
          <ConnectDatabaseForm />
        </div>
      </div>
    </StarsBackground>
  );
}
