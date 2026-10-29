import { HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do you calculate a discount?",
    answer:
      "To calculate a discount, multiply the original price by the discount percentage divided by 100 to get the savings amount. Then subtract this savings from the original price to get the final price. For example, a 20% discount on ₹1,000 saves ₹200 (1,000 × 0.20 = 200), resulting in a final price of ₹800.",
  },
  {
    question: "How does a \"50% + 20% off\" stacked discount work?",
    answer:
      "Stacked discounts are applied sequentially, not added together. In a '50% + 20% off' deal on a ₹1,000 item: first, 50% is deducted, bringing the price to ₹500. Then, the extra 20% is applied to the new price of ₹500, deducting another ₹100. The final price is ₹400, meaning you saved ₹600. This equals an effective 60% total discount, not 70%.",
  },
  {
    question: "How do I find the discount percentage if I know the sale price?",
    answer:
      "Subtract the sale price from the original price to find the money saved. Then, divide the savings by the original price and multiply by 100. For instance, if an item with an original price of ₹1,000 is on sale for ₹750, you save ₹250. Dividing ₹250 by ₹1,000 gives 0.25, which corresponds to a 25% discount.",
  },
  {
    question: "Why does this calculator format numbers in the Indian numbering system?",
    answer:
      "In India, numbers follow the Lakh (1,00,000) and Crore (1,00,00,000) system where the first grouping is after 3 digits, followed by sets of 2 digits. This calculator automatically formats prices in the Indian style (en-IN) so shoppers and store owners in India can easily read and verify prices.",
  },
];

export default function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-16 pt-10 border-t border-white/[0.08]" aria-labelledby="faq-heading">
      {/* FAQ Schema for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-[#FFD60A]" />
        <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <article
            key={idx}
            className="rounded-xl bg-[#0a0a0a] border border-white/[0.06] p-5 transition-all hover:border-white/10"
          >
            <h3 className="text-base font-semibold text-white mb-2">
              {faq.question}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
