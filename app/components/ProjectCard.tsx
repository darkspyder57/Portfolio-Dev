import GlassCard from "./GlassCard";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  techLabel: string;
  techColor: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  techLabel,
  techColor,
}: ProjectCardProps) {
  const id = `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <GlassCard id={id} className="rounded-2xl md:rounded-3xl flex flex-col h-[500px] md:h-[580px] group cursor-pointer">
      {/* Image area */}
      <div className="h-[55%] md:h-[60%] overflow-hidden rounded-t-2xl md:rounded-t-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={image}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-t from-surface/90 to-surface/40 backdrop-blur-md">
        <div>
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-on-surface mb-2 tracking-tight">
            {title}
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className={`font-mono text-xs ${techColor}`}>{techLabel}</span>
          <span className="material-symbols-outlined text-on-surface group-hover:text-aurora-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
            arrow_outward
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
