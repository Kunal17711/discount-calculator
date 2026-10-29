# Discount Calculator 🏷️

A sleek, minimal, and lightning-fast single-page **Discount Calculator** built with **Next.js (App Router)** and **Tailwind CSS**. Designed with a pure black aesthetic (`#000`), subtle borders, soft white glows, and a warm yellow (`#FFD60A`) accent.

Created by **Kunal Builds** — 100% free and open source.

🌐 **Live Tool:** [websitebykunalbuilds.vercel.app](https://websitebykunalbuilds.vercel.app)  
📸 **Instagram:** [@bykunalbuilds](https://instagram.com/bykunalbuilds)  
📂 **GitHub:** [Kunal17711/discount-calculator](https://github.com/Kunal17711/discount-calculator)

---

## ✨ Features

- **Live Calculations (No Button Required):** Calculates instant results as you type.
- **Double / Stacked Discounts:** Easily calculate deals like *"50% + 20% off"* accurately (shows **60%**, not 70%).
- **Step-by-Step Breakdown:** Transparent explanation showing price after the first discount, then after the second discount.
- **Find the Discount % (Reverse Calculator):** Enter Original Price and Sale Price to discover the discount percentage and amount saved.
- **Quick Preset Chips:** One-click shortcuts for common discounts (`10%`, `20%`, `30%`, `50%`, `70%`).
- **One-Click Copy Result:** Formats and copies a clean text breakdown directly to your clipboard.
- **Indian Numbering Formatting:** Automatically formats values in Indian style (e.g. `₹1,00,000`).
- **Input Validation:** Restricts negative numbers, limits discounts to 100%, and handles blank values gracefully without errors.
- **SEO & Search Optimized:** Full OpenGraph tags, semantic HTML, dynamic `sitemap.xml`, `robots.txt`, and Google FAQPage Schema JSON-LD.
- **Monetization Ready:** Includes `<head>` placeholder snippet and responsive ad slot for Google AdSense, plus compliant **Privacy Policy** and **About** pages.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Deployment:** Deploy-ready for [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Kunal17711/discount-calculator.git
cd discount-calculator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🧮 How the Calculations Work

### 1. Stacked Discount Formula
When a store offers a primary discount $d_1\%$ and an extra discount $d_2\%$ on an original price $P$:
1. **Price after first discount:**
   $$P_1 = P \times \left(1 - \frac{d_1}{100}\right)$$
2. **Final price after extra discount:**
   $$P_2 = P_1 \times \left(1 - \frac{d_2}{100}\right) = P \times \left(1 - \frac{d_1}{100}\right) \times \left(1 - \frac{d_2}{100}\right)$$
3. **Effective Total Discount %:**
   $$\text{Effective } \% = \left[1 - \left(1 - \frac{d_1}{100}\right) \times \left(1 - \frac{d_2}{100}\right)\right] \times 100$$

*Example:* On a ₹1,000 item with 50% + 20% off:
- After 50%: ₹500
- After extra 20% on ₹500: ₹400
- Total saved: ₹600 (**60% effective discount**, not 70%).

### 2. Reverse Discount Formula
When original price $P$ and sale price $S$ are known:
$$\text{Discount } \% = \left(\frac{P - S}{P}\right) \times 100$$
$$\text{You Save} = P - S$$

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Built with ❤️ by [Kunal Builds](https://websitebykunalbuilds.vercel.app).
