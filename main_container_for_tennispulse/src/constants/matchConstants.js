/**
 * Tennis match constants for TennisPulse
 * 
 * Defines constants related to tennis match states, point types, and scoring rules.
 */

// Match types
export const MATCH_TYPES = {
  SINGLES: 'singles',
  DOUBLES: 'doubles'
};

// Match status
export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  COMPLETED: 'completed',
  SUSPENDED: 'suspended',
  CANCELED: 'canceled'
};

// Point types
export const POINT_TYPES = {
  ACE: 'ace',
  WINNER: 'winner',
  UNFORCED_ERROR: 'unforcedError',
  FORCED_ERROR: 'forcedError',
  FAULT: 'fault',
  DOUBLE_FAULT: 'doubleFault',
  NET: 'net',
  LET: 'let'
};

// Surface types
export const SURFACE_TYPES = {
  HARD: 'hard',
  CLAY: 'clay',
  GRASS: 'grass',
  CARPET: 'carpet'
};

// Tournament categories
export const TOURNAMENT_CATEGORIES = {
  GRAND_SLAM: 'grandSlam',
  ATP_1000: 'atp1000',
  ATP_500: 'atp500',
  ATP_250: 'atp250',
  WTA_1000: 'wta1000',
  WTA_500: 'wta500',
  WTA_250: 'wta250',
  EXHIBITION: 'exhibition'
};

// Match scoring formats
export const SCORING_FORMATS = {
  BEST_OF_THREE: 3,
  BEST_OF_FIVE: 5,
  SUPER_TIEBREAK: 'superTiebreak',
  NO_AD: 'noAd'
};

// Standard tennis score sequence
export const SCORE_SEQUENCE = ['0', '15', '30', '40', 'Game'];

// Tennis court dimensions (in feet)
export const COURT_DIMENSIONS = {
  SINGLES: {
    WIDTH: 27,
    LENGTH: 78,
    SERVICE_BOX_DEPTH: 21
  },
  DOUBLES: {
    WIDTH: 36,
    LENGTH: 78,
    SERVICE_BOX_DEPTH: 21
  }
};
