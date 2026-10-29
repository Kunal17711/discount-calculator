"use client";

import { useState, useId } from "react";
import {
  Percent,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  TrendingDown,
  Plus,
} from "lucide-react";
import {
  formatIndianCurrency,
  formatPercent,
  calculateDiscount,
  calculateReverseDiscount,
  sanitizeNumberInput,
} from "@/lib/calculator";

const PRESET_DISCOUNTS = [10, 20, 30, 50, 70];

export default function DiscountCalculator() {
  // Active Tab: "calculate" (Normal & Extra discount) or "reverse" (Find discount %)
  const [activeTab, setActiveTab] = useState<"calculate" | "reverse">("calculate");

  // Tab 1 state
  const [originalPriceStr, setOriginalPriceStr] = useState<string>("1000");
  const [discountPercentStr, setDiscountPercentStr] = useState<string>("20");
  const [extraDiscountPercentStr, setExtraDiscountPercentStr] = useState<string>("");
  const [showExtraDiscount, setShowExtraDiscount] = useState<boolean>(false);

  // Tab 2 state (Find discount %)
  const [reverseOriginalStr, setReverseOriginalStr] = useState<string>("1000");
  const [reverseSaleStr, setReverseSaleStr] = useState<string>("750");

  // Copy state
  const [copied, setCopied] = useState<boolean>(false);

  // Generated IDs for accessibility
  const origPriceId = useId();
  const discPercentId = useId();
  const extraDiscId = useId();
  const revOrigId = useId();
  const revSaleId = useId();

  // Tab 1 numeric values & calculations
  const numOriginal = originalPriceStr === "" ? 0 : parseFloat(originalPriceStr) || 0;
  const numDiscount = discountPercentStr === "" ? 0 : parseFloat(discountPercentStr) || 0;
  const numExtra =
    showExtraDiscount && extraDiscountPercentStr !== ""
      ? parseFloat(extraDiscountPercentStr) || 0
      : 0;

  const discountResult = calculateDiscount(numOriginal, numDiscount, numExtra);

  // Tab 2 numeric values & calculations
  const numRevOriginal = reverseOriginalStr === "" ? 0 : parseFloat(reverseOriginalStr) || 0;
  const numRevSale = reverseSaleStr === "" ? 0 : parseFloat(reverseSaleStr) || 0;

  const reverseResult = calculateReverseDiscount(numRevOriginal, numRevSale);

  // Input handlers with validation
  const handleOriginalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { str } = sanitizeNumberInput(raw);
    setOriginalPriceStr(str);
  };

  const handleDiscountPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { str } = sanitizeNumberInput(raw, 100);
    setDiscountPercentStr(str);
  };

  const handleExtraDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { str } = sanitizeNumberInput(raw, 100);
    setExtraDiscountPercentStr(str);
  };

  const handlePresetClick = (preset: number) => {
    setDiscountPercentStr(preset.toString());
  };

  const handleReverseOriginalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { str } = sanitizeNumberInput(raw);
    setReverseOriginalStr(str);
  };

  const handleReverseSaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const { str } = sanitizeNumberInput(raw);
    setReverseSaleStr(str);
  };

  const handleCopy = async () => {
    const textToCopy =
      activeTab === "calculate"
        ? discountResult.summaryCopyText
        : reverseResult.summaryCopyText;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleReset = () => {
    if (activeTab === "calculate") {
      setOriginalPriceStr("");
      setDiscountPercentStr("");
      setExtraDiscountPercentStr("");
      setShowExtraDiscount(false);
    } else {
      setReverseOriginalStr("");
      setReverseSaleStr("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tab Switcher */}
      <div className="flex p-1 mb-6 rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setActiveTab("calculate")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === "calculate"
              ? "bg-[#0a0a0a] text-white shadow-sm border border-white/10"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5 text-[#FFD60A]" />
          <span>Discount Calculator</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reverse")}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === "reverse"
              ? "bg-[#0a0a0a] text-white shadow-sm border border-white/10"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <Percent className="w-3.5 h-3.5 text-[#FFD60A]" />
          <span>Find the Discount %</span>
        </button>
      </div>

      {/* Main Dark Card */}
      <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.08] shadow-2xl p-5 sm:p-7 relative overflow-hidden animate-fade-in">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD60A]/40 to-transparent" />

        {activeTab === "calculate" ? (
          /* TAB 1: STANDARD & DOUBLE DISCOUNT */
          <div className="space-y-6">
            {/* Input 1: Original Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor={origPriceId}
                  className="text-xs sm:text-sm font-medium text-neutral-300 flex items-center gap-1.5"
                >
                  Original Price
                  <span className="text-neutral-500 font-normal">(Rs. / ₹)</span>
                </label>
                {originalPriceStr && (
                  <span className="text-xs text-neutral-400">
                    {formatIndianCurrency(numOriginal)}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium text-base select-none">
                  ₹
                </span>
                <input
                  id={origPriceId}
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1,000"
                  value={originalPriceStr}
                  onChange={handleOriginalPriceChange}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD60A] focus:ring-1 focus:ring-[#FFD60A] text-lg font-medium tracking-wide transition-all"
                />
              </div>
            </div>

            {/* Input 2: Discount % with Preset Chips */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor={discPercentId}
                  className="text-xs sm:text-sm font-medium text-neutral-300"
                >
                  Discount %
                </label>
                {discountPercentStr && (
                  <span className="text-xs text-[#FFD60A] font-semibold">
                    {formatPercent(numDiscount)} off
                  </span>
                )}
              </div>
              <div className="relative mb-3">
                <input
                  id={discPercentId}
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 20"
                  value={discountPercentStr}
                  onChange={handleDiscountPercentChange}
                  className="w-full pl-4 pr-9 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD60A] focus:ring-1 focus:ring-[#FFD60A] text-lg font-medium tracking-wide transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium select-none">
                  %
                </span>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider mr-1">
                  Presets:
                </span>
                {PRESET_DISCOUNTS.map((preset) => {
                  const isSelected = numDiscount === preset && discountPercentStr === preset.toString();
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#FFD60A] text-black font-semibold shadow-[0_0_12px_rgba(255,214,10,0.4)]"
                          : "bg-neutral-900 text-neutral-300 hover:text-white border border-white/10 hover:border-white/25"
                      }`}
                    >
                      {preset}%
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Extra Discount Section */}
            <div className="pt-2 border-t border-white/[0.06]">
              {!showExtraDiscount ? (
                <button
                  type="button"
                  onClick={() => setShowExtraDiscount(true)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#FFD60A] hover:text-[#ffe14d] font-medium py-1 transition-colors group"
                >
                  <Plus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
                  <span>Add Extra Discount % (e.g. &quot;50% + 20% off&quot; deal)</span>
                </button>
              ) : (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor={extraDiscId}
                      className="text-xs sm:text-sm font-medium text-neutral-300 flex items-center gap-2"
                    >
                      <span>Extra Discount %</span>
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-yellow-400/10 text-[#FFD60A] border border-[#FFD60A]/20">
                        Second discount
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowExtraDiscount(false);
                        setExtraDiscountPercentStr("");
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id={extraDiscId}
                      type="text"
                      inputMode="decimal"
                      placeholder="e.g. 20 (applied to discounted price)"
                      value={extraDiscountPercentStr}
                      onChange={handleExtraDiscountChange}
                      className="w-full pl-4 pr-9 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD60A] focus:ring-1 focus:ring-[#FFD60A] text-lg font-medium tracking-wide transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium select-none">
                      %
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Applied on top of the already reduced price (not added linearly).
                  </p>
                </div>
              )}
            </div>

            {/* LIVE RESULTS BOX */}
            <div className="rounded-xl bg-black/60 border border-white/[0.08] p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 block mb-1">
                    Final Price
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-baseline gap-1">
                    <span>{formatIndianCurrency(discountResult.finalPrice)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 sm:gap-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30 text-[#FFD60A] text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>You Save: {formatIndianCurrency(discountResult.youSave)}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">
                    Effective Discount:{" "}
                    <span className="text-white font-semibold">
                      {formatPercent(discountResult.effectiveDiscountPercent)}
                    </span>
                    {numExtra > 0 && (
                      <span className="text-[11px] text-neutral-500 ml-1">
                        ({formatPercent(numDiscount)} + {formatPercent(numExtra)})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* "How it was calculated" Line */}
              <div className="rounded-lg bg-neutral-950/70 p-3.5 border border-white/[0.04]">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-400 space-y-1 leading-relaxed">
                    <p className="font-medium text-neutral-300">How it was calculated:</p>
                    {discountResult.calculationSteps.map((step, idx) => (
                      <p key={idx} className="text-neutral-400">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy Result & Reset */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 white-glow hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-black stroke-[2.5]" />
                      <span>Copied breakdown!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2]" />
                      <span>Copy Result</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset fields"
                  className="p-3 rounded-xl border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white bg-neutral-900/40 hover:bg-neutral-900 transition-all cursor-pointer"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: FIND THE DISCOUNT % (REVERSE CALCULATOR) */
          <div className="space-y-6">
            <div className="text-xs text-neutral-400">
              Enter the original price and the discounted sale price to uncover the exact percentage discount and amount saved.
            </div>

            {/* Input 1: Original Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor={revOrigId}
                  className="text-xs sm:text-sm font-medium text-neutral-300"
                >
                  Original Price (₹)
                </label>
                {reverseOriginalStr && (
                  <span className="text-xs text-neutral-400">
                    {formatIndianCurrency(numRevOriginal)}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium text-base select-none">
                  ₹
                </span>
                <input
                  id={revOrigId}
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1,000"
                  value={reverseOriginalStr}
                  onChange={handleReverseOriginalChange}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD60A] focus:ring-1 focus:ring-[#FFD60A] text-lg font-medium tracking-wide transition-all"
                />
              </div>
            </div>

            {/* Input 2: Sale Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor={revSaleId}
                  className="text-xs sm:text-sm font-medium text-neutral-300"
                >
                  Sale Price (₹)
                </label>
                {reverseSaleStr && (
                  <span className="text-xs text-neutral-400">
                    {formatIndianCurrency(numRevSale)}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium text-base select-none">
                  ₹
                </span>
                <input
                  id={revSaleId}
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 750"
                  value={reverseSaleStr}
                  onChange={handleReverseSaleChange}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD60A] focus:ring-1 focus:ring-[#FFD60A] text-lg font-medium tracking-wide transition-all"
                />
              </div>
            </div>

            {/* LIVE RESULTS BOX */}
            <div className="rounded-xl bg-black/60 border border-white/[0.08] p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 block mb-1">
                    {reverseResult.isPriceIncrease ? "Price Increase" : "Discount Percentage"}
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-baseline gap-2">
                    <span className={reverseResult.isPriceIncrease ? "text-red-400" : "text-[#FFD60A]"}>
                      {formatPercent(reverseResult.isPriceIncrease ? reverseResult.percentageChange : reverseResult.discountPercent)}
                    </span>
                    {!reverseResult.isPriceIncrease && (
                      <span className="text-base font-normal text-neutral-400">OFF</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-xs font-semibold">
                    <span>
                      {reverseResult.isPriceIncrease ? "Extra Cost: " : "You Save: "}
                      {formatIndianCurrency(reverseResult.isPriceIncrease ? numRevSale - numRevOriginal : reverseResult.youSave)}
                    </span>
                  </div>
                </div>
              </div>

              {/* How it was calculated */}
              <div className="rounded-lg bg-neutral-950/70 p-3.5 border border-white/[0.04]">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-400 space-y-1 leading-relaxed">
                    <p className="font-medium text-neutral-300">Calculation:</p>
                    {reverseResult.calculationSteps.map((step, idx) => (
                      <p key={idx} className="text-neutral-400">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 white-glow hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-black stroke-[2.5]" />
                      <span>Copied summary!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2]" />
                      <span>Copy Result</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset fields"
                  className="p-3 rounded-xl border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white bg-neutral-900/40 hover:bg-neutral-900 transition-all cursor-pointer"
                  title="Clear inputs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
