import React from 'react';

// PUBLIC_INTERFACE
/**
 * PlayerInfo - Displays tennis player information
 * 
 * This component renders player information including name, country, ranking,
 * image, and serving status in the tennis match interface.
 * 
 * @param {Object} player - The player data object
 * @param {string} position - Display position (left/right)
 * @param {boolean} isServing - Whether the player is currently serving
 * @param {boolean} highlight - Whether to highlight this player
 * @returns {React.Component} The rendered PlayerInfo component
 */
const PlayerInfo = ({ player, position, isServing, highlight }) => {
  return (
    <div className={`player-info ${position} ${highlight ? 'highlight' : ''}`}>
      <div className="player-flag-container">
        <span className="player-country">{player.country}</span>
        {player.countryCode && (
          <img 
            src={`https://flagcdn.com/w20/${player.countryCode.toLowerCase()}.png`} 
            alt={`${player.country} flag`}
            className="player-flag"
          />
        )}
      </div>

      <div className="player-main-details">
        <div className="player-name-container">
          <h2 className="player-name">{player.name}</h2>
          {isServing && <span className="serving-indicator">Serving</span>}
        </div>
        
        <div className="player-ranking">
          World Rank: <span className="rank-number">#{player.ranking}</span>
        </div>
      </div>

      <div className="player-image-container">
        {player.image ? (
          <img src={player.image} alt={player.name} className="player-image" />
        ) : (
          <div className="player-image-placeholder">
            {player.name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
