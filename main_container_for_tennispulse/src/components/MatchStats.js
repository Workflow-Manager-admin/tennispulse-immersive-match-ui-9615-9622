import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * MatchStats - Displays detailed tennis match statistics
 * 
 * Shows comprehensive match statistics for both players, including
 * serves, winners, errors, and other key performance metrics.
 * 
 * @param {Object} player1Stats - Statistics for player 1
 * @param {Object} player2Stats - Statistics for player 2
 * @param {number} setNumber - Current set number
 * @returns {React.Component} The rendered MatchStats component
 */
const MatchStats = ({ player1Stats, player2Stats, setNumber }) => {
  const [activeTab, setActiveTab] = useState('overall');
  
  // Filter stats based on active tab
  const getDisplayStats = () => {
    if (activeTab === 'overall') {
      return {
        player1: player1Stats.overall || {},
        player2: player2Stats.overall || {}
      };
    } else {
      return {
        player1: player1Stats.sets?.[setNumber - 1] || {},
        player2: player2Stats.sets?.[setNumber - 1] || {}
      };
    }
  };
  
  const stats = getDisplayStats();

  // Calculate percentage for visual bars
  const calculatePercentage = (value1, value2) => {
    const total = value1 + value2;
    return total === 0 ? 50 : Math.round((value1 / total) * 100);
  };
  
  return (
    <div className="match-stats">
      <div className="stats-header">
        <h3>Match Statistics</h3>
        <div className="stats-tabs">
          <button 
            className={`stats-tab ${activeTab === 'overall' ? 'active' : ''}`}
            onClick={() => setActiveTab('overall')}
          >
            Overall
          </button>
          <button 
            className={`stats-tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Set
          </button>
        </div>
      </div>
      
      <div className="stats-content">
        <div className="stat-row header">
          <div className="stat-value player1">P1</div>
          <div className="stat-label">STAT</div>
          <div className="stat-value player2">P2</div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{stats.player1.aces || 0}</div>
          <div className="stat-label">Aces</div>
          <div className="stat-value player2">{stats.player2.aces || 0}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.aces || 0, stats.player2.aces || 0)}%` }}
            />
          </div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{stats.player1.doubleFaults || 0}</div>
          <div className="stat-label">Double Faults</div>
          <div className="stat-value player2">{stats.player2.doubleFaults || 0}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.doubleFaults || 0, stats.player2.doubleFaults || 0)}%` }}
            />
          </div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{stats.player1.winners || 0}</div>
          <div className="stat-label">Winners</div>
          <div className="stat-value player2">{stats.player2.winners || 0}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.winners || 0, stats.player2.winners || 0)}%` }}
            />
          </div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{stats.player1.unforcedErrors || 0}</div>
          <div className="stat-label">Unforced Errors</div>
          <div className="stat-value player2">{stats.player2.unforcedErrors || 0}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.unforcedErrors || 0, stats.player2.unforcedErrors || 0)}%` }}
            />
          </div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{`${stats.player1.firstServePercentage || 0}%`}</div>
          <div className="stat-label">1st Serve %</div>
          <div className="stat-value player2">{`${stats.player2.firstServePercentage || 0}%`}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.firstServePercentage || 0, stats.player2.firstServePercentage || 0)}%` }}
            />
          </div>
        </div>
        
        <div className="stat-row">
          <div className="stat-value player1">{`${stats.player1.pointsWon || 0}`}</div>
          <div className="stat-label">Total Points Won</div>
          <div className="stat-value player2">{`${stats.player2.pointsWon || 0}`}</div>
          <div className="stat-bar">
            <div 
              className="stat-bar-p1" 
              style={{ width: `${calculatePercentage(stats.player1.pointsWon || 0, stats.player2.pointsWon || 0)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
