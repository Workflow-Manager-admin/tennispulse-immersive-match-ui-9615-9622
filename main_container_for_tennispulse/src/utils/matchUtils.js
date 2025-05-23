/**
 * Match utility functions for TennisPulse
 * 
 * Contains helper functions for tennis match logic, score calculations,
 * and data transformations.
 */

// PUBLIC_INTERFACE
/**
 * Updates the match score based on a point result
 * 
 * @param {Object} matchData - Current match data
 * @param {string} player - Player who won the point ('player1' or 'player2')
 * @param {string} pointType - Type of point ('ace', 'winner', 'fault', etc.)
 * @returns {Object} Updated match data
 */
export const updateMatchScore = (matchData, player, pointType) => {
  if (!matchData || !player) return matchData;
  
  // Create a deep copy of the match data
  const updatedMatch = JSON.parse(JSON.stringify(matchData));
  const currentGame = updatedMatch.currentGame;
  const isPlayer1 = player === 'player1';
  
  // Update statistics based on point type
  updateStatistics(updatedMatch, player, pointType);
  
  // Update ball trajectory for visualization (simplified)
  updateBallTrajectory(updatedMatch, player, pointType);
  
  // Regular game scoring logic
  if (!currentGame.deuce) {
    // Regular scoring: 0, 15, 30, 40, Game
    if (isPlayer1) {
      currentGame.player1Points++;
    } else {
      currentGame.player2Points++;
    }
    
    // Check for deuce
    if (currentGame.player1Points >= 3 && currentGame.player2Points >= 3 
        && currentGame.player1Points === currentGame.player2Points) {
      currentGame.deuce = true;
      currentGame.advantage = null;
      currentGame.player1Points = 3;
      currentGame.player2Points = 3;
    }
    // Check for game win
    else if (currentGame.player1Points >= 4 && currentGame.player1Points >= currentGame.player2Points + 2) {
      // Player 1 wins game
      return winGame(updatedMatch, 'player1');
    }
    else if (currentGame.player2Points >= 4 && currentGame.player2Points >= currentGame.player1Points + 2) {
      // Player 2 wins game
      return winGame(updatedMatch, 'player2');
    }
  } 
  // Deuce scoring logic
  else {
    if (currentGame.advantage === player) {
      // Player wins game after having advantage
      return winGame(updatedMatch, player);
    } 
    else if (currentGame.advantage === null) {
      // Player gets advantage
      currentGame.advantage = player;
    } 
    else {
      // Back to deuce
      currentGame.advantage = null;
    }
  }
  
  // Check if this is a serve-related point type
  if (pointType === 'ace' || pointType === 'fault' || pointType === 'doubleFault') {
    updatedMatch.lastPoint = {
      ...updatedMatch.lastPoint,
      serveSpeed: Math.floor(Math.random() * 40) + 160, // Random speed between 160-200 km/h
    };
  }

  return updatedMatch;
};

// PUBLIC_INTERFACE
/**
 * Format a tennis score for display
 * 
 * @param {number} scoreValue - The numerical score value
 * @returns {string} Formatted tennis score (Love, 15, 30, 40, etc.)
 */
export const formatTennisScore = (scoreValue) => {
  switch (scoreValue) {
    case 0: return "Love";
    case 1: return "15";
    case 2: return "30";
    case 3: return "40";
    default: return scoreValue.toString();
  }
};

// Handle when a player wins a game
const winGame = (matchData, winner) => {
  const currentSet = matchData.currentSet - 1;
  const sets = matchData.sets;
  const isPlayer1 = winner === 'player1';
  
  // Update set score
  if (isPlayer1) {
    sets[currentSet].player1Score++;
  } else {
    sets[currentSet].player2Score++;
  }
  
  // Check if player won the set
  if (sets[currentSet].player1Score >= 6 && 
      sets[currentSet].player1Score >= sets[currentSet].player2Score + 2) {
    sets[currentSet].winner = 'player1';
    matchData.player1.setsWon++;
    
    // Check if player won the match
    if (matchData.player1.setsWon > matchData.bestOf / 2) {
      matchData.winner = 'player1';
      matchData.isComplete = true;
    } else {
      // New set
      matchData.currentSet++;
      sets.push({
        player1Score: 0,
        player2Score: 0,
        winner: null,
        games: []
      });
    }
  } 
  else if (sets[currentSet].player2Score >= 6 && 
           sets[currentSet].player2Score >= sets[currentSet].player1Score + 2) {
    sets[currentSet].winner = 'player2';
    matchData.player2.setsWon++;
    
    // Check if player won the match
    if (matchData.player2.setsWon > matchData.bestOf / 2) {
      matchData.winner = 'player2';
      matchData.isComplete = true;
    } else {
      // New set
      matchData.currentSet++;
      sets.push({
        player1Score: 0,
        player2Score: 0,
        winner: null,
        games: []
      });
    }
  }
  
  // Toggle server for new game
  matchData.player1.isServing = !matchData.player1.isServing;
  matchData.player2.isServing = !matchData.player2.isServing;
  
  // Start new game
  matchData.currentGame = {
    number: matchData.currentGame.number + 1,
    player1Points: 0,
    player2Points: 0,
    deuce: false,
    advantage: null
  };
  
  return matchData;
};

// Update player statistics based on point type
const updateStatistics = (matchData, player, pointType) => {
  const isPlayer1 = player === 'player1';
  const playerStats = isPlayer1 ? 
    matchData.player1.statistics : 
    matchData.player2.statistics;
  
  // Update overall stats
  if (!playerStats.overall) playerStats.overall = {};
  const overall = playerStats.overall;
  
  // Update current set stats
  const currentSetIndex = matchData.currentSet - 1;
  if (!playerStats.sets) playerStats.sets = [];
  if (!playerStats.sets[currentSetIndex]) playerStats.sets[currentSetIndex] = {};
  const currentSet = playerStats.sets[currentSetIndex];
  
  // Update based on point type
  switch(pointType) {
    case 'ace':
      overall.aces = (overall.aces || 0) + 1;
      currentSet.aces = (currentSet.aces || 0) + 1;
      break;
    case 'winner':
      overall.winners = (overall.winners || 0) + 1;
      currentSet.winners = (currentSet.winners || 0) + 1;
      break;
    case 'fault':
      // Just a first serve fault, update first serve percentage
      const totalServes = (overall.firstServeAttempts || 0) + 1;
      overall.firstServeAttempts = totalServes;
      const successfulServes = (overall.firstServeIn || 0);
      overall.firstServePercentage = Math.round((successfulServes / totalServes) * 100);
      
      // Do the same for current set
      const setTotalServes = (currentSet.firstServeAttempts || 0) + 1;
      currentSet.firstServeAttempts = setTotalServes;
      const setSuccessfulServes = (currentSet.firstServeIn || 0);
      currentSet.firstServePercentage = Math.round((setSuccessfulServes / setTotalServes) * 100);
      break;
    case 'doubleFault':
      overall.doubleFaults = (overall.doubleFaults || 0) + 1;
      currentSet.doubleFaults = (currentSet.doubleFaults || 0) + 1;
      break;
    case 'unforcedError':
      overall.unforcedErrors = (overall.unforcedErrors || 0) + 1;
      currentSet.unforcedErrors = (currentSet.unforcedErrors || 0) + 1;
      break;
    default:
      // Generic point update
      overall.pointsWon = (overall.pointsWon || 0) + 1;
      currentSet.pointsWon = (currentSet.pointsWon || 0) + 1;
  }
};

// Generate a simulated ball trajectory for the court view
const updateBallTrajectory = (matchData, player, pointType) => {
  // Create a simulated trajectory based on point type
  let trajectory = [];
  let player1Position = { x: 0.15, y: 0.5 };  // Default left side
  let player2Position = { x: 0.85, y: 0.5 };  // Default right side
  
  const isPlayer1Action = player === 'player1';
  
  // Generate random rally positions
  switch(pointType) {
    case 'ace':
      // Direct serve that opponent doesn't touch
      trajectory = [
        { x: isPlayer1Action ? 0.15 : 0.85, y: 0.85 },
        { x: isPlayer1Action ? 0.75 : 0.25, y: 0.15 }
      ];
      break;
      
    case 'winner':
      // Multi-point rally ending in winner
      trajectory = [];
      // Start with serve
      trajectory.push({ x: isPlayer1Action ? 0.15 : 0.85, y: 0.85 });
      trajectory.push({ x: isPlayer1Action ? 0.75 : 0.25, y: 0.15 });
      
      // Add 3-5 more rally shots
      const rallyLength = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < rallyLength; i++) {
        const isEven = i % 2 === 0;
        trajectory.push({ 
          x: (isEven ? 0.3 : 0.7) + (Math.random() * 0.2 - 0.1),
          y: 0.2 + Math.random() * 0.6
        });
      }
      
      // Final winner shot
      trajectory.push({ 
        x: isPlayer1Action ? 0.9 : 0.1, 
        y: 0.1 + Math.random() * 0.8 
      });
      
      // Update player positions
      player1Position = { 
        x: isPlayer1Action ? 0.3 : 0.1, 
        y: 0.2 + Math.random() * 0.6 
      };
      player2Position = { 
        x: isPlayer1Action ? 0.9 : 0.7, 
        y: 0.2 + Math.random() * 0.6 
      };
      break;
      
    case 'fault':
      // Serve that goes out
      trajectory = [
        { x: isPlayer1Action ? 0.15 : 0.85, y: 0.85 },
        { x: isPlayer1Action ? 0.9 : 0.1, y: 0.3 } // Outside court area
      ];
      break;
      
    case 'doubleFault':
      // Second serve that goes out
      trajectory = [
        { x: isPlayer1Action ? 0.15 : 0.85, y: 0.85 },
        { x: isPlayer1Action ? 0.6 : 0.4, y: 0.95 } // Outside baseline
      ];
      break;
      
    default:
      // Random shot pattern
      trajectory = [
        { x: isPlayer1Action ? 0.15 : 0.85, y: 0.5 },
        { x: 0.5, y: 0.5 },
        { x: isPlayer1Action ? 0.85 : 0.15, y: 0.5 }
      ];
  }
  
  // Update match data with trajectory and player positions
  matchData.lastPoint = {
    trajectory,
    player1Position,
    player2Position,
    rallyLength: trajectory.length,
    pointWinner: player,
    pointType
  };
  
  return matchData;
};
