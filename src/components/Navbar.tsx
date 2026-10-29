import Link from "next/link";
import { ArrowUpRight, Percent } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-white/[0.08] bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity group"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#FFD60A] group-hover:border-[#FFD60A]/40 transition-colors">
            <Percent className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-base sm:text-lg">
            Discount Calculator
          </span>
        </Link>

        {/* More free tools CTA */}
        <a
          href="https://websitebykunalbuilds.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white px-3 sm:px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-neutral-950 hover:bg-neutral-900 transition-all"
        >
          <span>More free tools</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
        </a>
      </div>
    </header>
  );
}
