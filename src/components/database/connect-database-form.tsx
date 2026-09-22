"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ConnectDatabaseForm() {
  const router = useRouter();
  const [isTesting, setIsTesting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  async function testConnection() {
    const form = document.querySelector("form");

    if (!form) return;

    const formData = new FormData(form);
    const connectionString = formData.get("connectionString") as string;
    let url;

    try {
      url = new URL(connectionString);
      if (url.protocol !== "postgresql:" && url.protocol !== "postgres:") {
        throw new Error("Must be a postgresql:// URL");
      }
    } catch (e) {
      toast.error("Invalid connection string format. Use postgresql://...");
      return;
    }

    const payload = {
      host: url.hostname,
      port: url.port || "5432",
      databaseName: url.pathname.slice(1),
      username: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
    };

    setIsTesting(true);

    try {
      const response = await fetch("/api/data-sources/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success("Database connection successful.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Connection failed.");
    } finally {
      setIsTesting(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formApiKey = formData.get("apiKey") as string;
    const connectionString = formData.get("connectionString") as string;
    
    if (formApiKey) {
      localStorage.setItem("gemini_api_key", formApiKey);
    }

    let url;
    try {
      url = new URL(connectionString);
      if (url.protocol !== "postgresql:" && url.protocol !== "postgres:") {
        throw new Error("Must be a postgresql:// URL");
      }
    } catch (e) {
      toast.error("Invalid connection string format. Use postgresql://...");
      return;
    }

    setIsConnecting(true);

    const payload = {
      name: formData.get("name"),
      host: url.hostname,
      port: url.port || "5432",
      databaseName: url.pathname.slice(1),
      username: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
    };

    try {
      const response = await fetch("/api/data-sources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      toast.success("Database connected successfully. Redirecting...");
      setTimeout(() => {
        router.push('/analyst');
      }, 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setIsConnecting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
      <div>
        <h2 className="text-xl font-semibold">Connect PostgreSQL</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Connect a database for the AI Analyst to query.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>

        <input
          name="name"
          required
          placeholder="My Analytics DB"
          className="mt-1 w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Connection String</label>

        <input
          name="connectionString"
          required
          placeholder="postgresql://user:password@host:5432/db"
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 font-mono text-sm"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Your full database URI. e.g. postgresql://...
        </p>
      </div>

      <div className="pt-4 border-t">
        <label className="text-sm font-medium">Google Gemini API Key</label>
        <p className="text-xs text-muted-foreground mb-2">Used for running AI queries. Stored securely in your browser.</p>
        <input
          name="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          placeholder="AIzaSy..."
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <button
        type="button"
        onClick={testConnection}
        disabled={isTesting || isConnecting}
        className="w-full rounded-md border px-4 py-2 text-sm disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {isTesting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isTesting ? "Testing..." : "Test Connection"}
      </button>

      <button
        disabled={isTesting || isConnecting}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {isConnecting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isConnecting ? "Connecting..." : "Connect Database"}
      </button>
    </form>
  );
}
