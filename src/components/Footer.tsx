import Link from "next/link";
import { GithubIcon, InstagramIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-black text-neutral-400 py-10 mt-auto">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        {/* Creator attribution */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <p className="flex items-center gap-1.5 text-neutral-300">
            Built by{" "}
            <a
              href="https://websitebykunalbuilds.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-[#FFD60A] underline underline-offset-4 decoration-white/30 transition-colors"
            >
              Kunal Builds
            </a>
            , free & open source
          </p>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <a
            href="https://instagram.com/bykunalbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#FFD60A]" />
            <span>@bykunalbuilds</span>
          </a>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex items-center gap-5 text-xs text-neutral-400">
          <Link
            href="/about"
            className="hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <a
            href="https://github.com/Kunal17711/discount-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
