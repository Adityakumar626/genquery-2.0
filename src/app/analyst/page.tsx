"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { SqlResultTable } from "@/components/database/sql-result-table";
import { logout } from "@/app/(auth)/actions";
import Link from "next/link";
import { Database, LogOut } from "lucide-react";

import { Meteors } from "@/components/ui/meteors";
import { playSendSound, playReceiveSound } from "@/lib/audio";
import { Outfit } from "next/font/google";
import { Highlighter } from "@/components/ui/highlighter";

import { toast } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export default function AnalystPage() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      headers: {
        "x-gemini-api-key":
          typeof window !== "undefined"
            ? localStorage.getItem("gemini_api_key") || ""
            : "",
      },
    }),
    onError: (error) => {
      const msg = error.message;
      if (msg.includes("Limit Exceeded") || msg.includes("429")) {
        toast.error("API Limit Exceeded", {
          description: "Your Gemini API key has run out of quota. Please check your Google AI Studio dashboard.",
        });
      } else {
        toast.error("Error", {
          description: msg || "Something went wrong processing your request.",
        });
      }
    },
    onFinish: () => {
      playReceiveSound();
    }
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      <Meteors number={30} />
      <main className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col px-6 py-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <Link
            href="/"
            className="font-semibold text-lg flex items-center gap-2"
          >
            <Database className="w-5 h-5" /> GenQuery
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/connect"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Change Database
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

          <h1
            className={`text-4xl font-semibold tracking-tight ${outfit.className}`}
          >
        <Highlighter action="underline" color="#0000FF">
            AI Analyst
        </Highlighter>
          </h1>

        <p className={`mt-2 text-muted-foreground text-lg ${outfit.className}`}>
          Ask questions about your database.
        </p>

        <div className="mt-6 flex-1 overflow-y-auto space-y-6 flex flex-col pr-2 pb-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex flex-col max-w-[85%] ${isUser ? "self-end items-end" : "self-start items-start"}`}
              >
                <div
                  className={`mb-1.5 text-xs font-medium px-1 ${isUser ? "text-primary/80" : "text-muted-foreground"}`}
                >
                  {isUser ? "You" : "AI Analyst"}
                </div>

                <div
                  className={`
                    p-4 shadow-lg backdrop-blur-md 
                    ${
                      isUser
                        ? "bg-primary/90 text-primary-foreground rounded-2xl rounded-tr-sm border border-primary/20"
                        : "bg-background/80 border border-white/10 rounded-2xl rounded-tl-sm text-foreground"
                    }
                  `}
                >
                  <div className="space-y-3 whitespace-pre-wrap leading-relaxed">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <div key={`${message.id}-${index}`}>{part.text}</div>
                        );
                      }

                      if ((part as any).type === "data-sql-result") {
                        const data = (part as any).data;
                        return (
                          <div
                            key={`${message.id}-${index}`}
                            className="flex flex-col gap-2 my-4"
                          >
                            <details className="group rounded-xl border border-white/10 bg-black/40 p-3 shadow-inner transition-all">
                              <summary className="cursor-pointer text-sm font-medium flex items-center text-muted-foreground hover:text-foreground">
                                <span className="mr-2 opacity-70 group-open:rotate-90 transition-transform">
                                  ▸
                                </span>
                                View Generated SQL
                              </summary>
                              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/60 p-3 text-xs text-muted-foreground font-mono">
                                {data.sql}
                              </pre>
                            </details>

                            <details
                              className="group rounded-xl border border-white/10 bg-black/40 p-3 shadow-inner transition-all"
                              open
                            >
                              <summary className="cursor-pointer text-sm font-medium flex items-center text-muted-foreground hover:text-foreground">
                                <span className="mr-2 opacity-70 group-open:rotate-90 transition-transform">
                                  ▸
                                </span>
                                Data Results ({data.rows?.length || 0} rows)
                              </summary>
                              <div className="mt-3 overflow-hidden rounded-md border border-white/5">
                                <SqlResultTable rows={data.rows} />
                              </div>
                            </details>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} className="h-4 flex-shrink-0" />
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!input.trim() || isLoading) return;

            playSendSound();

            sendMessage({
              text: input,
            });

            setInput("");
          }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30 transition-colors"
              value={input}
              placeholder="Ask something..."
              onChange={(event) => setInput(event.currentTarget.value)}
              autoFocus
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-primary px-5 py-3 text-primary-foreground disabled:opacity-50"
            >
              {isLoading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
