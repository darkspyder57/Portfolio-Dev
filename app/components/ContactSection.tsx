"use client";

import { useRef, useState, type MouseEvent, type FormEvent } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

const SOCIALS = [
  { icon: "code", href: "#", hoverColor: "hover:border-aurora-violet hover:shadow-[0_0_20px_rgba(122,115,255,0.3)] hover:text-aurora-violet" },
  { icon: "work", href: "#", hoverColor: "hover:border-aurora-blue hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:text-aurora-blue" },
  { icon: "forum", href: "#", hoverColor: "hover:border-aurora-cyan hover:shadow-[0_0_20px_rgba(0,255,194,0.3)] hover:text-aurora-cyan" },
  { icon: "photo_camera", href: "#", hoverColor: "hover:border-primary hover:shadow-[0_0_20px_rgba(168,232,255,0.3)] hover:text-primary" },
];

export default function ContactSection() {
  const glowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.left = `${e.clientX - rect.left}px`;
    glowRef.current.style.top = `${e.clientY - rect.top}px`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section
      className="px-5 md:px-[60px] max-w-[1200px] mx-auto w-full"
      id="contact"
    >
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="font-sans text-5xl md:text-6xl font-bold text-on-surface mb-6 tracking-tight gradient-text">
            Initiate Collaboration
          </h2>
          <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Let&apos;s architect something extraordinary together.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div
          className="glass-panel p-8 md:p-16 rounded-[2.5rem] glass-hover relative overflow-hidden group border border-glass-border shadow-2xl"
          onMouseMove={handleMouseMove}
        >
          <div ref={glowRef} className="mouse-glow" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 relative z-10">
            {/* Sidebar Info */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="font-sans text-3xl font-bold text-on-surface mb-6">
                  Connect
                </h3>
                <p className="font-sans text-on-surface-variant text-lg mb-8 leading-relaxed">
                  Currently exploring new opportunities and collaborations.
                  Whether you have a question or just want to say hi, I&apos;ll
                  try my best to get back to you!
                </p>
                <a
                  className="inline-flex items-center gap-4 text-on-surface hover:text-aurora-cyan transition-colors group/email mb-12"
                  href="mailto:mohnishkumar57@gmail.com"
                >
                  <span className="material-symbols-outlined text-aurora-cyan p-3 bg-aurora-cyan/10 rounded-full group-hover/email:bg-aurora-cyan/20 transition-colors">
                    mail
                  </span>
                  <span className="font-mono text-sm tracking-wide">
                    mohnishkumar57@gmail.com
                  </span>
                </a>
              </div>

              <div>
                <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-[0.15em] mb-6">
                  Digital Presence
                </h4>
                <div className="flex gap-4">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.icon}
                      className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface transition-all duration-300 ${social.hoverColor}`}
                      href={social.href}
                    >
                      <span className="material-symbols-outlined">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 glass-panel rounded-3xl border border-glass-border bg-white/[0.01] min-h-[380px] animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-aurora-cyan/10 border border-aurora-cyan flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,194,0.2)] animate-pulse">
                    <span className="material-symbols-outlined text-aurora-cyan text-3xl">check</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold text-on-surface mb-3">
                    Message Sent
                  </h3>
                  <p className="font-sans text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed text-sm md:text-base">
                    Thank you! Your message has been routed to M. Mohnish Kumar&apos;s gateway. Expect a response shortly.
                  </p>
                  <MagneticButton
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="px-8 py-3.5 text-sm"
                  >
                    Send Another Message
                  </MagneticButton>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="relative z-0 w-full group">
                      <input
                        className="block py-3.5 px-0 w-full font-sans text-on-surface bg-transparent border-0 border-b-2 border-outline/30 appearance-none focus:outline-none focus:ring-0 focus:border-aurora-blue peer transition-colors disabled:opacity-50"
                        id="name"
                        name="name"
                        placeholder=" "
                        required
                        disabled={isSubmitting}
                        type="text"
                      />
                      <label
                        className="absolute font-sans text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aurora-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        htmlFor="name"
                      >
                        Your Name
                      </label>
                    </div>
                    {/* Email Field */}
                    <div className="relative z-0 w-full group">
                      <input
                        className="block py-3.5 px-0 w-full font-sans text-on-surface bg-transparent border-0 border-b-2 border-outline/30 appearance-none focus:outline-none focus:ring-0 focus:border-aurora-cyan peer transition-colors disabled:opacity-50"
                        id="email"
                        name="email"
                        placeholder=" "
                        required
                        disabled={isSubmitting}
                        type="email"
                      />
                      <label
                        className="absolute font-sans text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aurora-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative z-0 w-full group">
                    <input
                      className="block py-3.5 px-0 w-full font-sans text-on-surface bg-transparent border-0 border-b-2 border-outline/30 appearance-none focus:outline-none focus:ring-0 focus:border-aurora-violet peer transition-colors disabled:opacity-50"
                      id="subject"
                      name="subject"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      type="text"
                    />
                    <label
                      className="absolute font-sans text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aurora-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="relative z-0 w-full group">
                    <textarea
                      className="block py-3.5 px-0 w-full font-sans text-on-surface bg-transparent border-0 border-b-2 border-outline/30 appearance-none focus:outline-none focus:ring-0 focus:border-aurora-blue peer transition-colors resize-none disabled:opacity-50"
                      id="message"
                      name="message"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                      rows={5}
                    />
                    <label
                      className="absolute font-sans text-on-surface-variant duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aurora-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      htmlFor="message"
                    >
                      Your Message
                    </label>
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="solid"
                    className="mt-6 px-10 py-5 text-lg w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <span className="animate-spin w-5 h-5 border-2 border-surface border-t-transparent rounded-full ml-2"></span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined">send</span>
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
