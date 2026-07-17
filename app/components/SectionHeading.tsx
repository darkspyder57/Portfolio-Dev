interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <h2 className="font-sans text-5xl md:text-[4rem] lg:text-[4.5rem] font-bold text-on-surface mb-6 tracking-[-0.03em] leading-[1.1] gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
