import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-dark-900/50 to-dark-950 border-t border-primary/20 py-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Contact Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Let's Work Together
          </h2>
          <p className="text-dark-300 text-lg mb-8">
            Interested in collaborating or discussing opportunities? Reach out
            through any of these channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="mailto:your-email@example.com"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-200"
            >
              Email Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/10 pt-8">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            <div className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Zaid Islam
            </div>
            <p className="text-dark-400 text-sm">&copy; 2026 Zaid Islam</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
