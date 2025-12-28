import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Reusable Scroll Reveal Hook
const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// Demo 1: Fade Up
const FadeUpDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Fade Up</h3>
      <p className="demo-description">Elements rise from below as they enter the viewport</p>
      <div className="demo-container">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="demo-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            }}
          >
            <div className="card-icon">↑</div>
            <span>Card {i}</span>
          </div>
        ))}
      </div>
      <code className="demo-code">transform: translateY(40px) → translateY(0)</code>
    </div>
  );
};

// Demo 2: Fade In Scale
const FadeScaleDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Scale In</h3>
      <p className="demo-description">Elements grow from a smaller size with a bounce effect</p>
      <div className="demo-container">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="demo-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`,
            }}
          >
            <div className="card-icon">⬡</div>
            <span>Scale {i}</span>
          </div>
        ))}
      </div>
      <code className="demo-code">transform: scale(0.8) → scale(1)</code>
    </div>
  );
};

// Demo 3: Slide From Sides
const SlideDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Slide From Sides</h3>
      <p className="demo-description">Elements slide in from left and right alternately</p>
      <div className="demo-container-vertical">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="demo-card-wide"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? 'translateX(0)' 
                : `translateX(${i % 2 === 0 ? '60px' : '-60px'})`,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
            }}
          >
            <span>{i % 2 === 0 ? '→' : '←'} Slide Item {i}</span>
          </div>
        ))}
      </div>
      <code className="demo-code">translateX(±60px) → translateX(0)</code>
    </div>
  );
};

// Demo 4: Staggered Grid
const StaggeredGridDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.2);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Staggered Grid</h3>
      <p className="demo-description">Grid items appear one by one with cascading delays</p>
      <div className="demo-grid">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="grid-item"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <code className="demo-code">delay: index × 0.05s</code>
    </div>
  );
};

// Demo 5: Blur Reveal
const BlurRevealDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Blur Reveal</h3>
      <p className="demo-description">Text sharpens from blur as it enters view</p>
      <div className="demo-container-center">
        <h2
          className="blur-text"
          style={{
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? 'blur(0px)' : 'blur(10px)',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Crystal Clear
        </h2>
        <p
          style={{
            opacity: isVisible ? 0.6 : 0,
            filter: isVisible ? 'blur(0px)' : 'blur(8px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          This text reveals with a blur-to-sharp effect
        </p>
      </div>
      <code className="demo-code">filter: blur(10px) → blur(0px)</code>
    </div>
  );
};

// Demo 6: Rotate In
const RotateInDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Rotate In</h3>
      <p className="demo-description">Elements rotate into position</p>
      <div className="demo-container">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="demo-card rotate-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? 'rotate(0deg) scale(1)' 
                : `rotate(${-15 + i * 10}deg) scale(0.8)`,
              transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`,
            }}
          >
            <div className="card-icon">◇</div>
            <span>Rotate {i}</span>
          </div>
        ))}
      </div>
      <code className="demo-code">rotate(-15deg) → rotate(0deg)</code>
    </div>
  );
};

// Demo 7: Flip In
const FlipInDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">3D Flip</h3>
      <p className="demo-description">Cards flip in from a 3D rotation</p>
      <div className="demo-container" style={{ perspective: '1000px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="demo-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? 'rotateX(0deg)' 
                : 'rotateX(-90deg)',
              transformOrigin: 'top center',
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            }}
          >
            <div className="card-icon">▢</div>
            <span>Flip {i}</span>
          </div>
        ))}
      </div>
      <code className="demo-code">rotateX(-90deg) → rotateX(0deg)</code>
    </div>
  );
};

// Demo 8: Counter Animation (bonus)
const CounterDemo = () => {
  const [ref, isVisible] = useScrollReveal(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = 1234;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Number Counter</h3>
      <p className="demo-description">Numbers animate up when scrolled into view</p>
      <div className="demo-container-center">
        <div className="counter-display">
          <span className="counter-number">{count.toLocaleString()}</span>
          <span className="counter-label">Total Users</span>
        </div>
      </div>
      <code className="demo-code">requestAnimationFrame + easing</code>
    </div>
  );
};

// Main Page Component
export default function ScrollAnimations() {
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
          margin-bottom: 8rem;
          padding: 3rem;
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
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        
        .demo-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        
        .demo-container-vertical {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .demo-container-center {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .demo-card {
          width: 140px;
          height: 140px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #aaa;
        }
        
        .demo-card-wide {
          padding: 1.25rem 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          color: #aaa;
        }
        
        .card-icon {
          font-size: 1.5rem;
          color: #4ade80;
        }
        
        .demo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 300px;
          margin: 0 auto 2rem;
        }
        
        .grid-item {
          aspect-ratio: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #4ade80;
        }
        
        .blur-text {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .counter-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .counter-number {
          font-size: 4rem;
          font-weight: 700;
          color: #4ade80;
          font-variant-numeric: tabular-nums;
        }
        
        .counter-label {
          color: #666;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
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
        
        .spacer {
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          font-size: 0.875rem;
        }
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
          .demo-section {
            padding: 1.5rem;
          }
          .blur-text {
            font-size: 2rem;
          }
          .counter-number {
            font-size: 3rem;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">Scroll Animations</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>Scroll Animations</h1>
        <p>
          Elements gracefully reveal as you scroll, creating an immersive storytelling experience.
          Scroll down to see each animation trigger as it enters your viewport.
        </p>
      </div>

      <div className="spacer">↓ Scroll down to see animations ↓</div>

      <div className="demos-container">
        <FadeUpDemo />
        <FadeScaleDemo />
        <SlideDemo />
        <StaggeredGridDemo />
        <BlurRevealDemo />
        <RotateInDemo />
        <FlipInDemo />
        <CounterDemo />
      </div>
    </div>
  );
}
