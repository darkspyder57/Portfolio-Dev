// ═══════════════════════════════════════════════════════════════
// Shared experience data — single source of truth
// Used by ExperienceSection (timeline) and ResumeViewer (CV)
// ═══════════════════════════════════════════════════════════════

export interface ExperienceItem {
  title: string;
  label: string;
  labelColor: string;
  period: string;
  description: string;
  tags: string[];
  /** Tailwind background-color class for the timeline dot */
  dotColor: string;
  /** Tailwind shadow or border class for the timeline dot */
  dotShadow: string;
  /** Type of entry: work experience or education */
  type: "work" | "education";
  /** Organization or Company Name */
  company: string;
  /** Job location (e.g. "Bhubaneswar", "Remote", etc.) */
  location?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Software Development Engineer and Instructor",
    label: "Nxtwave Disruptive Technologies [CURRENT ROLE]",
    labelColor: "text-aurora-cyan",
    period: "2025 - Present",
    description:
      "Building scalable applications and delivering engaging technical instruction. Empowering students with practical software engineering skills through real-world projects, modern development practices, and hands-on learning.",
    tags: ["System Design", "AI Integration", "Technical Mentorship"],
    dotColor: "bg-aurora-cyan",
    dotShadow: "shadow-[0_0_15px_rgba(0,255,194,0.5)]",
    type: "work",
    company: "Nxtwave Disruptive Technologies",
    location: "Bhubaneswar",
  },
  {
    title: "Full-Stack Developer",
    label: "Alphanome.AI [PREVIOUS ROLE]",
    labelColor: "text-aurora-violet",
    period: "2024 - 2025",
    description:
      "Contributed to the development of modern web applications by building responsive frontend interfaces with React.js and developing scalable backend services using Django and FastAPI. Designed and integrated RESTful APIs, implemented authentication systems, managed database interactions, and collaborated across the full development lifecycle. Explored AI-powered frontend solutions with Reflex.dev while continuously adopting new technologies to deliver efficient and high-quality software.",
    tags: [],
    dotColor: "bg-aurora-violet",
    dotShadow: "border-2 border-surface",
    type: "work",
    company: "Alphanome.AI",
    location: "Remote",
  },
  {
    title: "Frontend Developer",
    label: "Ideation People Solutions [PREVIOUS ROLE]",
    labelColor: "text-aurora-red",
    period: "2024",
    description:
      "Contributed to the development and maintenance of a Next.js-based admin platform by building reusable UI components and implementing secure authentication using Firebase Authentication. Developed advanced protected routing for administrative access, leveraged Server-Side Rendering (SSR) and modern client/server components, and enhanced dashboard functionality through feature updates, CMS improvements, and blog management. Collaborated closely with the team, resolved cross-browser compatibility issues, and ensured a reliable and scalable user experience.",
    tags: [],
    dotColor: "bg-aurora-red",
    dotShadow: "shadow-[0_0_15px_rgba(0,212,255,0.5)]",
    type: "work",
    company: "Ideation People Solutions",
    location: "Bhubaneswar",
  },
  {
    title: "Student",
    label: "Centurion University of Technology and Management [Education]",
    labelColor: "text-aurora-yellow",
    period: "2020 - 2024",
    description:
      "Pursued a Bachelor's degree in Computer Science & Engineering, building a strong foundation in software development, data structures, algorithms, operating systems, databases, computer networks, and object-oriented programming. Alongside academics, I explored modern web technologies, artificial intelligence, and full-stack development through hands-on projects and continuous self-learning.",
    tags: [],
    dotColor: "bg-aurora-yellow",
    dotShadow: "border-2 border-surface",
    type: "education",
    company: "Centurion University of Technology and Management",
    location: "Odisha",
  },
];

/**
 * Helper to extract the company/org name from the label field.
 * e.g. "Alphanome.AI [PREVIOUS ROLE]" → "Alphanome.AI"
 */
export function getOrgName(label: string): string {
  const match = label.match(/^(.+?)\s*\[/);
  return match ? match[1].trim() : label;
}
