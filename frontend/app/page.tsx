import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Logo size={110} />
        <h1 className="text-3xl">CoastLine</h1>
        <div className="flex flex-col items-center sm:items-start">
          <p className="block">Manage all your loans in one place.</p>
          <p className="block">Always know your financial situation.</p>
        </div>
        <div className="grid gap-2">
          <Link href="/login" className="row-start-1">
            <Button className="w-[8rem]">Login</Button>
          </Link>
          <Link href="/signup" className="row-start-1">
            <Button className="w-[8rem]">Sign Up</Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-4 flex gap-6 flex-wrap items-center justify-center">
        <h1>Never miss a payment ever again.</h1>
      </footer>
    </div>
  );
}
