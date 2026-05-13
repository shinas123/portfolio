export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  year: string;
  status: "Live" | "In launch" | "Archived";
  links: { label: string; href: string }[];
  accent: string;
  image: string | null;
  imageAccent: string;
};

export const projects: Project[] = [
  {
    id: "topstocx",
    index: "01",
    title: "TopStocx",
    subtitle: "Algorithmic trading platform",
    description:
      "Solo-built multi-asset trading platform. TradingView Advanced Charts wired to the Leverate broker API, /chart Supercharts page with per-user state in Supabase, Three.js particle hero, and an AI assistant on Claude API.",
    stack: ["Next.js", "Vite", "Supabase", "TradingView", "Three.js", "Claude API"],
    year: "2026",
    status: "Live",
    links: [
      { label: "Live site", href: "https://topstocx.com" },
      { label: "Case study", href: "https://github.com/shinas123/topstocx-trading-platform" },
    ],
    accent: "from-blue-500/30 via-cyan-500/10 to-transparent",
    image: "/projects/topstocx.png",
    imageAccent: "from-blue-500 to-cyan-400",
  },
  {
    id: "wsjr-school",
    index: "02",
    title: "Wall Street Jr. Academy",
    subtitle: "Multi-school education platform",
    description:
      "Dubai's first multidisciplinary academy — four schools (Finance, AI, Design, Business) under one unified pedagogy. Built on Next.js 14, Supabase, and Vercel. Stripe payments, Mux video hosting, and Supabase Auth integrating now.",
    stack: ["Next.js 14", "Supabase", "Stripe", "Mux", "Claude API", "n8n"],
    year: "2026",
    status: "In launch",
    links: [
      { label: "Live site", href: "https://wsjrschool.com" },
      { label: "Case study", href: "https://github.com/shinas123/wsjr-school" },
    ],
    accent: "from-amber-500/30 via-rose-500/10 to-transparent",
    image: "/projects/wsjr-school.png",
    imageAccent: "from-amber-500 to-rose-400",
  },
  {
    id: "mcp",
    index: "03",
    title: "Marketing Analytics MCP",
    subtitle: "Model Context Protocol server",
    description:
      "Production MCP server giving Claude direct access to Meta Ads + GA4. Six tools for campaign insights, ROAS analysis, and traffic reports. Ships a scheduled weekly + monthly auto-PDF pipeline that emails branded reports to leadership.",
    stack: ["Python", "FastMCP", "Meta Marketing API", "GA4 Data API", "ReportLab"],
    year: "2026",
    status: "Live",
    links: [{ label: "GitHub", href: "https://github.com/shinas123/Marketing-analytics-mcp" }],
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    image: null,
    imageAccent: "from-violet-500 to-fuchsia-400",
  },
  {
    id: "ig-dm",
    index: "04",
    title: "Instagram DM Automation",
    subtitle: "Stateful conversational lead capture",
    description:
      "n8n workflow that turns an Instagram account into an always-on lead funnel. Meta Graph API webhook ingests four event types into a multi-turn DM conversation (name → phone → email → thank you), then ships qualified leads to Sheets + Slack.",
    stack: ["n8n", "Meta Graph API", "Google Sheets", "Slack", "JavaScript"],
    year: "2026",
    status: "Live",
    links: [{ label: "GitHub", href: "https://github.com/shinas123/Instagram-DM-automation" }],
    accent: "from-pink-500/30 via-orange-500/10 to-transparent",
    image: "/projects/ig-dm.png",
    imageAccent: "from-pink-500 to-orange-400",
  },
  {
    id: "petloom",
    index: "05",
    title: "PetLoom Official",
    subtitle: "Dropshipping store · Shopify",
    description:
      "End-to-end Shopify store for pet supplies. CJ Dropshipping for product sourcing + fulfilment, Stripe for international payments, Wyoming LLC banking. Built the funnel, product pages, ad creative, and the lead-to-CRM pipeline.",
    stack: ["Shopify", "Stripe", "CJ Dropshipping", "Meta Ads"],
    year: "2023–2024",
    status: "Archived",
    links: [],
    accent: "from-emerald-500/25 via-teal-500/10 to-transparent",
    image: null,
    imageAccent: "from-emerald-500 to-teal-400",
  },
  {
    id: "lakshmi",
    index: "06",
    title: "Lakshmi Herbals",
    subtitle: "Hair-oil e-commerce · Freelance",
    description:
      "Two-product DTC Shopify store for a hair-care brand. Custom storefront design, Razorpay payment gateway for India, optimised product pages, and SEO foundations. +30% organic traffic and +25% conversions over the engagement.",
    stack: ["Shopify", "Razorpay", "SEO", "Conversion design"],
    year: "2023",
    status: "Archived",
    links: [],
    accent: "from-yellow-500/25 via-amber-500/10 to-transparent",
    image: null,
    imageAccent: "from-yellow-500 to-amber-400",
  },
];
