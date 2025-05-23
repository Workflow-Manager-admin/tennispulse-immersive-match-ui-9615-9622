import React, { useState, useEffect } from 'react';
import { PlayerInfo, ScoreBoard, CourtView, MatchStats, LiveUpdates } from './index';
import { useMatchContext } from '../context/MatchContext';
import '../styles/MatchContainer.css';

// PUBLIC_INTERFACE
/**
 * MatchContainer - The main container component for TennisPulse match UI
 * 
 * This component serves as the primary container for the tennis match interface,
 * orchestrating the layout and interaction of all sub-components to create
 * an immersive tennis match viewing experience.
 * 
 * @returns {React.Component} The rendered MatchContainer component
 */
const MatchContainer = () => {
  const { matchData, isLive, updatePoint } = useMatchContext();
  const [animating, setAnimating] = useState(false);
  const [highlightMoment, setHighlightMoment] = useState(null);

  // Handle interactive elements and animations
  useEffect(() => {
    if (isLive && highlightMoment) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        setHighlightMoment(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLive, highlightMoment]);

  // Handle point update with animation
  const handlePointUpdate = (player, pointType) => {
    setHighlightMoment({ player, pointType });
    updatePoint(player, pointType);
  };

  return (
    <div className={`match-container ${animating ? 'animating' : ''}`}>
      <div className="match-header">
        <h1 className="match-title">
          {matchData.tournament.name} - {matchData.round}
        </h1>
        <div className="match-status">
          {isLive ? (
            <span className="live-indicator">LIVE</span>
          ) : (
            <span className="match-time">{matchData.scheduledTime}</span>
          )}
        </div>
      </div>

      <div className="main-display-area">
        <div className="player-section">
          <PlayerInfo 
            player={matchData.player1} 
            position="left" 
            isServing={matchData.player1.isServing} 
            highlight={highlightMoment?.player === 'player1'}
          />
          
          <ScoreBoard 
            sets={matchData.sets}
            currentGame={matchData.currentGame} 
            player1={matchData.player1}
            player2={matchData.player2}
            isLive={isLive}
          />
          
          <PlayerInfo 
            player={matchData.player2} 
            position="right" 
            isServing={matchData.player2.isServing} 
            highlight={highlightMoment?.player === 'player2'}
          />
        </div>

        <CourtView 
          matchData={matchData}
          isLive={isLive}
          lastPoint={matchData.lastPoint}
          highlightMoment={highlightMoment}
        />
      </div>

      <div className="match-details-area">
        <MatchStats 
          player1Stats={matchData.player1.statistics}
          player2Stats={matchData.player2.statistics}
          setNumber={matchData.currentSet}
        />
        
        <LiveUpdates 
          updates={matchData.updates}
          isLive={isLive}
          onPointUpdate={handlePointUpdate}
        />
      </div>
      
      <div className="match-controls">
        {isLive ? (
          <div className="action-buttons">
            <button className="btn">Previous Point</button>
            <button className="btn highlight">Current Point</button>
            <button className="btn">Match Stats</button>
          </div>
        ) : (
          <div className="notification-area">
            Match starts in {matchData.timeUntilStart || 'soon'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchContainer;
