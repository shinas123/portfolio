export type Project = {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  year: string;
  era: "current" | "earlier";
  status: "Live" | "In launch" | "Archived" | "Internal";
  links: { label: string; href: string }[];
  accent: string;
  image: string | null;
  imageAccent: string;
  caseStudy: {
    role: string;
    duration: string;
    problem: string;
    solution: string;
    decisions: { label: string; detail: string }[];
    results: { label: string; value: string; sub?: string }[];
  };
};

export const projects: Project[] = [
  {
    id: "topstocx",
    slug: "topstocx",
    index: "01",
    title: "TopStocx",
    subtitle: "Algorithmic trading platform",
    description:
      "Solo-built multi-asset trading platform. TradingView Advanced Charts wired to the Leverate broker API, /chart Supercharts page with per-user state in Supabase, Three.js particle hero, and an AI trading assistant on Claude API.",
    stack: ["Next.js", "Vite", "Supabase", "TradingView", "Three.js", "Claude API"],
    year: "2026",
    era: "current",
    status: "Live",
    links: [
      { label: "Live site", href: "https://topstocx.com" },
      { label: "GitHub", href: "https://github.com/shinas123/topstocx-trading-platform" },
    ],
    accent: "from-blue-500/30 via-cyan-500/10 to-transparent",
    image: "/projects/topstocx.png",
    imageAccent: "from-blue-500 to-cyan-400",
    caseStudy: {
      role: "Sole engineer · Wall Street Jr Investments",
      duration: "Feb 2026 — ongoing",
      problem:
        "Wall Street Jr needed an institutional-grade retail trading platform for the GCC and Indian retail-investor market. The category leaders — TradingView, eToro, Plus500 — have 80+ DR, decades of content, and engineering teams of 50+. Could a solo engineer ship a credible competitor in months, not years?",
      solution:
        "Use agentic AI tooling (Claude Code, Google Antigravity) to collapse a normal small-team build into one engineer's velocity. Integrate the best-in-class components rather than rebuild them: TradingView Advanced Charts widget for charting, Leverate broker API for tick data and order routing, Supabase for auth + per-user state with Row-Level Security, Claude API for the in-platform AI assistant. Differentiate on AI + copy trading + market intelligence — not on chart sophistication.",
      decisions: [
        {
          label: "TradingView widget vs custom charts",
          detail:
            "Building parity with TradingView (250+ indicators, every drawing tool, multi-timeframe sync) would have taken 12–18 months and still been worse. The widget integrates with our data feed and our auth, so we got world-class charts on day 1 and spent build time on the differentiators.",
        },
        {
          label: "Supabase over Firebase",
          detail:
            "Real Postgres + Row-Level Security. RLS pushes per-user authorisation logic into the database itself, so a bug in app code can't accidentally show user A's watchlist to user B. With Firebase we'd have written the same check repeatedly across every query — and missed it sometimes.",
        },
        {
          label: "Next.js + Vite split",
          detail:
            "Marketing pages need SEO and fast first paint — that's Next.js with SSR. The /chart trading app is a logged-in SPA with a heavy chart widget and websocket feeds — it doesn't benefit from SSR and Vite's HMR is dramatically faster for the build loop. Two app folders, one Vercel project, sub-routing handles the rest.",
        },
      ],
      results: [
        { label: "Live", value: "topstocx.com" },
        { label: "Markets", value: "50+", sub: "Global exchanges" },
        { label: "Instruments", value: "100M+" },
        { label: "Data points / sec", value: "2.4M" },
      ],
    },
  },
  {
    id: "wsjr-school",
    slug: "wsjr-school",
    index: "02",
    title: "Wall Street Jr. Academy",
    subtitle: "Multi-school education platform",
    description:
      "Dubai's first multidisciplinary academy — four schools (Finance, AI, Design, Business) under one unified pedagogy. Built on Next.js 14, Supabase, and Vercel. Stripe payments, Mux video hosting, and Supabase Auth integrating now.",
    stack: ["Next.js 14", "Supabase", "Stripe", "Mux", "Claude API", "n8n"],
    year: "2026",
    era: "current",
    status: "In launch",
    links: [
      { label: "Live site", href: "https://wsjrschool.com" },
      { label: "GitHub", href: "https://github.com/shinas123/wsjr-school" },
    ],
    accent: "from-amber-500/30 via-rose-500/10 to-transparent",
    image: "/projects/wsjr-school.png",
    imageAccent: "from-amber-500 to-rose-400",
    caseStudy: {
      role: "Sole engineer · Wall Street Jr Investments",
      duration: "Feb 2026 — ongoing (launch phase)",
      problem:
        "Wall Street Jr wanted to launch Dubai's first multidisciplinary online academy — finance, AI, design, and business under one brand, with cohort-based delivery and an AI-powered academy advisor. The market is owned by Udemy, Coursera, and Wall Street Prep. The fix: position by intent ('multidisciplinary, mentor-led, Dubai-grounded'), not by topic.",
      solution:
        "Built on Next.js 14 (App Router) for SSR + SEO, Supabase for course catalog and per-user enrollment state, Vercel edge for global delivery. Integrated a Claude-powered academy advisor ('ATLAS') sitting on every page that captures leads through a multi-turn conversation, then ships them to Google Sheets + Slack via n8n. Stripe payments, Mux video hosting, and Supabase Auth all wired now.",
      decisions: [
        {
          label: "Next.js App Router (vs Pages or SPA)",
          detail:
            "Marketing pages are the SEO surface. Server Components render course catalog and school pages fully indexed; Client Components only where interactivity is needed (cart, ATLAS chat, dashboard). Pages Router would have meant getServerSideProps per dynamic page; a SPA would have meant client-rendered HTML for indexing-critical pages.",
        },
        {
          label: "Stripe for payments",
          detail:
            "Already supports MENA (Tax + AED). Built-in coupon logic. Webhook-driven enrollment fits cleanly with Supabase Edge Functions. The alternative (Tap, Network International) would have been faster local checkout for UAE residents but worse global support — and the audience is half Indian + GCC, so Stripe wins on geographic coverage.",
        },
        {
          label: "Mux for video (over self-hosted or YouTube)",
          detail:
            "Self-hosted = encoding pipeline + storage + CDN = engineering tax. YouTube = no per-user gating, embeds break the brand, unlisted is not actually private. Mux = signed playback URLs scoped per user + per cohort, automatic captions, encoding handled.",
        },
      ],
      results: [
        { label: "Live", value: "wsjrschool.com" },
        { label: "Schools", value: "4", sub: "Finance · AI · Design · Business" },
        { label: "Target learners", value: "5,000+" },
        { label: "AI surfaces", value: "3", sub: "ATLAS · curriculum · lead routing" },
      ],
    },
  },
  {
    id: "mcp",
    slug: "marketing-analytics-mcp",
    index: "03",
    title: "Marketing Analytics MCP",
    subtitle: "Model Context Protocol server",
    description:
      "Production MCP server giving Claude direct access to Meta Ads + GA4. Six tools for campaign insights, ROAS analysis, and traffic reports. Scheduled weekly + monthly auto-PDF reporting pipeline that emails performance digests to leadership.",
    stack: ["Python", "FastMCP", "Meta Marketing API", "GA4 Data API", "ReportLab"],
    year: "2026",
    era: "current",
    status: "Live",
    links: [{ label: "GitHub", href: "https://github.com/shinas123/Marketing-analytics-mcp" }],
    accent: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    image: null,
    imageAccent: "from-violet-500 to-fuchsia-400",
    caseStudy: {
      role: "Sole engineer · Wall Street Jr Investments",
      duration: "Apr 2026 — ongoing",
      problem:
        "Weekly + monthly Meta Ads + GA4 reports for leadership were manual — log in to each dashboard, screenshot the right cards, paste into a deck, send. Hours of work, error-prone, never on time. The natural Claude question — 'how did our top-of-funnel campaigns do last week vs prior?' — couldn't be answered without that manual loop.",
      solution:
        "Built a custom Python Model Context Protocol (MCP) server that exposes Meta Marketing API + GA4 Data API as six tools Claude can call directly: list accounts, list campaigns, campaign insights (with breakdowns), GA4 run-report, GA4 realtime, and combined Meta+GA4 ROAS summary. Plus a scheduled PDF reporting pipeline (`report_generator.py`) that runs every Monday 08:00 and 1st of each month 08:00, generates a branded multi-page PDF, and emails it to leadership via Gmail SMTP.",
      decisions: [
        {
          label: "MCP server vs raw API integration",
          detail:
            "MCP lets the same server work across Claude Desktop, Claude Code, and any future MCP-aware client. It's reusable across multiple sites/accounts (every tool takes account_id/property_id as parameters). Building this as an MCP is dramatically more future-proof than baking the API calls into one application.",
        },
        {
          label: "GA4 via ADC instead of service account JSON",
          detail:
            "Application Default Credentials means no JSON keys to manage, rotate, or accidentally commit. One `gcloud auth application-default login` and the server reads any GA4 property the authenticated user has Viewer access to.",
        },
        {
          label: "Scheduled tasks instead of cron / external scheduler",
          detail:
            "Windows Task Scheduler with 'start when available' enabled — if the PC is off at 08:00, the task runs as soon as it's next on. No cloud cron service needed for v1. Cheap, reliable, easy to inspect with schtasks /Query.",
        },
      ],
      results: [
        { label: "Tools exposed", value: "6" },
        { label: "Reports / month", value: "5", sub: "4 weekly + 1 monthly" },
        { label: "Manual work eliminated", value: "100%" },
        { label: "Public on GitHub", value: "MIT" },
      ],
    },
  },
  {
    id: "ig-dm",
    slug: "instagram-dm-automation",
    index: "04",
    title: "Instagram DM Automation",
    subtitle: "Stateful conversational lead capture",
    description:
      "n8n workflow that turns an Instagram account into an always-on lead funnel. Meta Graph API webhook ingests four event types into a multi-turn DM conversation (name → phone → email → thank you), then ships qualified leads to Sheets + Slack.",
    stack: ["n8n", "Meta Graph API", "Google Sheets", "Slack", "JavaScript"],
    year: "2026",
    era: "current",
    status: "Live",
    links: [{ label: "GitHub", href: "https://github.com/shinas123/Instagram-DM-automation" }],
    accent: "from-pink-500/30 via-orange-500/10 to-transparent",
    image: "/projects/ig-dm.png",
    imageAccent: "from-pink-500 to-orange-400",
    caseStudy: {
      role: "Sole engineer · Wall Street Jr Investments",
      duration: "Apr 2026 — ongoing",
      problem:
        "The CEO's personal-brand Instagram was generating qualified inbound — DMs, ad-form leads, comment intent — but the team was missing replies for hours during the day and entirely overnight. By the time someone got to a hot lead, the visitor had already moved on. Conversion was leaking.",
      solution:
        "Built an n8n workflow on a Meta Graph API webhook that ingests four event types (new follower, DM, post comment, Meta Ad lead) and routes each into a stateful multi-turn conversation. Per-user state (waiting_name → waiting_phone → waiting_email → complete) lives in n8n's static data, keyed by Instagram sender ID. Each stage validates input (phone regex, email regex) before advancing. On complete, the qualified lead lands in Google Sheets and Slack pings the sales team.",
      decisions: [
        {
          label: "Stateful per-user conversation, not one-shot",
          detail:
            "Most Instagram automations are one-message blasts. The leap was treating each conversation as state — track which question the user is on, validate their reply, advance them. This is what turns DM automation from spam to a real lead-capture funnel.",
        },
        {
          label: "n8n static data over external DB for state",
          detail:
            "For medium volume, `$getWorkflowStaticData('global')` is dramatically simpler than wiring Supabase or Redis. Trade-off documented in the README: doesn't survive workflow restructure, so production at scale would externalise to Postgres. Right call for v1.",
        },
        {
          label: "Same pattern reused inside WSJR Academy's ATLAS",
          detail:
            "Once the multi-turn pattern worked, I lifted the architecture into the WSJR School ATLAS advisor. One battle-tested flow, two production surfaces. Reuse is leverage.",
        },
      ],
      results: [
        { label: "Manual DM handling", value: "0%", sub: "Fully replaced" },
        { label: "Event types handled", value: "4" },
        { label: "Conversation stages", value: "4", sub: "Name → Phone → Email → Thanks" },
        { label: "Public on GitHub", value: "MIT" },
      ],
    },
  },
  {
    id: "obsidian-graph",
    slug: "wsjr-knowledge-graph",
    index: "05",
    title: "WSJR Knowledge Graph",
    subtitle: "Internal ops wiki · Obsidian",
    description:
      "Structured Obsidian knowledge graph as the company's internal ops wiki — covering 3 group entities (WSJ Investments, TopStocx, WSJR School), shared infrastructure, an AI agent registry, and operational runbooks. Replaced ad-hoc Google Docs with a queryable knowledge layer.",
    stack: ["Obsidian", "Markdown", "MCP server", "Custom indexing"],
    year: "2026",
    era: "current",
    status: "Internal",
    links: [],
    accent: "from-teal-500/25 via-emerald-500/10 to-transparent",
    image: null,
    imageAccent: "from-teal-500 to-emerald-400",
    caseStudy: {
      role: "Sole architect · Wall Street Jr Investments",
      duration: "Mar 2026 — ongoing",
      problem:
        "Three group entities sharing one operational reality but no shared brain — onboarding docs, vendor contacts, deploy runbooks, AI agent prompts were scattered across Google Docs, Notion pages, WhatsApp screenshots, and people's heads. Anything that hadn't been written down in the last week was effectively lost.",
      solution:
        "Built a structured Obsidian vault with a top-level WSJR/ folder containing: per-entity sub-folders (Investments, TopStocx, School), shared infrastructure docs (DNS, hosting, payment processing), AI agent registry (every Claude/Manu/ATLAS prompt with versioning), and operational runbooks (incident response, lead handling, content workflow). Wired in a custom MCP wiki-lint tool that runs monthly to find orphan pages, dead wikilinks, and stale claims — keeps the graph clean as it grows.",
      decisions: [
        {
          label: "Obsidian over Notion",
          detail:
            "Local files, plain markdown, no vendor lock-in. The vault is just a folder — exportable, version-controllable, and Claude can read it directly via the obsidian-vault MCP. Notion's database features would have been nice, but the lock-in cost is too high for an ops wiki.",
        },
        {
          label: "Top-level entity foldering",
          detail:
            "WSJR/<entity>/ instead of mixing everything. Permissions naturally follow folders: someone working only on TopStocx doesn't need access to the Investments wing. Cleaner mental model, cleaner future ACLs.",
        },
        {
          label: "Monthly auto-lint",
          detail:
            "Knowledge graphs decay. A wiki-lint script runs on the 1st of each month, checks for orphans + broken links + stale dates, and emails me the report. Same pattern as the marketing-analytics MCP — scheduled, autonomous, no manual ops.",
        },
      ],
      results: [
        { label: "Group entities", value: "3", sub: "Investments · TopStocx · School" },
        { label: "AI agents registered", value: "5+", sub: "Manu · ATLAS · Claude · …" },
        { label: "Runbooks", value: "10+" },
        { label: "Auto-lint", value: "Monthly" },
      ],
    },
  },
  {
    id: "nara",
    slug: "nara-properties",
    index: "06",
    title: "Nara Properties + BHB Centre",
    subtitle: "Two production sites · 2-month engagement",
    description:
      "Property-listing site (naraproperties.co · WordPress) and a separate business site (bhbcentre.com · Lovable AI) for a Dubai real-estate firm, with a shared n8n automation pipeline routing leads from website forms straight into the CRM with zero manual handling.",
    stack: ["WordPress", "Lovable AI", "n8n", "Meta Ads"],
    year: "2025–2026",
    era: "current",
    status: "Live",
    links: [
      { label: "naraproperties.co", href: "https://naraproperties.co" },
      { label: "bhbcentre.com", href: "https://bhbcentre.com" },
    ],
    accent: "from-rose-500/25 via-orange-500/10 to-transparent",
    image: null,
    imageAccent: "from-rose-500 to-orange-400",
    caseStudy: {
      role: "Digital Marketing & Media Executive",
      duration: "Dec 2025 — Feb 2026",
      problem:
        "Nara Properties — a Dubai real estate firm — needed two production websites delivered in a 2-month window: a polished property-listing storefront for end customers, and a separate corporate site for their parent business (BHB Centre). Lead flow needed to land directly in the CRM, not in someone's inbox.",
      solution:
        "Built naraproperties.co on WordPress with a custom property-listing structure, mobile-first design, and an SEO-ready foundation. Built bhbcentre.com using Lovable AI for rapid AI-assisted delivery within the timeline. Wired both into a single n8n automation pipeline that captures website form submissions, qualifies them, and pushes them to the CRM with full timestamping and attribution. Designed the Meta + Google Ads strategy for property lead generation.",
      decisions: [
        {
          label: "Different stacks per site",
          detail:
            "WordPress for the listing site (better real-estate plugin ecosystem, easier handover to a non-technical team), Lovable AI for the corporate site (fastest path to a polished design-led page). Right tool per job, not one stack imposed on both.",
        },
        {
          label: "Shared n8n pipeline, two webhooks",
          detail:
            "Both sites POST to different paths on the same n8n instance. One workflow normalises form data, deduplicates by email, attaches source metadata, and routes to the CRM. Maintenance happens in one place.",
        },
        {
          label: "Meta + Google Ads strategy before launch",
          detail:
            "Audience targeting, ad creative direction, and campaign structure were designed alongside the site build — not bolted on after. Conversion-tracking pixels were live on day one of launch.",
        },
      ],
      results: [
        { label: "Sites delivered", value: "2" },
        { label: "Timeline", value: "2 months" },
        { label: "Manual lead handling", value: "0%" },
        { label: "Ads strategy", value: "Designed + presented" },
      ],
    },
  },
  // ─── Earlier work ─────────────────────────────────────────────────────────────
  {
    id: "petloom",
    slug: "petloom",
    index: "07",
    title: "PetLoom Official",
    subtitle: "Dropshipping store · Shopify",
    description:
      "End-to-end Shopify store for pet supplies. CJ Dropshipping for product sourcing + fulfilment, Stripe for international payments, Wyoming LLC banking. Built the funnel, product pages, ad creative, and the lead-to-CRM pipeline.",
    stack: ["Shopify", "Stripe", "CJ Dropshipping", "Meta Ads"],
    year: "2023–2024",
    era: "earlier",
    status: "Archived",
    links: [],
    accent: "from-emerald-500/25 via-teal-500/10 to-transparent",
    image: null,
    imageAccent: "from-emerald-500 to-teal-400",
    caseStudy: {
      role: "Solo operator",
      duration: "2023 — 2024",
      problem:
        "Wanted to learn the full e-commerce + paid-media + ops loop hands-on, not theoretically. Picked a pet-supplies niche with high impulse purchase rates and used a dropshipping model to bypass inventory risk.",
      solution:
        "Built PetLoomOfficial.com on Shopify with a polished product catalog, CJ Dropshipping integration for sourcing and fulfilment, Stripe for international payment acceptance, and a Wyoming LLC for the banking layer. Ran Meta Ads campaigns targeting pet owners in the US, with ad creative cycled weekly based on Meta's performance data.",
      decisions: [
        { label: "Wyoming LLC", detail: "No state income tax, low fees, fast formation — standard for non-US dropshippers needing US banking access." },
        { label: "CJ over AliExpress", detail: "Better fulfilment times, real product images, and a Shopify-native sync. AliExpress is cheaper per unit but the customer-experience cost shows up in reviews." },
        { label: "Stripe over PayPal", detail: "Lower friction for end customers; PayPal's dispute system is brutal for dropshippers." },
      ],
      results: [
        { label: "Channel", value: "Shopify + Meta Ads" },
        { label: "Geography", value: "US" },
        { label: "Status", value: "Archived 2024" },
        { label: "Lessons", value: "Full e-com loop owned" },
      ],
    },
  },
  {
    id: "lakshmi",
    slug: "lakshmi-herbals",
    index: "08",
    title: "Lakshmi Herbals",
    subtitle: "Hair-oil e-commerce · Freelance",
    description:
      "Two-product DTC Shopify store for a hair-care brand. Custom storefront design, Razorpay payment gateway for India, optimised product pages, and SEO foundations. +30% organic traffic and +25% conversions over the engagement.",
    stack: ["Shopify", "Razorpay", "SEO", "Conversion design"],
    year: "2023",
    era: "earlier",
    status: "Archived",
    links: [],
    accent: "from-yellow-500/25 via-amber-500/10 to-transparent",
    image: null,
    imageAccent: "from-yellow-500 to-amber-400",
    caseStudy: {
      role: "Freelance designer + marketer",
      duration: "2023",
      problem:
        "A small Indian hair-care brand with two SKUs needed a DTC storefront, payment processing for India, and the SEO foundations to grow organic traffic without a paid budget.",
      solution:
        "Built LakshmiHerbals.com on Shopify with a custom theme matched to the brand identity, Razorpay for Indian payment acceptance (UPI + cards + wallets), and on-page SEO covering metadata, schema, product copy, and image alt text. Tightened the product detail and checkout pages for conversion.",
      decisions: [
        { label: "Razorpay over Stripe", detail: "Stripe doesn't accept Indian merchants directly. Razorpay handles UPI, the dominant Indian payment rail." },
        { label: "Custom theme, not a template", detail: "Two SKUs means the storefront IS the brand. A template would have been faster but indistinguishable from a thousand other Shopify stores." },
        { label: "Organic-first, not paid", detail: "Budget didn't support paid ads. Built SEO from day one so traffic compounded without an ongoing spend." },
      ],
      results: [
        { label: "Organic traffic", value: "+30%" },
        { label: "Conversions", value: "+25%" },
        { label: "SKUs", value: "2" },
        { label: "Status", value: "Archived 2024" },
      ],
    },
  },
];

export const currentProjects = projects.filter((p) => p.era === "current");
export const earlierProjects = projects.filter((p) => p.era === "earlier");

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

// "Currently building" — short line shown in About section
export const currentlyBuilding =
  "Currently: extending TopStocx with AI portfolio analytics + a Blender MCP integration for 3D scene scripting.";

// Headline metrics — single source of truth for the stats strip + about meta
export const headlineMetrics: { value: string; label: string }[] = [
  { value: "2", label: "Production platforms shipped solo · 4 months" },
  { value: "30%+", label: "Organic visibility growth in 60 days" },
  { value: "70%", label: "Faster lead response via automation" },
  { value: "2×", label: "Ad engagement vs static creative" },
  { value: "60%", label: "Reduction in manual sales ops" },
];
