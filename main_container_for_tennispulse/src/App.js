import React from 'react';
import './App.css';
import { MatchContainer } from './components';
import { MatchProvider } from './context/MatchContext';

// PUBLIC_INTERFACE
/**
 * App - Main application component
 * 
 * Root component that renders the TennisPulse match UI container
 * with proper context providers.
 * 
 * @returns {React.Component} The rendered application
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">🎾</span> TennisPulse
            </div>
            <div className="nav-actions">
              <button className="btn">Live Matches</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          <div className="match-container-wrapper">
            <MatchProvider>
              <MatchContainer />
            </MatchProvider>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>TennisPulse: Immersive Match UI</p>
            <p className="footer-tagline">Experience tennis like never before</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
