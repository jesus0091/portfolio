export type LinkOut = {
  type: "behance" | "github" | "website";
  href: string;
  label: string;
};

export type Work = {
  id: string;
  index: string;
  category: string;
  title: string;
  productName: string;
  role: string;
  description: string;
  cover: string;
  technologies: string[];
  integrations?: string[];
  tools: string[];
  links?: LinkOut[];
  year: string;
};

export const WORKS: Work[] = [
  {
    id: "mtc-fe",
    index: "01",
    category: "Frontend Dev",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "FrontEnd Developer",
    year: "2023",
    description:
      "Development of a SaaS platform focused on employee engagement. Built and maintained complex feature workflows, reusable component library, and contributed to the platform's design system implementation in code. Worked in a collaborative Agile team shipping production features weekly.",
    cover: "/images/mtc-dev.png",
    technologies: ["ReactJS", "NextJS", "TypeScript", "TailwindCSS", "StyledComponents"],
    integrations: ["REST API", "Auth0", "Intercom", "Mixpanel"],
    tools: ["Figma", "Git", "Jira", "Vercel"],
    links: [{ type: "github", href: "#", label: "GitHub" }],
  },
  {
    id: "mtc-ux",
    index: "02",
    category: "UX/UI Design",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "UX/UI Designer",
    year: "2023",
    description:
      "End-to-end UX/UI design for a SaaS platform that enhances employee engagement. Led design for onboarding flows, dashboard redesign, and the full component design system. Delivered wireframes, interactive prototypes, and production-ready specs.",
    cover: "/images/mtc-design.png",
    technologies: ["Figma", "Design System", "Prototyping", "UX Research"],
    integrations: [],
    tools: ["Figma", "FigJam", "Notion", "Loom"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "ristario",
    index: "03",
    category: "Design & Development",
    title: "Website Design & Development",
    productName: "Ristario",
    role: "Designer & Developer",
    year: "2024",
    description:
      "Full ownership of Ristario's digital presence from concept to production. Designed the brand identity, UI system, and all visual assets, then implemented the full website in Next.js. Shipped as a single handoff-free project.",
    cover: "/images/linkedin.png",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "ReactJS"],
    integrations: ["Vercel", "Google Analytics"],
    tools: ["Figma", "Git", "Vercel", "Photoshop"],
    links: [
      { type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" },
      { type: "github", href: "#", label: "GitHub" },
    ],
  },
  {
    id: "fundacion-pataro",
    index: "04",
    category: "UX/UI Design",
    title: "Foundation Website",
    productName: "Fundación Pataro",
    role: "UX/UI Designer",
    year: "2023",
    description:
      "Complete UX/UI design for Fundación Pataro's website. Conducted user research, accessibility audits, and built a visual identity that balances emotion with trustworthiness.",
    cover: "/images/Banner-10.png",
    technologies: ["Figma", "UI Design", "Accessibility", "Branding"],
    integrations: [],
    tools: ["Figma", "FigJam", "Notion"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "iacon",
    index: "05",
    category: "UX/UI Design",
    title: "Landing Page Redesign",
    productName: "IACON",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Redesign of IACON's corporate landing page with modern aesthetics and stronger brand positioning. Created new visual assets, a refreshed type system, and a component-based layout system in Figma.",
    cover: "/images/iacon.png",
    technologies: ["Figma", "Design System", "Branding"],
    integrations: [],
    tools: ["Figma", "FigJam", "Illustrator"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "psy-app",
    index: "06",
    category: "UX/UI Design",
    title: "Mobile App — iOS",
    productName: "Academic Project",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Full Design Thinking process applied to an iOS application for psychologists. From discovery interviews and empathy maps to wireframes, high-fidelity prototypes, and usability testing.",
    cover: "/images/therapia.png",
    technologies: ["Figma", "iOS Design", "Design System", "Prototyping"],
    integrations: [],
    tools: ["Figma", "FigJam", "Maze"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "smart-factory",
    index: "07",
    category: "UX/UI Design",
    title: "Industrial Dashboard",
    productName: "Smart Factory",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Data-first dashboard design for factory floor operators to monitor production machinery in real time. Designed for high-density information display with a focus on clarity under stress conditions.",
    cover: "/images/smart-f.png",
    technologies: ["Figma", "Dashboard Design", "Data Viz", "Design System"],
    integrations: [],
    tools: ["Figma", "FigJam"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "cc-webapp",
    index: "08",
    category: "UX/UI Design",
    title: "Web Application",
    productName: "Omnipad",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Task management web app for call center teams. Designed end-to-end flows for scheduling, tracking, and managing client calls, validated with real call center agents before handoff.",
    cover: "/images/omnipad.png",
    technologies: ["Figma", "UI Design", "Prototyping", "UX Research"],
    integrations: [],
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
];

export function getWorkById(id: string): Work | undefined {
  return WORKS.find((w) => w.id === id);
}
