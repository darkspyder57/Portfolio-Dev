import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "M. Mohnish Kumar — Software Development Engineer Portfolio",
  description:
    "Premium AI engineering blending intelligent automation with high-end interfaces. Crafting autonomous workflows and digital products that are scalable, tactile, and inevitable.",
  keywords: [
    "AI Engineer",
    "Frontend Architect",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "M. Mohnish Kumar" }],
  openGraph: {
    title: "M. Mohnish Kumar — Architect of the Autonomous Future",
    description:
      "Premium AI engineering blending intelligent automation with high-end interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
