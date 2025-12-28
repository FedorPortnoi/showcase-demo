import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Demo 1: Floating Particles
const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Floating Particles</h3>
      <p className="demo-description">Simple particles floating randomly with boundary bounce</p>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="demo-canvas" />
      </div>
      <code className="demo-code">30 particles • random velocity • boundary collision</code>
    </div>
  );
};

// Demo 2: Mouse Attraction
const MouseAttraction = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      originX: 0,
      originY: 0,
      vx: 0,
      vy: 0,
      radius: Math.random() * 2 + 1,
    }));
    
    particles.forEach(p => {
      p.originX = p.x;
      p.originY = p.y;
    });

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      
      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += dx * force * 0.02;
          p.vy += dy * force * 0.02;
        }
        
        // Return to origin
        p.vx += (p.originX - p.x) * 0.02;
        p.vy += (p.originY - p.y) * 0.02;
        
        // Damping
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Mouse Attraction</h3>
      <p className="demo-description">Particles are attracted to your cursor then return to origin</p>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="demo-canvas" />
      </div>
      <code className="demo-code">Move your mouse over the canvas</code>
    </div>
  );
};

// Demo 3: Connected Network
const ConnectedNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const nodes = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw connections
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.3 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Connected Network</h3>
      <p className="demo-description">Nodes connect when close together, creating a neural network effect</p>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="demo-canvas" />
      </div>
      <code className="demo-code">25 nodes • 100px connection radius • dynamic links</code>
    </div>
  );
};

// Demo 4: Particle Trail
const ParticleTrail = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Add trail particle
      trailRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        life: 1,
        size: Math.random() * 4 + 2,
      });
      
      // Limit trail length
      if (trailRef.current.length > 50) {
        trailRef.current.shift();
      }
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      trailRef.current.forEach((p, i) => {
        p.life -= 0.02;
        
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74, 222, 128, ${p.life * 0.6})`;
          ctx.fill();
        }
      });
      
      // Remove dead particles
      trailRef.current = trailRef.current.filter(p => p.life > 0);
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Particle Trail</h3>
      <p className="demo-description">Particles spawn and fade along your cursor path</p>
      <div className="canvas-container">
        <canvas ref={canvasRef} className="demo-canvas" />
      </div>
      <code className="demo-code">Move your mouse to create a trail</code>
    </div>
  );
};

// Main Page
export default function ParticleSystems() {
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
        
        .canvas-container {
          background: rgba(0,0,0,0.3);
          border-radius: 1rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        
        .demo-canvas {
          width: 100%;
          height: 300px;
          display: block;
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
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
          .demo-canvas {
            height: 200px;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">Particle Systems</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>Particle Systems</h1>
        <p>
          Interactive particle networks that respond to cursor movement with physics-based animations.
          Each demo uses lightweight canvas rendering for smooth 60fps performance.
        </p>
      </div>

      <div className="demos-container">
        <FloatingParticles />
        <MouseAttraction />
        <ConnectedNetwork />
        <ParticleTrail />
      </div>
    </div>
  );
}
