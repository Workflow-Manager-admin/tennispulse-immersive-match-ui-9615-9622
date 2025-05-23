import React from 'react';

// PUBLIC_INTERFACE
/**
 * ScoreBoard - Displays the current tennis match score
 * 
 * This component renders the current game score, set scores, and point score
 * in an immersive tennis match interface.
 * 
 * @param {Array} sets - Array containing set score information
 * @param {Object} currentGame - The current game information
 * @param {Object} player1 - Player 1 data
 * @param {Object} player2 - Player 2 data
 * @param {boolean} isLive - Whether the match is currently live
 * @returns {React.Component} The rendered ScoreBoard component
 */
const ScoreBoard = ({ sets, currentGame, player1, player2, isLive }) => {
  // Tennis scoring system translates numerical scores to "Love", "15", "30", "40", etc.
  const translateTennisScore = (score) => {
    switch (score) {
      case 0: return 'Love';
      case 1: return '15';
      case 2: return '30';
      case 3: return '40';
      case 4: return 'Adv';
      default: return score;
    }
  };

  return (
    <div className={`score-board ${isLive ? 'live' : ''}`}>
      <div className="set-scores">
        {sets.map((set, index) => (
          <div className="set" key={`set-${index}`}>
            <div className="set-number">Set {index + 1}</div>
            <div className={`set-score ${set.winner === 'player1' ? 'winner' : ''}`}>
              {set.player1Score}
            </div>
            <div className={`set-score ${set.winner === 'player2' ? 'winner' : ''}`}>
              {set.player2Score}
            </div>
          </div>
        ))}
      </div>

      <div className="current-game">
        <div className="game-info">
          <span className="game-label">Current Game</span>
          <span className="game-number">Game {currentGame.number}</span>
        </div>
        
        <div className="point-scores">
          <div className={`point-score ${player1.isServing ? 'serving' : ''}`}>
            {currentGame.deuce 
              ? (currentGame.advantage === 'player1' ? 'ADV' : '-')
              : translateTennisScore(currentGame.player1Points)
            }
          </div>
          <div className={`point-score ${player2.isServing ? 'serving' : ''}`}>
            {currentGame.deuce 
              ? (currentGame.advantage === 'player2' ? 'ADV' : '-')
              : translateTennisScore(currentGame.player2Points)
            }
          </div>
        </div>
      </div>
      
      <div className="match-progress">
        <div className="sets-won">
          <div className="sets-label">Sets</div>
          <div className="sets-count">{player1.setsWon}</div>
          <div className="sets-count">{player2.setsWon}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
