import GlassCard from "./GlassCard";

interface FeaturedProjectProps {
  title: string;
  description: string;
  tags: { label: string; color: string; borderColor: string }[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function FeaturedProject({
  title,
  description,
  tags,
  image,
  imageAlt,
  reverse = false,
}: FeaturedProjectProps) {
  const id = `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <GlassCard id={id} className="rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-6 lg:p-8 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
        {/* Text content */}
        <div
          className={`p-4 sm:p-6 lg:p-10 xl:p-12 ${
            reverse ? "order-2 lg:order-2" : "order-2 lg:order-1"
          }`}
        >
          <div className="flex flex-wrap gap-2.5 mb-8">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`font-mono text-[11px] px-4 py-2 rounded-full ${tag.color} border ${tag.borderColor} bg-opacity-10`}
                style={{
                  backgroundColor: `${tag.color.includes("blue") ? "rgba(0,212,255,0.08)" : tag.color.includes("violet") ? "rgba(122,115,255,0.08)" : "rgba(0,255,194,0.08)"}`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-6 tracking-tight leading-[1.1]">
            {title}
          </h3>
          <p className="font-sans text-on-surface-variant text-base md:text-lg lg:text-xl leading-relaxed mb-10">
            {description}
          </p>
          <a
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-on-surface hover:text-aurora-blue transition-colors group/link"
            href="#"
          >
            View Case Study
            <span className="material-symbols-outlined transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform text-lg">
              arrow_outward
            </span>
          </a>
        </div>

        {/* Image */}
        <div
          className={`h-[300px] sm:h-[400px] lg:h-[550px] rounded-xl lg:rounded-2xl overflow-hidden relative group ${
            reverse ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            src={image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
        </div>
      </div>
    </GlassCard>
  );
}
