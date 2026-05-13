export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  verifyUrl?: string;
  details?: string;
  accent: string; // tailwind gradient classes
};

export const certifications: Certification[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & Automation Specialisation",
    issuer: "Udemy · Anthropic Academy",
    date: "2025",
    details: "Agentic IDE workflows · Claude Code · MCP",
    accent: "from-violet-500/40 to-fuchsia-500/15",
    // image + verifyUrl coming once 4th cert image is delivered
  },
  {
    id: "google-marketing",
    title: "Google Digital Marketing & E-commerce",
    issuer: "Coursera · Google",
    date: "Mar 2025",
    image: "/certs/coursera-google.png",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/H3UBLF33OTWL",
    details: "7-course professional certificate",
    accent: "from-blue-500/40 to-cyan-500/15",
  },
  {
    id: "hubspot-inbound",
    title: "Inbound Marketing Certified",
    issuer: "HubSpot Academy",
    date: "Feb 2025",
    image: "/certs/hubspot-inbound.png",
    verifyUrl:
      "https://app.hubspot.com/academy/achievements/jnj1982n/en/1/shinas-ar/inbound-marketing",
    details: "Valid through Mar 2027",
    accent: "from-orange-500/40 to-rose-500/15",
  },
  {
    id: "udemy-marketing",
    title: "The Complete Digital Marketing Guide",
    issuer: "Udemy",
    date: "Feb 2025",
    image: "/certs/udemy-marketing.png",
    verifyUrl: "https://ude.my/UC-54c72f07-ea82-48a1-994d-77e83f2eabe9",
    details: "27 courses · 86.5 hours",
    accent: "from-purple-500/40 to-pink-500/15",
  },
  {
    id: "semrush-seo",
    title: "Semrush SEO Crash Course",
    issuer: "Semrush Academy",
    date: "2024",
    image: "/certs/semrush-seo.png",
    verifyUrl:
      "https://static.semrush.com/academy/certificates/232be5eddf/shinas-ar_2.pdf",
    details: "Technical · on-page · audits",
    accent: "from-emerald-500/40 to-teal-500/15",
  },
];
