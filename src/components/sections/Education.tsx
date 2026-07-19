"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle, Sparkles } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  project?: {
    title: string;
    description: string;
  };
}

interface CertificationItem {
  title: string;
  issuer: string;
  period: string;
  details?: string;
}

export default function Education() {
  const educationList: EducationItem[] = [
    {
      degree: "Bachelor of Computer Science and Engineering",
      institution: "JCT College of Engineering and Technology",
      period: "Aug 2017 – Dec 2021",
      project: {
        title: "Plant Disease Detection System",
        description: "Developed a deep learning image classification model using Python, TensorFlow, Keras, and NumPy to identify plant diseases from leaf images."
      }
    }
  ];

  const certificationsList: CertificationItem[] = [
    {
      title: "Python Full Stack Development",
      issuer: "Edure Learning, Trivandrum",
      period: "Aug 2024 – Jan 2025",
      details: "Covered HTML/CSS/JavaScript front-end development and Python-Django back-end development, REST APIs, and deployment; built an e-commerce site as the capstone project."
    },
    {
      title: "Python Programming Internship",
      issuer: "Gateway Software Solutions",
      period: "Jan – Feb 2021",
      details: "Hands-on internship training focusing on Python language constructs, programming logic, and scripting applications."
    },
    {
      title: "Cyber Security Workshop",
      issuer: "Redback IT Solutions, Vellore Institute of Technology",
      period: "Feb 2019",
      details: "Attended intensive workshop covering fundamental ethical hacking, security tools, and JWT authentication workflows."
    }
  ];

  return (
    <section
      id="education"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/35"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(108,99,255,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Education Section */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
                <GraduationCap className="h-3.5 w-3.5" />
                Academic Timeline
              </div>
              <h3 className="text-3xl font-bold font-display text-white">
                Education
              </h3>
              <p className="text-sm text-muted max-w-md">
                Formal studies, engineering principles, and academic capstone project milestones.
              </p>
            </div>

            <div className="space-y-6">
              {educationList.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card hover-lift rounded-xl p-6 bg-surface/50 border-white/10 hover:border-primary/20 relative group overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-xs text-primary font-mono block">
                        {edu.institution}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted whitespace-nowrap bg-black/35 rounded-full px-3 py-1 border border-white/5 flex items-center gap-1.5 shrink-0">
                      <Calendar className="h-3 w-3" />
                      {edu.period}
                    </span>
                  </div>

                  {edu.project && (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-accent font-mono">
                        <BookOpen className="h-3.5 w-3.5" />
                        Final Year Project
                      </div>
                      <h5 className="text-xs font-bold text-white font-display leading-relaxed">
                        {edu.project.title}
                      </h5>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
                        {edu.project.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications Section */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-accent font-mono select-none">
                <Award className="h-3.5 w-3.5" />
                Specializations
              </div>
              <h3 className="text-3xl font-bold font-display text-white">
                Certifications & Training
              </h3>
              <p className="text-sm text-muted max-w-md">
                Professional certification bootcamps, technical training programs, and targeted engineering workshops.
              </p>
            </div>

            <div className="space-y-4">
              {certificationsList.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card hover-lift rounded-xl p-5 bg-surface/50 border-white/10 hover:border-accent/20 relative group flex items-start gap-4"
                >
                  <div className="p-2 bg-black/40 rounded-lg border border-white/5 mt-0.5 text-accent shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-tight group-hover:text-accent transition-colors">
                        {cert.title}
                      </h4>
                      <span className="text-[9px] font-mono text-muted whitespace-nowrap bg-black/35 rounded-full px-2.5 py-0.5 border border-white/5 flex items-center gap-1 shrink-0">
                        <Calendar className="h-2.5 w-2.5" />
                        {cert.period}
                      </span>
                    </div>
                    <span className="text-[10px] text-primary font-mono block">
                      {cert.issuer}
                    </span>
                    {cert.details && (
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
                        {cert.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
