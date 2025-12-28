import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Demo 1: Basic Glass Card
const BasicGlass = () => {
  return (
    <div className="demo-section">
      <h3 className="demo-title">Basic Glass Card</h3>
      <p className="demo-description">Simple frosted glass effect with backdrop-filter</p>
      <div className="glass-demo-bg">
        <div className="color-blob blob-1" />
        <div className="color-blob blob-2" />
        <div className="basic-glass-card">
          <h4>Glass Card</h4>
          <p>This card uses backdrop-filter: blur() to create the frosted glass effect.</p>
        </div>
      </div>
      <code className="demo-code">backdrop-filter: blur(20px) • background: rgba(255,255,255,0.05)</code>
    </div>
  );
};

// Demo 2: Layered Glass
const LayeredGlass = () => {
  return (
    <div className="demo-section">
      <h3 className="demo-title">Layered Glass</h3>
      <p className="demo-description">Multiple glass layers with varying opacity</p>
      <div className="glass-demo-bg">
        <div className="color-blob blob-3" />
        <div className="color-blob blob-4" />
        <div className="layered-container">
          <div className="layer layer-1">Layer 1</div>
          <div className="layer layer-2">Layer 2</div>
          <div className="layer layer-3">Layer 3</div>
        </div>
      </div>
      <code className="demo-code">Stacked layers with increasing blur intensity</code>
    </div>
  );
};

// Demo 3: Glass Navigation
const GlassNav = () => {
  const [active, setActive] = useState(0);
  const items = ['Home', 'Products', 'About', 'Contact'];

  return (
    <div className="demo-section">
      <h3 className="demo-title">Glass Navigation</h3>
      <p className="demo-description">A floating navigation bar with glass effect</p>
      <div className="glass-demo-bg nav-bg">
        <div className="color-blob blob-5" />
        <nav className="glass-nav">
          {items.map((item, i) => (
            <button
              key={item}
              className={`nav-item ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <code className="demo-code">Click to see active state transition</code>
    </div>
  );
};

// Demo 4: Glass Input Fields
const GlassInputs = () => {
  return (
    <div className="demo-section">
      <h3 className="demo-title">Glass Form Elements</h3>
      <p className="demo-description">Input fields and buttons with glass styling</p>
      <div className="glass-demo-bg form-bg">
        <div className="color-blob blob-6" />
        <div className="color-blob blob-7" />
        <div className="glass-form">
          <input type="text" className="glass-input" placeholder="Your email" />
          <input type="password" className="glass-input" placeholder="Password" />
          <button className="glass-button">Sign In</button>
        </div>
      </div>
      <code className="demo-code">backdrop-filter on form elements with focus states</code>
    </div>
  );
};

// Demo 5: Glass Modal
const GlassModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="demo-section">
      <h3 className="demo-title">Glass Modal</h3>
      <p className="demo-description">A modal dialog with glass morphism styling</p>
      <div className="modal-trigger-area">
        <button className="trigger-button" onClick={() => setIsOpen(true)}>
          Open Modal
        </button>
      </div>
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="glass-modal" onClick={e => e.stopPropagation()}>
            <h4>Glass Modal</h4>
            <p>This is a modal with frosted glass effect. Click outside to close.</p>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <code className="demo-code">Click the button to see the glass modal</code>
    </div>
  );
};

// Main Page
export default function GlassMorphism() {
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
        
        /* Glass Demo Background */
        .glass-demo-bg {
          position: relative;
          height: 280px;
          background: #0a0a0a;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .color-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }
        
        .blob-1 {
          width: 200px;
          height: 200px;
          background: #4ade80;
          top: -50px;
          left: -50px;
          opacity: 0.4;
        }
        
        .blob-2 {
          width: 150px;
          height: 150px;
          background: #8b5cf6;
          bottom: -30px;
          right: -30px;
          opacity: 0.4;
        }
        
        .blob-3 {
          width: 180px;
          height: 180px;
          background: #f472b6;
          top: 20%;
          left: 10%;
          opacity: 0.3;
        }
        
        .blob-4 {
          width: 160px;
          height: 160px;
          background: #38bdf8;
          bottom: 10%;
          right: 20%;
          opacity: 0.3;
        }
        
        .blob-5 {
          width: 300px;
          height: 150px;
          background: linear-gradient(90deg, #4ade80, #8b5cf6);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.3;
        }
        
        .blob-6 {
          width: 120px;
          height: 120px;
          background: #4ade80;
          top: 10%;
          right: 20%;
          opacity: 0.4;
        }
        
        .blob-7 {
          width: 100px;
          height: 100px;
          background: #f472b6;
          bottom: 20%;
          left: 15%;
          opacity: 0.3;
        }
        
        /* Basic Glass Card */
        .basic-glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 300px;
          text-align: center;
        }
        
        .basic-glass-card h4 {
          margin: 0 0 0.75rem;
          font-size: 1.25rem;
        }
        
        .basic-glass-card p {
          margin: 0;
          color: #aaa;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        /* Layered Glass */
        .layered-container {
          position: relative;
          width: 300px;
          height: 180px;
        }
        
        .layer {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1rem;
          font-size: 0.875rem;
          color: #aaa;
        }
        
        .layer-1 {
          width: 200px;
          height: 100px;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        .layer-2 {
          width: 200px;
          height: 100px;
          top: 40px;
          left: 50px;
          z-index: 2;
          backdrop-filter: blur(15px);
        }
        
        .layer-3 {
          width: 200px;
          height: 100px;
          top: 80px;
          left: 100px;
          z-index: 3;
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.08);
        }
        
        /* Glass Navigation */
        .nav-bg {
          height: 150px;
        }
        
        .glass-nav {
          display: flex;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          padding: 0.25rem;
        }
        
        .nav-item {
          background: none;
          border: none;
          color: #888;
          padding: 0.75rem 1.25rem;
          border-radius: 1.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }
        
        .nav-item:hover {
          color: white;
        }
        
        .nav-item.active {
          background: rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }
        
        /* Glass Form */
        .form-bg {
          height: 320px;
        }
        
        .glass-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 280px;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }
        
        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.875rem 1rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .glass-input::placeholder {
          color: #666;
        }
        
        .glass-input:focus {
          border-color: rgba(74, 222, 128, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .glass-button {
          background: rgba(74, 222, 128, 0.2);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 0.5rem;
          padding: 0.875rem 1rem;
          color: #4ade80;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(74, 222, 128, 0.3);
        }
        
        /* Glass Modal */
        .modal-trigger-area {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .trigger-button {
          background: rgba(74, 222, 128, 0.2);
          border: 1px solid rgba(74, 222, 128, 0.3);
          border-radius: 0.5rem;
          padding: 1rem 2rem;
          color: #4ade80;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .trigger-button:hover {
          background: rgba(74, 222, 128, 0.3);
          transform: scale(1.02);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .glass-modal {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
          text-align: center;
          animation: scaleIn 0.3s ease;
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .glass-modal h4 {
          margin: 0 0 1rem;
          font-size: 1.5rem;
        }
        
        .glass-modal p {
          margin: 0 0 1.5rem;
          color: #aaa;
          line-height: 1.6;
        }
        
        .modal-close {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .modal-close:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        @media (max-width: 640px) {
          .page-intro h1 {
            font-size: 2rem;
          }
          .glass-demo-bg {
            height: 240px;
          }
        }
      `}</style>

      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Showcase
        </Link>
        <span className="page-title">Glass Morphism</span>
        <div style={{ width: 100 }} />
      </header>

      <div className="page-intro">
        <h1>Glass Morphism</h1>
        <p>
          Frosted glass effects with subtle transparency and backdrop blur.
          A modern design trend that adds depth and elegance to interfaces.
        </p>
      </div>

      <div className="demos-container">
        <BasicGlass />
        <LayeredGlass />
        <GlassNav />
        <GlassInputs />
        <GlassModal />
      </div>
    </div>
  );
}
