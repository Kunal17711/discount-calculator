export default function AdPlaceholder({
  slot = "responsive",
}: {
  slot?: string;
}) {
  return (
    <div
      className="w-full my-6 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] text-center"
      aria-label="Advertisement Placeholder"
    >
      {/* 
        Google AdSense Unit Placeholder
        To display live ads:
        1. Replace data-ad-client with your publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
        2. Replace data-ad-slot with your AdSense slot ID
        3. Uncomment the <ins> and (adsbygoogle = window.adsbygoogle || []).push({}); script
      */}
      <div className="flex flex-col items-center justify-center min-h-[90px] border border-dashed border-white/10 rounded-lg p-3 text-neutral-500 text-xs">
        <span className="uppercase tracking-wider text-[10px] font-semibold text-neutral-600 mb-1">
          Advertisement
        </span>
        <p className="text-neutral-500 text-xs">
          Google AdSense Responsive Ad Slot ({slot})
        </p>
        <span className="text-[11px] text-neutral-600 mt-1">
          Paste your AdSense unit code here
        </span>
      </div>
    </div>
  );
}
