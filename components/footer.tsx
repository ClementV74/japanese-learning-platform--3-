import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M7 10h10" />
            <path d="M7 14h10" />
            <path d="M12 10v8" />
          </svg>
          <span className="text-lg font-bold">日本語マスター</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} 日本語マスター. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

