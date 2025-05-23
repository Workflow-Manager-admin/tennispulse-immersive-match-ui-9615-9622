import React from 'react';

// PUBLIC_INTERFACE
/**
 * LiveUpdates - Displays real-time tennis match updates
 * 
 * Shows a scrolling feed of live match updates, including points won,
 * game changes, and notable moments during a tennis match.
 * 
 * @param {Array} updates - Array of update objects
 * @param {boolean} isLive - Whether the match is currently live
 * @param {Function} onPointUpdate - Callback for point updates
 * @returns {React.Component} The rendered LiveUpdates component
 */
const LiveUpdates = ({ updates, isLive, onPointUpdate }) => {
  // Demo function to simulate point updates (for development purposes)
  const simulatePoint = (player, pointType) => {
    if (onPointUpdate && isLive) {
      onPointUpdate(player, pointType);
    }
  };

  return (
    <div className="live-updates">
      <div className="updates-header">
        <h3>Live Updates</h3>
        {isLive && <span className="pulse-indicator"></span>}
      </div>
      
      <div className="updates-feed">
        {updates && updates.length > 0 ? (
          updates.map((update, index) => (
            <div 
              key={`update-${index}`} 
              className={`update-item ${update.important ? 'important' : ''} ${update.type || ''}`}
            >
              <div className="update-time">{update.time}</div>
              <div className="update-content">{update.content}</div>
            </div>
          ))
        ) : (
          <div className="no-updates">
            {isLive ? "Match has just begun, updates will appear here." : "Match hasn't started yet."}
          </div>
        )}
      </div>
      
      {isLive && (
        <div className="simulation-controls">
          <p className="simulation-label">Development Controls:</p>
          <div className="simulation-buttons">
            <button 
              className="sim-btn ace" 
              onClick={() => simulatePoint('player1', 'ace')}
            >
              P1 Ace
            </button>
            <button 
              className="sim-btn winner" 
              onClick={() => simulatePoint('player1', 'winner')}
            >
              P1 Winner
            </button>
            <button 
              className="sim-btn fault" 
              onClick={() => simulatePoint('player2', 'fault')}
            >
              P2 Fault
            </button>
            <button 
              className="sim-btn double-fault" 
              onClick={() => simulatePoint('player2', 'doubleFault')}
            >
              P2 Double Fault
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveUpdates;
