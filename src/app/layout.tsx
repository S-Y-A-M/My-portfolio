import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import CommandPalette from "@/components/ui/CommandPalette";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syam Krishnan PK | Backend Node.js Developer & Cloud Engineer",
  description: "Senior Backend Node.js Developer specializing in building scalable RESTful APIs, AWS cloud architecture, MedusaJS multi-vendor systems, AI RAG chatbots, and automated workflows.",
  keywords: [
    "Backend Developer",
    "Node.js",
    "Express.js",
    "TypeScript",
    "AWS",
    "Docker",
    "Terraform",
    "MedusaJS",
    "AI Automation",
    "RAG Chatbot",
    "PostgreSQL",
    "Redis",
    "Thrissur",
    "Kerala",
    "GCC Relocation"
  ],
  authors: [{ name: "Syam Krishnan PK" }],
  openGraph: {
    title: "Syam Krishnan PK | Backend Node.js Developer",
    description: "Specialist in high-scale backend architectures, microservices, AI workflows, and AWS solutions.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-primary">
        <MouseSpotlight />
        <CommandPalette />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
