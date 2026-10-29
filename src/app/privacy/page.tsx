import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Discount Calculator",
  description:
    "Privacy policy for the Discount Calculator tool by Kunal Builds. Learn about how your data and cookies are handled.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Calculator</span>
      </Link>

      <div className="space-y-6">
        <header className="space-y-2 border-b border-white/[0.08] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-white/10 text-[#FFD60A] text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500">
            Last updated: October 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to <strong>Discount Calculator</strong> (available at{" "}
              <a
                href="https://websitebykunalbuilds.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD60A] hover:underline"
              >
                Kunal Builds
              </a>
              ). We value your privacy and are committed to protecting any personal data you may encounter while using our service. Because all calculations run entirely in your browser (client-side), we do not collect, store, or sell any of your financial or numerical input data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">2. Log Files</h2>
            <p>
              Like most website operators, our hosting provider (Vercel) automatically gathers standard log information. These logs include internet protocol (IP) addresses, browser type, internet service provider (ISP), date and time stamps, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information and are used solely for analyzing trends, administering the site, and ensuring server uptime and security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">3. Cookies and Web Beacons</h2>
            <p>
              Discount Calculator uses standard cookies to enhance user experience. Third-party vendors, including Google (via Google AdSense and Google Analytics), may use cookies to serve ads based on prior visits to this website or other websites on the internet.
            </p>
            <p>
              Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD60A] hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">4. Third-Party Advertisers (Google AdSense)</h2>
            <p>
              We may display third-party advertisements through Google AdSense. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Discount Calculator. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see.
            </p>
            <p>
              Discount Calculator has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">5. Children’s Information</h2>
            <p>
              Protecting children while using the internet is paramount. Discount Calculator does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-white">6. Consent & Contact</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, please reach out via Instagram at{" "}
              <a
                href="https://instagram.com/bykunalbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD60A] hover:underline"
              >
                @bykunalbuilds
              </a>{" "}
              or through our main portal at{" "}
              <a
                href="https://websitebykunalbuilds.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD60A] hover:underline"
              >
                websitebykunalbuilds.vercel.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
