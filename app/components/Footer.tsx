const FOOTER_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "mailto:mohnishkumar57@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest/80 backdrop-blur-xl w-full border-t border-glass-border relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 md:py-16 px-5 md:px-[60px] max-w-[1200px] mx-auto gap-6">
        <span className="font-mono text-xs text-on-surface-variant tracking-[0.12em] uppercase">
          © 2024 M Mohnish Kumar. Architected for Scale.
        </span>
        <div className="flex gap-6 md:gap-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              className="font-mono text-sm text-outline hover:text-aurora-cyan transition-colors duration-300"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
