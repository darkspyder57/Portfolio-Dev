import RevealOnScroll from "./RevealOnScroll";
import GlassCard from "./GlassCard";

const CARDS = [
  {
    icon: "architecture",
    title: "Engineering Mindset",
    color: "text-aurora-blue",
    description:
      "Building robust, scalable architectures that form the backbone of high-performance applications. I approach code with a focus on maintainability, performance optimization, and elegant solutions to complex systemic challenges.",
    bullets: [
      "System Design & Architecture",
      "Performance Optimization",
      "Scalable Infrastructure",
    ],
    bulletColor: "text-aurora-blue",
    offsetClass: "",
  },
  {
    icon: "visibility",
    title: "Product Thinking",
    color: "text-aurora-violet",
    description:
      "Beyond the code, I design digital experiences that feel intuitive and luxurious. Translating complex technical capabilities into seamless, highly-polished user interfaces that drive engagement and delight.",
    bullets: [
      "High-Fidelity UI/UX",
      "AI-Driven Experiences",
      "Micro-Interactions",
    ],
    bulletColor: "text-aurora-violet",
    offsetClass: "mt-12 md:mt-24",
  },
];

export default function AboutSection() {
  return (
    <section
      className="px-5 md:px-[60px] max-w-[1200px] mx-auto w-full"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
        {CARDS.map((card, i) => (
          <RevealOnScroll key={card.title} delay={i + 1}>
            <GlassCard
              className={`p-8 md:p-12 lg:p-16 rounded-3xl ${card.offsetClass}`}
            >
              <div className="mb-8">
                <span
                  className={`material-symbols-outlined text-4xl ${card.color} mb-4 block`}
                >
                  {card.icon}
                </span>
                <h3 className="font-sans text-3xl md:text-4xl font-bold text-on-surface mb-4 tracking-tight">
                  {card.title}
                </h3>
              </div>
              <p className="font-sans text-on-surface-variant leading-relaxed text-lg mb-8">
                {card.description}
              </p>
              <ul className="space-y-4 font-mono text-sm text-on-surface-variant">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className={card.bulletColor}>→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
