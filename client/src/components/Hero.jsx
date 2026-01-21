import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-40 pb-20 text-center bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent border-b border-primary/20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
          Software Engineer
        </h1>
        <p className="text-xl text-dark-300 mb-8 leading-relaxed">
          Building intelligent algorithms, scalable systems, and cutting-edge
          solutions for complex problems
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
