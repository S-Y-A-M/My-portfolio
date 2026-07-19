"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1 w-full relative">
      {/* 1. Hero Section (Includes interactive terminal & Three.js canvas) */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Tech Stack Section */}
      <TechStack />

      {/* 4. Experience Timeline Section */}
      <Experience />

      {/* 5. Featured Projects Section */}
      <Projects />

      {/* 6. Education & Certifications Section */}
      <Education />

      {/* 7. Contact Section */}
      <Contact />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
