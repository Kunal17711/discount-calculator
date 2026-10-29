import DiscountCalculator from "@/components/DiscountCalculator";
import FaqSection from "@/components/FaqSection";
import { Tag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Hero Header */}
      <header className="text-center max-w-xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 text-xs font-medium">
          <Tag className="w-3.5 h-3.5 text-[#FFD60A]" />
          <span>Double Discounts • Indian Rupee Formatting • Free</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Discount <span className="text-[#FFD60A]">Calculator</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed">
          Calculate final prices, instant rupee savings, and effective percentage on single or stacked discounts (like 50% + 20% off).
        </p>
      </header>

      {/* Main Calculator Tool */}
      <main className="w-full">
        <DiscountCalculator />
      </main>

      {/* 
        ======================================================================
        GOOGLE ADSENSE UNIT PLACEMENT
        Insert your responsive Google AdSense unit snippet here when approved:
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        ======================================================================
      */}

      {/* Semantic SEO FAQ Section with JSON-LD */}
      <FaqSection />
    </div>
  );
}
