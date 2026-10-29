import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us | Free Discount Calculator",
  description:
    "Learn about the Discount Calculator tool, built by Kunal Builds. 100% free, private, client-side discount calculations for everyday shoppers and businesses.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Calculator</span>
      </Link>

      <div className="space-y-8">
        <header className="space-y-3 border-b border-white/[0.08] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-white/10 text-[#FFD60A] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built by Kunal Builds</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            About Discount Calculator
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
            A fast, modern, and privacy-first web utility to calculate everyday discounts, stacked store promotions, and rupee savings instantly.
          </p>
        </header>

        {/* Story & Mission */}
        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3">
            <h2 className="text-base font-semibold text-white">Why We Built This</h2>
            <p>
              Stores often advertise double discount promotions like <em>&quot;50% + 20% OFF&quot;</em>. Many shoppers assume this means a 70% discount. In reality, the secondary 20% discount applies only to the already reduced price, yielding an actual discount of <strong>60%</strong>.
            </p>
            <p>
              We built <strong>Discount Calculator</strong> to give shoppers, small business owners, and online buyers complete clarity on what they actually pay and save, formatted cleanly with Indian numbering (1,00,000) and instant step-by-step breakdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="w-4 h-4 text-[#FFD60A]" />
                <span>100% Client-Side & Private</span>
              </div>
              <p className="text-xs text-neutral-400">
                No tracking of prices or financial queries. Every calculation runs entirely in your web browser.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle className="w-4 h-4 text-[#FFD60A]" />
                <span>Free & Open Source</span>
              </div>
              <p className="text-xs text-neutral-400">
                Transparent source code hosted on GitHub. Completely free to use with zero hidden fees or required registrations.
              </p>
            </div>
          </div>

          {/* About Creator */}
          <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.08] space-y-3">
            <h2 className="text-base font-semibold text-white">About the Creator</h2>
            <p>
              This tool was created by <strong>Kunal Builds</strong> as part of a mission to build clean, fast, and helpful open-source utilities for the web.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://websitebykunalbuilds.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-2 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/25 transition-all"
              >
                <span>Visit Kunal Builds</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <a
                href="https://instagram.com/bykunalbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-2 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/25 transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#FFD60A]" />
                <span>Follow @bykunalbuilds</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
