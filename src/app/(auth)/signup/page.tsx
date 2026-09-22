import { signup } from '../actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Database } from 'lucide-react'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
            <Database className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">GenQuery</span>
        </Link>
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign up to get started with GenQuery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-sm border sm:rounded-2xl sm:px-10">
          <form className="space-y-6" action={signup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="block w-full rounded-md border-0 py-2 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border bg-background placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-foreground sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-md border-0 py-2 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border bg-background placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-foreground sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Button type="submit" className="w-full h-11 text-base font-medium">
                Sign up
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-foreground hover:underline transition-all">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
