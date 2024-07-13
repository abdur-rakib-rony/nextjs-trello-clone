"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <html>
      <body>
        <section className="bg-white dark:bg-gray-900 mt-10">
          <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div>
              <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                We can&apos;t find that page
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">{error}</p>

              <div className="flex items-center mt-6 gap-x-3">
                <Button onClick={() => reset()} variant="outline">
                  Try again
                </Button>
                <Link href="/">
                  <Button>Take me home</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
