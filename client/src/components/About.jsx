import React, { useState } from "react";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  const skills = [
    "Full-Stack Development",
    "JavaScript & TypeScript",
    "Python",
    "React & Frontend",
    "Node.js & Express",
    "MongoDB & Databases",
    "Real-time Systems",
    "C / C++",
    "Algorithm Design",
    "System Design",
  ];

  return (
    <section
      id="about"
      className="py-8 bg-gradient-to-b from-dark-950 to-dark-900"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Collapsible Header Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="w-full group">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border border-primary/20 rounded-xl hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-left">
              About Me
            </h2>
            <span
              className={`text-primary text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </div>
        </button>

        {/* Expandable Content */}
        {isOpen && (
          <div className="space-y-8 animate-in fade-in duration-300 pb-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-dark-300 text-lg leading-relaxed">
                  I'm a Full-Stack Software Engineer passionate about building
                  scalable, real-time web applications. I specialize in
                  designing and implementing complete end-to-end solutions, from
                  responsive React frontends to robust Node.js backends with
                  MongoDB databases.
                </p>
                <p className="text-dark-300 text-lg leading-relaxed">
                  With a portfolio of 4 production-ready applications—including
                  Z (social media platform), Spotify Clone (music
                  streaming), E-Commerce Store (payment processing), and Grid
                  Pathfinding (algorithm visualization) I want to showcase my
                  expertise in full-stack development, real-time systems,
                  payment integration, and performance optimization with C++.
                </p>
                <p className="text-dark-300 text-lg leading-relaxed">
                  I excel at architecting scalable systems, implementing
                  real-time features with WebSockets, integrating third-party
                  APIs (Stripe, auth services), and optimizing performance. I'm
                  committed to writing clean, maintainable code and continuously
                  learning new technologies to deliver exceptional user
                  experiences.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="inline-block w-1 h-8 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                  Expertise
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="p-4 bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20 rounded-lg text-dark-300 hover:border-primary/50 hover:bg-primary/15 transition-all duration-200 font-medium text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
