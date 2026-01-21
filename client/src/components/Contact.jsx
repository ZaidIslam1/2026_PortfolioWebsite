import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Get In Touch</h2>
        <p className="text-dark-300 text-lg mb-8">
          Interested in discussing projects or opportunities?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:izaid0630@gmail.com"
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
          >
            Email Me
          </a>
          <a
            href="https://github.com/ZaidIslam1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/zaid-islam-64a374216"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
