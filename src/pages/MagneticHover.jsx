import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Demo 1: Basic Magnetic Button
const MagneticButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">Magnetic Button</h3>
      <p className="demo-description">Button follows your cursor when hovering nearby</p>
      <div 
        className="magnetic-area"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={buttonRef}
          className="magnetic-button"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          Hover Near Me
        </button>
      </div>
      <code className="demo-code">Calculates offset from button center • 0.3x movement multiplier</code>
    </div>
  );
};

// Demo 2: Magnetic Icons
const MagneticIcons = () => {
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const iconsRef = useRef([]);

  const handleMouseMove = (e, index) => {
    const rect = iconsRef.current[index]?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.4;
    const y = (e.clientY - centerY) * 0.4;
    setPositions(prev => {
      const newPos = [...prev];
      newPos[index] = { x, y };
      return newPos;
    });
  };

  const handleMouseLeave = (index) => {
    setPositions(prev => {
      const newPos = [...prev];
      newPos[index] = { x: 0, y: 0 };
      return newPos;
    });
  };

  const icons = ['◆', '●', '■', '▲'];

  return (
    <div className="demo-section">
      <h3 className="demo-title">Magnetic Icons</h3>
      <p className="demo-description">Each icon moves independently toward your cursor</p>
      <div className="icons-container">
        {icons.map((icon, i) => (
          <div
            key={i}
            className="icon-magnetic-area"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div
              ref={el => iconsRef.current[i] = el}
              className="magnetic-icon"
              style={{
                transform: `translate(${positions[i].x}px, ${positions[i].y}px)`,
              }}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
      <code className="demo-code">Individual tracking per element</code>
    </div>
  );
};

// Demo 3: Magnetic Text Characters
const MagneticText = () => {
  const [charPositions, setCharPositions] = useState({});
  const charsRef = useRef({});
  const text = "MAGNETIC";

  const handleMouseMove = (e, index) => {
    const rect = charsRef.current[index]?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.5;
    const y = (e.clientY - centerY) * 0.5;
    setCharPositions(prev => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setCharPositions(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">Magnetic Text</h3>
      <p className="demo-description">Each character reacts independently to cursor proximity</p>
      <div className="text-container">
        {text.split('').map((char, i) => (
          <div
            key={i}
            className="char-magnetic-area"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <span
              ref={el => charsRef.current[i] = el}
              className="magnetic-char"
              style={{
                transform: `translate(${charPositions[i]?.x || 0}px, ${charPositions[i]?.y || 0}px)`,
              }}
            >
              {char}
            </span>
          </div>
        ))}
      </div>
      <code className="demo-code">Per-character tracking with smooth transitions</code>
    </div>
  );
};

// Demo 4: Magnetic Card with Glow
const MagneticGlowCard = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.1;
    const y = (e.clientY - centerY) * 0.1;
    setPosition({ x, y });
    
    // Glow position (percentage)
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">Magnetic Card with Glow</h3>
      <p className="demo-description">Card moves slightly + glow follows cursor inside</p>
      <div 
        className="glow-card-area"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="magnetic-glow-card"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div 
            className="card-glow"
            style={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(74, 222, 128, 0.3) 0%, transparent 50%)`,
            }}
          />
          <div className="card-inner">
            <div className="card-icon">✦</div>
            <h4>Interactive Card</h4>
            <p>Move your cursor around to see the magnetic and glow effects.</p>
          </div>
        </div>
      </div>
      <code className="demo-code">Combines magnetic movement + cursor-following glow</code>
    </div>
  );
};

// Demo 5: Repel Effect
const RepelEffect = () => {
  const [positions, setPositions] = useState(
    Array(9).fill(null).map(() => ({ x: 0, y: 0 }))
  );
  const dotsRef = useRef([]);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const newPositions = dotsRef.current.map((dot, i) => {
      if (!dot) return { x: 0, y: 0 };
      const rect = dot.getBoundingClientRect();
      const dotCenterX = rect.left - containerRect.left + rect.width / 2;
      const dotCenterY = rect.top - containerRect.top + rect.height / 2;
      
      const dx = dotCenterX - mouseX;
      const dy = dotCenterY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 80) {
        const force = (80 - dist) / 80;
        const angle = Math.atan2(dy, dx);
        return {
          x: Math.cos(angle) * force * 30,
          y: Math.sin(angle) * force * 30,
        };
      }
      return { x: 0, y: 0 };
    });

    setPositions(newPositions);
  };

  const handleMouseLeave = () => {
    setPositions(Array(9).fill(null).map(() => ({ x: 0, y: 0 })));
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">Repel Effect</h3>
      <p className="demo-description">Dots push away from your cursor</p>
      <div 
        ref={containerRef}
        className="repel-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            ref={el => dotsRef.current[i] = el}
            className="repel-dot"
            style={{
              transform: `translate(${positions[i]?.x || 0}px, ${positions[i]?.y || 0}px)`,
            }}
          />
        ))}
      </div>
      <code className="demo-code">Inverse of attraction — elements flee from cursor</code>
    </div>
  );
};

// Main Page
export default function MagneticHover() {
  return (
    <div className="page-container">
      <style>{`
        .page-container {
          min-height: 100vh;
          background: #050505;
          color: white;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        
        .page-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        
        .back-link:hover {
          color: #4ade80;
        }
        
        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .page-intro {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .page-intro h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #4ade80 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-intro p {
          color: #888;
          font-size: 1.125rem;
          line-height: 1.7;
        }
        
        .demos-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem 6rem;
        }
        
        .demo-section {
          margin-bottom: 4rem;
          padding: 2rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1.5rem;
        }
        
        .demo-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #4ade80;
        }
        
        .demo-description {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .demo-code {
          display: block;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.8rem;
          color: #4ade80;
          text-align: center;
        }
        
        /* Magnetic Button */
        .magnetic-area {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: rgba(0,0,0,0.2);
          border-radius: 1rem;
        }
        
        .magnetic-button {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 2rem;
          color: black;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.15s ease-out, box-shadow 0.3s ease;
        }
        
        .magnetic-button:hover {
          box-shadow: 0 10px 40px rgba(74, 222, 128, 0.3);
        }
        
        /* Magnetic Icons */
        .icons-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .icon-magnetic-area {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          border-radius: 1rem;
        }
        
        .magnetic-icon {
          width: 50px;
          height: 50px;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #4ade80;
          transition: transform 0.15s ease-out;
        }
        
        /* Magnetic Text */
        .text-container {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
          padding: 2rem;
          background: rgba(0,0,0,0.2);
          border-radius: 1rem;
        }
        
        .char-magnetic-area {
          padding: 0.5rem;
        }
        
        .magnetic-char {
          display: inline-block;
          font-size: 3rem;
          font-weight: 700;
          color: #4ade80;
          transition: transform 0.15s ease-out;
        }
        
        /* Magnetic Glow Card */
        .glow-card-area {
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .magnetic-glow-card {
          position: relative;
          width: 300px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          overflow: hidden;
          transition: transform 0.2s ease-out;
        }
        
        .card-glow {
          position: absolute;
          inset: 0;
          transition: background 0.1s ease;
        }
        
        .card-inner {
          position: relative;
          padding: 2rem;
          text-align: center;
        }
        
        .card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #4ade80;
        }
        
        .card-inner h4 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
        }
        
        .card-inner p {
          margin: 0;
          color: #666;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        /* Repel Effect */
        .repel-container {
          height: 200px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          padding: 2rem;
          max-width: 300px;
          margin: 0 auto 1.5rem;
          background: rgba(0,0,0,0.2);
          border-radius: 1rem;
        }
        
        .repel-dot {
          width: 40px;
          height: 40px;
          background: rgba(74, 222, 128, 0.3);
          border: 2px solid #4ade80;
          border-radius: 50%;
          margin: auto;
          transition: transform 0.15s ease-out;
        }
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
          .magnetic-char {
            font-size: 2rem;
          }
          .icons-container {
            gap: 1rem;
          }
          .icon-magnetic-area {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">Magnetic Hover</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>Magnetic Hover</h1>
        <p>
          Elements that subtly follow your cursor, creating a magnetic interaction.
          These effects add a playful, responsive feel to UI elements.
        </p>
      </div>

      <div className="demos-container">
        <MagneticButton />
        <MagneticIcons />
        <MagneticText />
        <MagneticGlowCard />
        <RepelEffect />
      </div>
    </div>
  );
}
