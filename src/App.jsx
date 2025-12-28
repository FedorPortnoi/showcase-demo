import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BlurText from './BlurText';
import ScrollAnimations from './pages/ScrollAnimations';
import ParticleSystems from './pages/ParticleSystems';
import Wireframes3D from './pages/Wireframes3D';
import GlassMorphism from './pages/GlassMorphism';
import MagneticHover from './pages/MagneticHover';
import SmoothCounters from './pages/SmoothCounters';

// ============================================
// FUTURISTIC SHOWCASE
// Monochrome • Sophisticated • Interactive
// ============================================

// Intersection Observer Hook
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Small delay to prevent triggering on page load
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsInView(true);
        },
        { threshold, rootMargin: '-50px' }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [threshold]);
  
  return [ref, isInView];
};

// Mouse Position Hook
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return position;
};

// Neural Network Background Component
const NeuralNetwork = ({ nodeCount = 60, className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize nodes
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Mouse interaction - subtle attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          node.vx += dx * 0.00005;
          node.vy += dy * 0.00005;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        // Draw connections
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const d = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [nodeCount]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
};

// 3D Wireframe Sphere
const WireframeSphere = ({ size = 300, className = '' }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let animationId;
    let angle = 0;
    
    const animate = () => {
      angle += 0.003;
      setRotation({ x: Math.sin(angle) * 10, y: angle * 20 });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  const lines = useMemo(() => {
    const result = [];
    const segments = 16;
    
    // Latitude lines
    for (let i = 1; i < segments; i++) {
      const lat = (i / segments) * Math.PI;
      const y = Math.cos(lat) * 50;
      const r = Math.sin(lat) * 50;
      result.push({ type: 'lat', y, r, opacity: 0.3 + (Math.sin(lat) * 0.3) });
    }
    
    // Longitude lines
    for (let i = 0; i < segments; i++) {
      const lon = (i / segments) * Math.PI * 2;
      result.push({ type: 'lon', angle: lon, opacity: 0.2 });
    }
    
    return result;
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="-60 -60 120 120" 
        className="w-full h-full"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.1s linear'
        }}
      >
        {/* Latitude circles */}
        {lines.filter(l => l.type === 'lat').map((line, i) => (
          <ellipse
            key={`lat-${i}`}
            cx="0"
            cy={line.y}
            rx={line.r}
            ry={line.r * 0.3}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Longitude arcs */}
        {lines.filter(l => l.type === 'lon').map((line, i) => (
          <ellipse
            key={`lon-${i}`}
            cx="0"
            cy="0"
            rx={50 * Math.cos(line.angle)}
            ry="50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            transform={`rotate(${(line.angle * 180) / Math.PI})`}
          />
        ))}
        
        {/* Outer ring */}
        <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      </svg>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

// Animated Counter
const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Reveal on Scroll
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isInView] = useInView();
  
  const directions = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0)' : directions[direction],
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Floating Card
const FloatingCard = ({ children, className = '' }) => {
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTransform(`perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateY(0deg) rotateX(0deg)');
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Glowing Dot Indicator
const GlowDot = ({ active = false, color = '#4ade80' }) => (
  <div className="relative">
    <div 
      className={`w-2 h-2 rounded-full transition-all duration-500 ${active ? 'scale-100' : 'scale-75 opacity-50'}`}
      style={{ backgroundColor: color }}
    />
    {active && (
      <div 
        className="absolute inset-0 rounded-full animate-ping"
        style={{ backgroundColor: color, opacity: 0.4 }}
      />
    )}
  </div>
);

// Horizontal Line with Glow
const GlowLine = ({ width = '100%', color = 'rgba(255,255,255,0.2)' }) => (
  <div 
    className="h-px relative"
    style={{ width, backgroundColor: color }}
  >
    <div 
      className="absolute inset-0 blur-sm"
      style={{ backgroundColor: color }}
    />
  </div>
);

// Main Component
function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-x-hidden antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        :root {
          --accent: #4ade80;
          --accent-dim: rgba(74, 222, 128, 0.3);
          --white: #ffffff;
          --gray-100: #f5f5f5;
          --gray-200: #e5e5e5;
          --gray-300: #d4d4d4;
          --gray-400: #a3a3a3;
          --gray-500: #737373;
          --gray-600: #525252;
          --gray-700: #404040;
          --gray-800: #262626;
          --gray-900: #171717;
          --black: #050505;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--black);
          color: var(--white);
          cursor: default;
        }
        
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: var(--black);
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--gray-700);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--gray-600);
        }
        
        /* Subtle gradient overlay */
        .gradient-overlay {
          background: radial-gradient(ellipse at 50% 0%, rgba(74, 222, 128, 0.03) 0%, transparent 50%);
        }
        
        /* Glass card */
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }
        
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Button styles */
        .btn-primary {
          background: var(--white);
          color: var(--black);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: var(--gray-200);
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }
        
        /* Text gradient */
        .text-gradient {
          background: linear-gradient(135deg, var(--white) 0%, var(--gray-400) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Glow effect */
        .glow-accent {
          box-shadow: 0 0 30px rgba(74, 222, 128, 0.15);
        }
        
        /* Animated border */
        @keyframes borderRotate {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }
        
        /* Pulse animation */
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-subtle-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }
        
        /* Float animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Scan line */
        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.5), transparent);
          animation: scan 4s linear infinite;
        }
        
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        /* Grid pattern */
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        /* Noise texture */
        .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.015;
          z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        
        /* Loading animation */
        .load-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .load-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1s ease, transform 1s ease;
        }
        
        /* Stagger children */
        .stagger > * {
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }
        
        .stagger > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger > *:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        
    {/* Noise overlay */}
    <div className="noise" />

    {/* ============================================ */}
    {/* NAVIGATION */}
    {/* ============================================ */}
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#050505]/80 backdrop-blur-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-[#4ade80] rounded-sm" />
            </div>
            <span className="font-semibold tracking-tight">SHOWCASE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          </div>
          
          <button className="btn-secondary px-4 py-2 rounded-full text-sm font-medium">
            Contact Us
          </button>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Neural network background */}
        <NeuralNetwork nodeCount={50} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-overlay" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className={`space-y-8 ${loaded ? 'stagger' : ''}`}>
            <div className="flex items-center gap-3">
              <GlowDot active color="#4ade80" />
              <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                Interactive Experience
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
             <BlurText
                text="Your Gateway"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-gradient"
              />
              <br />
              <BlurText
                text="to the Future"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-white"
              />
            </h1>
            
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Experience the next generation of web interfaces. 
              Subtle animations, sophisticated design, and seamless interactions.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button className="btn-primary px-6 py-3 rounded-full text-sm font-semibold">
                Get Started
              </button>
              <button className="btn-secondary px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
                <span>Learn More</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            {/* Mini stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-white/5">
              <div>
                <div className="text-2xl font-semibold"><Counter target={99} suffix="%" /></div>
                <div className="text-xs text-gray-500 mt-1">Satisfaction</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-semibold"><Counter target={50} suffix="+" /></div>
                <div className="text-xs text-gray-500 mt-1">Components</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-semibold"><Counter target={24} suffix="/7" /></div>
                <div className="text-xs text-gray-500 mt-1">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right - 3D Element */}
          <div className="relative flex items-center justify-center">
            <div className="animate-float">
              <WireframeSphere size={400} />
            </div>
            
            {/* Floating labels */}
            <div className="absolute top-1/4 -left-4 glass-card px-4 py-2 rounded-lg">
              <div className="text-xs text-gray-400">Performance</div>
              <div className="text-lg font-semibold text-[#4ade80]">98%</div>
            </div>
            
            <div className="absolute bottom-1/4 -right-4 glass-card px-4 py-2 rounded-lg">
              <div className="text-xs text-gray-400">Uptime</div>
              <div className="text-lg font-semibold">99.9%</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-xs font-mono text-[#4ade80] tracking-widest uppercase">
                Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold mt-4 tracking-tight">
                Built for Excellence
              </h2>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                Every component designed with precision and purpose
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '◇',
                title: 'Particle Systems',
                description: 'Interactive particle networks that respond to cursor movement with physics-based animations.',
                path: '/particle-systems',
              },
              {
                icon: '○',
                title: '3D Wireframes',
                description: 'Elegant wireframe visualizations with smooth rotation and perspective transforms.',
                path: '/3d-wireframes',
              },
              {
                icon: '△',
                title: 'Scroll Animations',
                description: 'Elements gracefully reveal as you scroll, creating an immersive storytelling experience.',
                path: '/scroll-animations',
              },
              {
                icon: '□',
                title: 'Glass Morphism',
                description: 'Frosted glass effects with subtle transparency and backdrop blur.',
                path: '/glass-morphism',
              },
              {
                icon: '◈',
                title: 'Magnetic Hover',
                description: 'Elements that subtly follow your cursor, creating a magnetic interaction.',
                path: '/magnetic-hover',
              },
              {
               icon: '⬡',
               title: 'Smooth Counters',
                description: 'Animated number counters that increment smoothly when scrolled into view.',
                path: '/smooth-counters',
              },
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Link to={feature.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FloatingCard>
                    <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl mb-6 group-hover:bg-[#4ade80]/10 group-hover:text-[#4ade80] transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </FloatingCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SHOWCASE SECTION */}
      {/* ============================================ */}
      <section id="showcase" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Interactive Demo */}
            <Reveal direction="left">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Circular container */}
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-white/5" />
                
                {/* Center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <WireframeSphere size={200} />
                    <div className="scan-line" />
                  </div>
                </div>
                
                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
                      left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                
                {/* Labels */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500">
                  STEP 1
                </div>
                
                <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-4 -translate-x-4">
                  {['BODY STYLE', 'ENGINE', 'PRESETS', 'CUSTOMIZE'].map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-500">{label}</span>
                      <div className={`w-6 h-6 rounded-full border ${i === 0 ? 'border-[#4ade80] bg-[#4ade80]/10' : 'border-white/10'} flex items-center justify-center`}>
                        {i === 0 && <div className="w-2 h-2 bg-[#4ade80] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            {/* Right - Content */}
            <Reveal direction="right">
              <div className="space-y-8">
                <span className="text-xs font-mono text-[#4ade80] tracking-widest uppercase">
                  Interactive Demo
                </span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  Select Your
                  <br />
                  <span className="text-gray-400">Configuration</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Our interactive configurators guide users through complex choices 
                  with elegant step-by-step interfaces. Every interaction is smooth, 
                  every transition is purposeful.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    { label: 'Smooth Transitions', value: '60 FPS' },
                    { label: 'Response Time', value: '<16ms' },
                    { label: 'Accessibility', value: 'AAA' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-mono text-[#4ade80]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section id="stats" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <NeuralNetwork nodeCount={30} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: 110, suffix: '+', label: 'Components' },
              { value: 50, suffix: 'K+', label: 'Downloads' },
              { value: 99, suffix: '%', label: 'Satisfaction' },
              { value: 24, suffix: '/7', label: 'Support' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-semibold text-gradient">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="glass-card rounded-3xl p-12 md:p-16 glow-accent">
              <span className="text-xs font-mono text-[#4ade80] tracking-widest uppercase">
                Ready to Start?
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold mt-6 tracking-tight">
                Build Something
                <br />
                <span className="text-gray-400">Extraordinary</span>
              </h2>
              <p className="text-gray-400 mt-6 max-w-lg mx-auto">
                Transform your ideas into stunning, interactive experiences. 
                The future of web design is here.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-10">
                <button className="btn-primary px-8 py-4 rounded-full font-semibold">
                  Get Started Now
                </button>
                <button className="btn-secondary px-8 py-4 rounded-full font-medium">
                  View Documentation
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-[#4ade80] rounded-sm" />
              </div>
              <span className="font-semibold tracking-tight">SHOWCASE</span>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2025 — Visual Capabilities Demonstration
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
// Main App with Routes
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scroll-animations" element={<ScrollAnimations />} />
      <Route path="/particle-systems" element={<ParticleSystems />} />
      <Route path="/3d-wireframes" element={<Wireframes3D />} />
      <Route path="/glass-morphism" element={<GlassMorphism />} />
      <Route path="/magnetic-hover" element={<MagneticHover />} />
      <Route path="/smooth-counters" element={<SmoothCounters />} />
    </Routes>
  );
}