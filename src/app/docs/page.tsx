import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";

export const metadata = {
  title: "Documentation | GenQuery",
  description: "Learn how to use GenQuery to chat with your database.",
};

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">Introduction to GenQuery</h1>
      
      <p className="text-xl text-muted-foreground leading-relaxed mb-10">
        GenQuery is an AI-powered data analyst that lives directly on top of your PostgreSQL database. 
        It allows product managers, marketers, and founders to get instant answers from their data by asking questions in plain English—<Highlighter action="highlight" color="#fef08a" isView>no SQL required</Highlighter>.
      </p>

      <hr className="my-10 border-border" />

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">How it works</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        Traditional BI tools require data engineering teams to build complex ETL pipelines, data warehouses, and pre-defined dashboards. 
        GenQuery bypasses this entirely through a powerful three-step pipeline:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold mb-4">1</div>
          <h3 className="font-semibold text-foreground mb-2">Connect</h3>
          <p className="text-sm text-muted-foreground">Provide your Postgres connection string. We instantly introspect your schema without scraping your actual data.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-4">2</div>
          <h3 className="font-semibold text-foreground mb-2">Ask</h3>
          <p className="text-sm text-muted-foreground">Type a natural language question. The LLM translates this to <Highlighter action="underline" color="#06b6d4" isView>syntactically perfect SQL</Highlighter> using your schema context.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-4">3</div>
          <h3 className="font-semibold text-foreground mb-2">Analyze</h3>
          <p className="text-sm text-muted-foreground">We securely run the query and return a beautiful, interactive data table with the exact answers you need.</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Security & Read-Only Guarantees</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        We take data security extremely seriously. When you connect a database to GenQuery, our query execution engine utilizes a strict, multi-layered validation process:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
        <li>
          <strong className="text-foreground">SQL AST Parsing:</strong> Every generated query is parsed into an Abstract Syntax Tree (AST) before execution. 
          If the AST contains any nodes matching <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-sm">INSERT</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-sm">UPDATE</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-sm">DELETE</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-sm">DROP</code>, or <code className="bg-muted px-1.5 py-0.5 rounded text-foreground text-sm">ALTER</code>, the query is <Highlighter action="underline" color="#ef4444" isView>immediately rejected</Highlighter>.
        </li>
        <li>
          <strong className="text-foreground">Transaction Rollbacks:</strong> To guarantee absolute safety, queries can be executed within a <Highlighter action="box" color="#a855f7" isView>read-only transaction block</Highlighter>.
        </li>
        <li>
          <strong className="text-foreground">Data Privacy:</strong> GenQuery only stores your schema structure (table names, column names, foreign keys) to provide context to the AI. We <Highlighter action="highlight" color="#bbf7d0" isView>never store or cache your actual row data</Highlighter>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Writing Good Prompts</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        While GenQuery is incredibly smart, providing slightly more context in your natural language prompts will result in significantly more accurate SQL generation.
      </p>
      
      <div className="bg-muted/30 border rounded-xl p-6 my-6">
        <h4 className="text-foreground font-medium mt-0 mb-4">❌ Poor Prompt</h4>
        <p className="text-muted-foreground m-0 italic">"Show me good users."</p>
        <p className="text-sm text-muted-foreground mt-4 mb-0">The AI doesn't know what "good" means in your business context. Does it mean revenue? Login frequency?</p>
      </div>

      <div className="bg-muted/30 border rounded-xl p-6 my-6">
        <h4 className="text-foreground font-medium mt-0 mb-4">✅ Excellent Prompt</h4>
        <p className="text-muted-foreground m-0 italic">"Show me the top 10 users ranked by total revenue this month. Include their email and organization name."</p>
        <p className="text-sm text-muted-foreground mt-4 mb-0">The AI knows exactly which tables to join, how to order the results, and what specific columns to select.</p>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Supported Databases</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        GenQuery is currently optimized for <strong>PostgreSQL</strong>. Because we use standard Postgres drivers and connection pooling, we fully support all major cloud providers and Postgres flavors, including:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="flex items-center justify-center p-4 border rounded-lg bg-card text-sm font-medium">Supabase</div>
        <div className="flex items-center justify-center p-4 border rounded-lg bg-card text-sm font-medium">Neon</div>
        <div className="flex items-center justify-center p-4 border rounded-lg bg-card text-sm font-medium">AWS RDS</div>
        <div className="flex items-center justify-center p-4 border rounded-lg bg-card text-sm font-medium">Vercel Postgres</div>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Advanced Capabilities</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        Because GenQuery is powered by <Highlighter action="circle" color="#3b82f6" isView>Gemini 3.5 Flash</Highlighter>, it goes far beyond simple <code>SELECT * FROM table</code> queries. The analyst is capable of handling complex analytics workloads out of the box:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-10">
        <li><strong>Multi-Table Joins:</strong> Automatically infers foreign key relationships to join user, product, and transaction tables seamlessly.</li>
        <li><strong>Time-Series Aggregations:</strong> Request data "grouped by month" or "over the last 30 days" and the AI will apply the correct Postgres date/time functions (e.g., <code>DATE_TRUNC</code>).</li>
        <li><strong>Complex Math:</strong> Calculate averages, sums, medians, and percentages effortlessly. Just ask: "What is the average order value by country?"</li>
        <li><Highlighter action="highlight" color="#fbcfe8" isView><strong>Conversational Memory:</strong></Highlighter> GenQuery understands context. If you ask a follow-up question, it remembers the schema and the previous context.</li>
      </ul>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Troubleshooting & FAQ</h2>
      <div className="space-y-6 mb-10">
        <div className="border rounded-lg p-5 bg-card/50">
          <h4 className="font-semibold text-foreground mb-2">Why am I getting a connection error?</h4>
          <p className="text-sm text-muted-foreground">Ensure your database is publicly accessible or that our IP addresses are whitelisted. For Supabase and Neon, you must provide your pooled connection string (usually ending in <code>-pooler</code> or port <code>6543</code>) and ensure SSL is enabled.</p>
        </div>
        <div className="border rounded-lg p-5 bg-card/50">
          <h4 className="font-semibold text-foreground mb-2">Why did the AI reject my query?</h4>
          <p className="text-sm text-muted-foreground">GenQuery employs an extremely strict SQL validator. If your prompt sounds like a data-modification request (e.g., "delete user 5" or "update this record"), the AST parser will flag it and refuse to execute it to protect your database.</p>
        </div>
        <div className="border rounded-lg p-5 bg-card/50">
          <h4 className="font-semibold text-foreground mb-2">My schema is huge, will this work?</h4>
          <p className="text-sm text-muted-foreground">Yes. Our introspection engine normalizes your schema and only extracts table definitions, column types, and foreign keys. This lightweight representation easily fits into modern LLM context windows.</p>
        </div>
      </div>

      <hr className="my-10 border-border" />

      <h2 className="text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4">Next Steps</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-12">
        Ready to start querying your database without writing SQL? 
        Head over to the <a href="/signup" className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors">Signup page</a> to create a free account and start chatting with your data instantly!
      </p>
    </div>
  );
}
