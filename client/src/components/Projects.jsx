import React from "react";
import GridDemo from "./GridDemo";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-8 bg-gradient-to-b from-dark-900 to-dark-900/50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-dark-300 mb-12 text-lg">
          Full-stack applications and cutting-edge algorithms
        </p>

        {/* Z Project - FIRST */}
        <div className="bg-gradient-to-br from-dark-800/60 to-dark-900/40 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300">
          {/* Project Header */}
          <div className="p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-primary/10">
            <div className="flex items-start justify-between mb-4 flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Z - Social Media Platform
                </h3>
                <p className="text-dark-300 text-lg leading-relaxed max-w-2xl">
                  A full-stack X-inspired social media platform with real-time
                  messaging, user authentication, and dynamic feed management.
                  Built with modern web technologies for scalability and
                  performance.
                </p>
              </div>
              <div className="flex flex-col gap-3 whitespace-nowrap">
                <a
                  href="https://twitter-clone-dfi2.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/50 text-white rounded-lg font-semibold transition-all duration-200 border border-accent/30 hover:border-accent/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="https://github.com/ZaidIslam1/X-Clone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white rounded-lg font-semibold transition-all duration-200 border border-primary/30 hover:border-primary/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 font-medium">
                MongoDB
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                Socket.io
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                JWT Auth
              </span>
            </div>
          </div>

          {/* Demo Screenshot */}
          <div className="p-8">
            <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              Platform Demo
            </h4>
            <div className="relative rounded-lg overflow-hidden bg-dark-900 border border-primary/20 w-full">
              <img
                src="/z-demo.png"
                alt="Z Platform Demo"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 mt-8 border-t border-primary/10">
              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Core Features
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>User authentication & authorization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Real-time messaging & notifications</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Dynamic feed with likes & comments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>User profiles & follow system</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Architecture
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Frontend:</strong> React with Tailwind CSS
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Backend:</strong> Express.js REST API
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Database:</strong> MongoDB with Mongoose
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Deployment:</strong> Render & MongoDB Atlas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Pathfinding Project - SECOND */}
        <div className="mt-8 bg-gradient-to-br from-dark-800/60 to-dark-900/40 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300">
          {/* Project Header */}
          <div className="p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-primary/10">
            <div className="flex items-start justify-between mb-4 flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Grid Pathfinding & Connectivity
                </h3>
                <p className="text-dark-300 text-lg leading-relaxed max-w-2xl">
                  Advanced A* pathfinding algorithm with real-time connectivity
                  analysis. Demonstrates C++ performance integrated with React
                  visualization and Node.js backend orchestration.
                </p>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white rounded-lg font-semibold transition-all duration-200 border border-primary/30 hover:border-primary/50 whitespace-nowrap"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                C++
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                A* Algorithm
              </span>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="p-8">
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                Interactive Demo
              </h4>
              <GridDemo />
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-primary/10">
              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Core Features
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>A* pathfinding with octile movement</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Multi-sized object support (0-2 scale)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>BFS-based connectivity analysis</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Tech Stack
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Backend:</strong> Node.js + Express
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Core:</strong> C++ with STL
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Frontend:</strong> React + Canvas API
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Ecommerce Store Project - THIRD */}
        <div className="mt-8 bg-gradient-to-br from-dark-800/60 to-dark-900/40 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300">
          {/* Project Header */}
          <div className="p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-primary/10">
            <div className="flex items-start justify-between mb-4 flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  E-Commerce Store
                </h3>
                <p className="text-dark-300 text-lg leading-relaxed max-w-2xl">
                  A fully-featured e-commerce platform with product catalog,
                  shopping cart, payment processing, and order management. Built
                  with responsive design and seamless user experience.
                </p>
              </div>
              <div className="flex flex-col gap-3 whitespace-nowrap">
                <a
                  href="https://e-commercestore-icdh.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/50 text-white rounded-lg font-semibold transition-all duration-200 border border-accent/30 hover:border-accent/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="https://github.com/ZaidIslam1/E-CommerceStore?tab=readme-ov-file"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white rounded-lg font-semibold transition-all duration-200 border border-primary/30 hover:border-primary/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 font-medium">
                MongoDB
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                Stripe
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                Payment Integration
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="p-8">
            <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              Platform Demo
            </h4>
            <div className="relative rounded-lg overflow-hidden bg-dark-900 border border-primary/20 w-full mb-8">
              <img
                src="/ecommerce-demo.png"
                alt="E-Commerce Store Demo"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Core Features
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Product catalog with filtering & search</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Shopping cart & checkout flow</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Payment processing integration</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Order history & tracking</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Architecture
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Frontend:</strong> React with Tailwind
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Backend:</strong> Express.js REST API
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Database:</strong> MongoDB
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Payments:</strong> Stripe integration
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Spotify Clone Project - FOURTH */}
        <div className="mt-8 bg-gradient-to-br from-dark-800/60 to-dark-900/40 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 hover:shadow-2xl transition-all duration-300">
          {/* Project Header */}
          <div className="p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-primary/10">
            <div className="flex items-start justify-between mb-4 flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Realtime Spotify Clone
                </h3>
                <p className="text-dark-300 text-lg leading-relaxed max-w-2xl">
                  A feature-rich music streaming platform with real-time
                  playback, dynamic playlists, user authentication, and
                  responsive audio controls. Demonstrates advanced real-time
                  synchronization and streaming capabilities.
                </p>
              </div>
              <div className="flex flex-col gap-3 whitespace-nowrap">
                <a
                  href="https://realtime-spotify-clone-2w1t.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/50 text-white rounded-lg font-semibold transition-all duration-200 border border-accent/30 hover:border-accent/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="https://github.com/ZaidIslam1/realtime-spotify-clone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white rounded-lg font-semibold transition-all duration-200 border border-primary/30 hover:border-primary/50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30 font-medium">
                MongoDB
              </span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 font-medium">
                Real-time Sync
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 font-medium">
                Audio Streaming
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="p-8">
            <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
              Platform Demo
            </h4>
            <div className="relative rounded-lg overflow-hidden bg-dark-900 border border-primary/20 w-full mb-8">
              <img
                src="/spotify-demo.png"
                alt="Spotify Clone Demo"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Core Features
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Real-time music playback & synchronization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Dynamic playlist management</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>User authentication & profiles</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Advanced audio controls & progress tracking</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-primary text-sm uppercase tracking-wider">
                  Architecture
                </h5>
                <ul className="space-y-2 text-dark-300 text-sm">
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Frontend:</strong> React with Tailwind
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Backend:</strong> Express.js REST API
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Database:</strong> MongoDB
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">◆</span>
                    <span>
                      <strong>Real-time:</strong> WebSocket synchronization
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-gradient-to-br from-dark-800/60 to-dark-900/40 border border-primary/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-primary mb-2">
            More Projects Coming Soon
          </h3>
          <p className="text-dark-300">
            Stay tuned for additional projects showcasing various technologies
            and algorithms...
          </p>
        </div>
      </div>
    </section>
  );
}
