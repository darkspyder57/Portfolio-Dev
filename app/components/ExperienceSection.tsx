import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import { EXPERIENCE } from "../data/experience";

export default function ExperienceSection() {
  return (
    <section
      className="px-5 md:px-[60px] max-w-4xl mx-auto w-full"
      id="experience"
    >
      <RevealOnScroll>
        <SectionHeading
          title="Professional Trajectory"
          subtitle="A proven track record of delivering high-impact solutions across complex domains."
        />
      </RevealOnScroll>

      <div className="relative border-l border-glass-border ml-4 md:ml-8 space-y-16 py-8">
        {EXPERIENCE.map((exp, i) => (
          <RevealOnScroll key={exp.title} delay={i + 1}>
            <div className="relative pl-8 md:pl-16">
              {/* Timeline dot */}
              <div
                className={`absolute w-4 h-4 rounded-full ${exp.dotColor} left-[-8.5px] top-8 ${exp.dotShadow}`}
              />

              <GlassCard className="p-6 md:p-10 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-on-surface">
                      {exp.title}
                    </h3>
                    <p
                      className={`font-mono text-xs ${exp.labelColor} mt-2 tracking-[0.15em] uppercase`}
                    >
                      {exp.label}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant px-4 py-2 bg-surface/50 rounded-full border border-glass-border">
                    {exp.period}
                  </span>
                </div>
                <p className="font-sans text-on-surface-variant mb-6 text-base md:text-lg leading-relaxed">
                  {exp.description}
                </p>
                {exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1.5 bg-surface-container/50 backdrop-blur-md rounded-lg text-on-surface border border-glass-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
