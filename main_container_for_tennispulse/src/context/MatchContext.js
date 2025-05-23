import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockMatchData } from '../data/mockMatchData';
import { updateMatchScore } from '../utils/matchUtils';

// Create the context
const MatchContext = createContext();

// PUBLIC_INTERFACE
/**
 * MatchProvider - Context provider for tennis match data
 * 
 * This provider manages and distributes the match state data throughout the application,
 * including player information, scores, and game status.
 * 
 * @param {Object} props - Component props including children
 * @returns {React.Component} The context provider wrapper
 */
export const MatchProvider = ({ children }) => {
  const [matchData, setMatchData] = useState(mockMatchData);
  const [isLive, setIsLive] = useState(true); // For demo purposes, set to true
  
  // Simulated periodic updates for live matches
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Update timestamps or other time-sensitive data
        setMatchData(prevData => ({
          ...prevData,
          updates: prevData.updates ? [
            {
              time: new Date().toLocaleTimeString(),
              content: "Match progress update...",
              type: "info"
            },
            ...prevData.updates.slice(0, 19), // Keep last 20 updates
          ] : []
        }));
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isLive]);
  
  // Function to update point in the match
  const updatePoint = (player, pointType) => {
    setMatchData(prevData => {
      // Use utility function to calculate new score
      const updatedMatch = updateMatchScore(prevData, player, pointType);
      
      // Add to updates
      const newUpdate = {
        time: new Date().toLocaleTimeString(),
        content: `${player === 'player1' ? prevData.player1.name : prevData.player2.name} scores a ${pointType}!`,
        type: pointType,
        important: pointType === 'ace' || pointType === 'winner'
      };
      
      return {
        ...updatedMatch,
        updates: updatedMatch.updates ? [newUpdate, ...updatedMatch.updates] : [newUpdate]
      };
    });
  };
  
  // Toggle live state (for development purposes)
  const toggleLiveState = () => {
    setIsLive(!isLive);
  };
  
  return (
    <MatchContext.Provider value={{ 
      matchData, 
      isLive, 
      updatePoint, 
      toggleLiveState 
    }}>
      {children}
    </MatchContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * useMatchContext - Hook to access the match context
 * 
 * @returns {Object} The match context value
 */
export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return context;
};
