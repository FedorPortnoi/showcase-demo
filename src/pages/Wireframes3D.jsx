import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Demo 1: Rotating Cube
const RotatingCube = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 45 });

  useEffect(() => {
    let angle = 0;
    const animate = () => {
      angle += 0.5;
      setRotation({ x: -20, y: angle });
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Rotating Cube</h3>
      <p className="demo-description">A wireframe cube with continuous rotation</p>
      <div className="scene">
        <div 
          className="cube"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          <div className="cube-face front">Front</div>
          <div className="cube-face back">Back</div>
          <div className="cube-face right">Right</div>
          <div className="cube-face left">Left</div>
          <div className="cube-face top">Top</div>
          <div className="cube-face bottom">Bottom</div>
        </div>
      </div>
      <code className="demo-code">CSS transform-style: preserve-3d</code>
    </div>
  );
};

// Demo 2: Interactive Card
const InteractiveCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">3D Tilt Card</h3>
      <p className="demo-description">Card tilts based on mouse position</p>
      <div className="card-scene">
        <div
          ref={cardRef}
          className="tilt-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className="card-content">
            <div className="card-icon-large">◇</div>
            <h4>Hover Me</h4>
            <p>Move your cursor around</p>
          </div>
          <div className="card-shine" style={{
            background: `radial-gradient(circle at ${50 + rotation.y * 2}% ${50 - rotation.x * 2}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
          }} />
        </div>
      </div>
      <code className="demo-code">perspective + rotateX/Y based on mouse position</code>
    </div>
  );
};

// Demo 3: Spinning Ring
const SpinningRing = () => {
  return (
    <div className="demo-section">
      <h3 className="demo-title">Spinning Rings</h3>
      <p className="demo-description">Concentric rings rotating on different axes</p>
      <div className="ring-scene">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div className="ring-center">●</div>
      </div>
      <code className="demo-code">CSS @keyframes with different rotation axes</code>
    </div>
  );
};

// Demo 4: Pyramid
const Pyramid = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let angle = 0;
    const animate = () => {
      angle += 0.3;
      setRotation(angle);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Wireframe Pyramid</h3>
      <p className="demo-description">A 3D pyramid constructed with CSS triangles</p>
      <div className="pyramid-scene">
        <div 
          className="pyramid"
          style={{ transform: `rotateX(-20deg) rotateY(${rotation}deg)` }}
        >
          <div className="pyramid-face face-1" />
          <div className="pyramid-face face-2" />
          <div className="pyramid-face face-3" />
          <div className="pyramid-face face-4" />
          <div className="pyramid-base" />
        </div>
      </div>
      <code className="demo-code">CSS clip-path for triangular faces</code>
    </div>
  );
};

// Main Page
export default function Wireframes3D() {
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
        
        /* Cube Styles */
        .scene {
          perspective: 600px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .cube {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.05s linear;
        }
        
        .cube-face {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(74, 222, 128, 0.5);
          background: rgba(74, 222, 128, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: rgba(74, 222, 128, 0.7);
          backface-visibility: visible;
        }
        
        .cube-face.front  { transform: translateZ(60px); }
        .cube-face.back   { transform: rotateY(180deg) translateZ(60px); }
        .cube-face.right  { transform: rotateY(90deg) translateZ(60px); }
        .cube-face.left   { transform: rotateY(-90deg) translateZ(60px); }
        .cube-face.top    { transform: rotateX(90deg) translateZ(60px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(60px); }
        
        /* Tilt Card Styles */
        .card-scene {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .tilt-card {
          width: 250px;
          height: 180px;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(74, 222, 128, 0.05));
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 1rem;
          position: relative;
          transition: transform 0.1s ease-out;
          cursor: pointer;
          overflow: hidden;
        }
        
        .card-content {
          padding: 2rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .card-icon-large {
          font-size: 2rem;
          color: #4ade80;
          margin-bottom: 0.5rem;
        }
        
        .card-content h4 {
          margin: 0 0 0.5rem;
          font-weight: 600;
        }
        
        .card-content p {
          margin: 0;
          color: #666;
          font-size: 0.875rem;
        }
        
        .card-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        /* Ring Styles */
        .ring-scene {
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          perspective: 800px;
          position: relative;
        }
        
        .ring {
          position: absolute;
          border: 2px solid rgba(74, 222, 128, 0.4);
          border-radius: 50%;
        }
        
        .ring-1 {
          width: 150px;
          height: 150px;
          animation: spin1 4s linear infinite;
        }
        
        .ring-2 {
          width: 120px;
          height: 120px;
          animation: spin2 3s linear infinite;
        }
        
        .ring-3 {
          width: 90px;
          height: 90px;
          animation: spin3 2s linear infinite;
        }
        
        .ring-center {
          position: absolute;
          color: #4ade80;
          font-size: 1rem;
        }
        
        @keyframes spin1 {
          from { transform: rotateX(60deg) rotateZ(0deg); }
          to { transform: rotateX(60deg) rotateZ(360deg); }
        }
        
        @keyframes spin2 {
          from { transform: rotateY(60deg) rotateZ(0deg); }
          to { transform: rotateY(60deg) rotateZ(360deg); }
        }
        
        @keyframes spin3 {
          from { transform: rotateX(30deg) rotateY(30deg) rotateZ(0deg); }
          to { transform: rotateX(30deg) rotateY(30deg) rotateZ(360deg); }
        }
        
        /* Pyramid Styles */
        .pyramid-scene {
          perspective: 800px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .pyramid {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
        }
        
        .pyramid-face {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-bottom: 100px solid rgba(74, 222, 128, 0.15);
          transform-origin: bottom center;
        }
        
        .pyramid-face::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60px;
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-bottom: 100px solid transparent;
          border-bottom-color: rgba(74, 222, 128, 0.4);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .face-1 { transform: translateZ(60px) rotateX(30deg); }
        .face-2 { transform: rotateY(90deg) translateZ(60px) rotateX(30deg); }
        .face-3 { transform: rotateY(180deg) translateZ(60px) rotateX(30deg); }
        .face-4 { transform: rotateY(270deg) translateZ(60px) rotateX(30deg); }
        
        .pyramid-base {
          position: absolute;
          width: 120px;
          height: 120px;
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.3);
          transform: rotateX(90deg) translateZ(-50px);
        }
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">3D Wireframes</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>3D Wireframes</h1>
        <p>
          Elegant wireframe visualizations with smooth rotation and perspective transforms.
          All built with pure CSS 3D transforms — no WebGL required.
        </p>
      </div>

      <div className="demos-container">
        <RotatingCube />
        <InteractiveCard />
        <SpinningRing />
        <Pyramid />
      </div>
    </div>
  );
}
