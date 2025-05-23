import { MATCH_TYPES, SCORING_FORMATS, SURFACE_TYPES, TOURNAMENT_CATEGORIES } from '../constants/matchConstants';

/**
 * Mock data for a tennis match
 * Used for development and testing of the TennisPulse interface
 */
export const mockMatchData = {
  id: 'match-123456',
  matchType: MATCH_TYPES.SINGLES,
  bestOf: SCORING_FORMATS.BEST_OF_FIVE, 
  surface: SURFACE_TYPES.HARD,
  
  // Tournament information
  tournament: {
    id: 'tournament-789',
    name: 'Grand Slam Finals 2023',
    location: 'New York, USA',
    category: TOURNAMENT_CATEGORIES.GRAND_SLAM
  },
  
  round: 'Finals',
  court: 'Center Court',
  scheduledTime: '2:00 PM EST',
  timeUntilStart: '25 minutes',
  
  // Player information
  player1: {
    id: 'player-001',
    name: 'Rafael Nadal',
    country: 'Spain',
    countryCode: 'ES',
    ranking: 2,
    seed: 1,
    age: 36,
    height: '6\'1"',
    weight: '187 lbs',
    plays: 'Left-handed',
    isServing: true,
    setsWon: 1,
    statistics: {
      overall: {
        aces: 5,
        doubleFaults: 2,
        firstServePercentage: 68,
        winners: 18,
        unforcedErrors: 12,
        pointsWon: 48
      },
      sets: [
        {
          aces: 2,
          doubleFaults: 1,
          firstServePercentage: 65,
          winners: 8,
          unforcedErrors: 6,
          pointsWon: 24
        },
        {
          aces: 3,
          doubleFaults: 1,
          firstServePercentage: 70,
          winners: 10,
          unforcedErrors: 6,
          pointsWon: 24
        }
      ]
    }
  },
  
  player2: {
    id: 'player-002',
    name: 'Novak Djokovic',
    country: 'Serbia',
    countryCode: 'RS',
    ranking: 1,
    seed: 2,
    age: 35,
    height: '6\'2"',
    weight: '170 lbs',
    plays: 'Right-handed',
    isServing: false,
    setsWon: 1,
    statistics: {
      overall: {
        aces: 7,
        doubleFaults: 1,
        firstServePercentage: 72,
        winners: 22,
        unforcedErrors: 10,
        pointsWon: 52
      },
      sets: [
        {
          aces: 4,
          doubleFaults: 0,
          firstServePercentage: 75,
          winners: 12,
          unforcedErrors: 4,
          pointsWon: 28
        },
        {
          aces: 3,
          doubleFaults: 1,
          firstServePercentage: 70,
          winners: 10,
          unforcedErrors: 6,
          pointsWon: 24
        }
      ]
    }
  },
  
  // Current match state
  currentSet: 3,
  sets: [
    {
      player1Score: 6,
      player2Score: 4,
      winner: 'player1',
      games: []
    },
    {
      player1Score: 4,
      player2Score: 6,
      winner: 'player2',
      games: []
    },
    {
      player1Score: 2,
      player2Score: 3,
      winner: null,
      games: []
    }
  ],
  
  currentGame: {
    number: 6,
    player1Points: 3, // 40
    player2Points: 3, // 40
    deuce: true,
    advantage: 'player1'
  },
  
  // Last point details for visualization
  lastPoint: {
    trajectory: [
      { x: 0.15, y: 0.85 },
      { x: 0.75, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.80, y: 0.30 }
    ],
    player1Position: { x: 0.15, y: 0.50 },
    player2Position: { x: 0.85, y: 0.30 },
    rallyLength: 4,
    pointWinner: 'player1',
    pointType: 'winner',
    serveSpeed: 185 // km/h
  },
  
  // Live updates
  updates: [
    {
      time: '2:45 PM',
      content: 'Advantage Nadal after a powerful forehand winner!',
      type: 'winner',
      important: true
    },
    {
      time: '2:44 PM',
      content: "Deuce after Djokovic's backhand down the line.",
      type: 'winner',
      important: false
    },
    {
      time: '2:43 PM',
      content: 'Nadal hits a forehand long. 30-40.',
      type: 'unforcedError',
      important: false
    },
    {
      time: '2:42 PM',
      content: 'Ace by Nadal! 30-30.',
      type: 'ace',
      important: true
    }
  ],
  
  winner: null,
  isComplete: false
};
