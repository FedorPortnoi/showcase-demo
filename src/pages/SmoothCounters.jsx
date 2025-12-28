import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Hook for scroll-triggered counter
const useCounterOnView = (target, duration = 2000, threshold = 0.5) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, threshold, hasTriggered]);

  return [ref, count];
};

// Demo 1: Basic Counter
const BasicCounter = () => {
  const [ref, count] = useCounterOnView(1234, 2000);

  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Basic Counter</h3>
      <p className="demo-description">Number animates up when scrolled into view</p>
      <div className="counter-display">
        <span className="counter-number">{count.toLocaleString()}</span>
        <span className="counter-label">Total Users</span>
      </div>
      <code className="demo-code">requestAnimationFrame + ease-out-cubic</code>
    </div>
  );
};

// Demo 2: Multiple Stats
const MultipleStats = () => {
  const [ref1, count1] = useCounterOnView(99, 1500);
  const [ref2, count2] = useCounterOnView(500, 1800);
  const [ref3, count3] = useCounterOnView(24, 1200);
  const [ref4, count4] = useCounterOnView(10, 1000);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Stats Dashboard</h3>
      <p className="demo-description">Multiple counters with staggered timing</p>
      <div className="stats-grid">
        <div ref={ref1} className="stat-card">
          <span className="stat-number">{count1}%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
        <div ref={ref2} className="stat-card">
          <span className="stat-number">{count2}K+</span>
          <span className="stat-label">Downloads</span>
        </div>
        <div ref={ref3} className="stat-card">
          <span className="stat-number">{count3}/7</span>
          <span className="stat-label">Support</span>
        </div>
        <div ref={ref4} className="stat-card">
          <span className="stat-number">{count4}M+</span>
          <span className="stat-label">Revenue</span>
        </div>
      </div>
      <code className="demo-code">Individual observers per stat for natural stagger</code>
    </div>
  );
};

// Demo 3: Decimal Counter
const DecimalCounter = () => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          const target = 4.7;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Rating Counter</h3>
      <p className="demo-description">Smooth decimal animation for ratings</p>
      <div className="rating-display">
        <div className="rating-number">{value.toFixed(1)}</div>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className="star"
              style={{ 
                opacity: value >= star ? 1 : value >= star - 0.5 ? 0.5 : 0.2 
              }}
            >
              ★
            </span>
          ))}
        </div>
        <span className="rating-label">Average Rating</span>
      </div>
      <code className="demo-code">toFixed(1) for decimal precision</code>
    </div>
  );
};

// Demo 4: Countdown Timer
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Countdown Timer</h3>
      <p className="demo-description">Real-time countdown with flip animation</p>
      <div className="countdown-container">
        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-unit">
          <div className="countdown-value flip">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
      <code className="demo-code">setInterval + padStart for formatting</code>
    </div>
  );
};

// Demo 5: Progress Counter
const ProgressCounter = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const target = 73;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const prog = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            setProgress(eased * target);
            if (prog < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <div ref={ref} className="demo-section">
      <h3 className="demo-title">Progress Counter</h3>
      <p className="demo-description">Circular progress with animated percentage</p>
      <div className="progress-display">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle
              className="progress-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="progress-fill"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeDasharray={`${(progress / 100) * 283} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
        <span className="progress-label">Project Completion</span>
      </div>
      <code className="demo-code">SVG circle + strokeDasharray animation</code>
    </div>
  );
};

// Demo 6: Slot Machine Counter
const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [digits, setDigits] = useState([7, 7, 7]);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Random final digits
    const finalDigits = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    // Animate each digit
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Fast random during spin
        setDigits([
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]);
        requestAnimationFrame(animate);
      } else {
        // Final values
        setDigits(finalDigits);
        setIsSpinning(false);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="demo-section">
      <h3 className="demo-title">Slot Machine</h3>
      <p className="demo-description">Randomized spinning digits effect</p>
      <div className="slot-container">
        <div className="slot-display">
          {digits.map((digit, i) => (
            <div key={i} className={`slot-digit ${isSpinning ? 'spinning' : ''}`}>
              {digit}
            </div>
          ))}
        </div>
        <button className="slot-button" onClick={spin} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin!'}
        </button>
      </div>
      <code className="demo-code">Random digit cycling with final reveal</code>
    </div>
  );
};

// Main Page
export default function SmoothCounters() {
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
        
        /* Basic Counter */
        .counter-display {
          text-align: center;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .counter-number {
          display: block;
          font-size: 5rem;
          font-weight: 700;
          color: #4ade80;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .counter-label {
          color: #666;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ade80;
          font-variant-numeric: tabular-nums;
        }
        
        .stat-label {
          color: #666;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* Rating */
        .rating-display {
          text-align: center;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .rating-number {
          font-size: 4rem;
          font-weight: 700;
          color: #4ade80;
          font-variant-numeric: tabular-nums;
        }
        
        .rating-stars {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin: 0.5rem 0;
        }
        
        .star {
          font-size: 1.5rem;
          color: #fbbf24;
          transition: opacity 0.3s ease;
        }
        
        .rating-label {
          color: #666;
          font-size: 0.875rem;
        }
        
        /* Countdown */
        .countdown-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .countdown-unit {
          text-align: center;
        }
        
        .countdown-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          min-width: 70px;
          font-variant-numeric: tabular-nums;
        }
        
        .countdown-value.flip {
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .countdown-label {
          color: #666;
          font-size: 0.7rem;
          text-transform: uppercase;
          margin-top: 0.5rem;
        }
        
        .countdown-separator {
          font-size: 2rem;
          color: #4ade80;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        
        /* Progress Circle */
        .progress-display {
          text-align: center;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .progress-circle {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 1rem;
        }
        
        .progress-circle svg {
          width: 100%;
          height: 100%;
        }
        
        .progress-bg {
          stroke: rgba(255,255,255,0.1);
        }
        
        .progress-fill {
          stroke: #4ade80;
          stroke-linecap: round;
          transition: stroke-dasharray 0.1s ease;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          font-weight: 700;
          color: #4ade80;
        }
        
        .progress-label {
          color: #666;
          font-size: 0.875rem;
        }
        
        /* Slot Machine */
        .slot-container {
          text-align: center;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .slot-display {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .slot-digit {
          font-size: 4rem;
          font-weight: 700;
          color: #4ade80;
          background: rgba(0,0,0,0.3);
          border: 2px solid rgba(74, 222, 128, 0.3);
          border-radius: 0.5rem;
          width: 80px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-variant-numeric: tabular-nums;
        }
        
        .slot-digit.spinning {
          animation: shake 0.1s infinite;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        .slot-button {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          border: none;
          padding: 1rem 2rem;
          border-radius: 2rem;
          color: black;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }
        
        .slot-button:hover:not(:disabled) {
          transform: scale(1.05);
        }
        
        .slot-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
          .counter-number {
            font-size: 3.5rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .countdown-value {
            font-size: 1.5rem;
            min-width: 50px;
            padding: 0.5rem;
          }
          .countdown-separator {
            font-size: 1.5rem;
          }
          .slot-digit {
            font-size: 2.5rem;
            width: 60px;
            height: 80px;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">Smooth Counters</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>Smooth Counters</h1>
        <p>
          Animated number counters that increment smoothly when scrolled into view.
          These effects add polish and draw attention to important metrics.
        </p>
      </div>

      <div className="demos-container">
        <BasicCounter />
        <MultipleStats />
        <DecimalCounter />
        <CountdownTimer />
        <ProgressCounter />
        <SlotMachine />
      </div>
    </div>
  );
}
