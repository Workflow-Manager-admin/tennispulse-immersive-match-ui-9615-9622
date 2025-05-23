import React, { useRef, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * CourtView - Renders a visual representation of the tennis court with ball movement
 * 
 * This component displays an interactive tennis court visualization showing ball trajectory,
 * player positions, and point animations for an immersive match experience.
 * 
 * @param {Object} matchData - Current match data
 * @param {boolean} isLive - Whether the match is currently live
 * @param {Object} lastPoint - Data about the last point played
 * @param {Object} highlightMoment - Current highlight animation data
 * @returns {React.Component} The rendered CourtView component
 */
const CourtView = ({ matchData, isLive, lastPoint, highlightMoment }) => {
  const canvasRef = useRef(null);
  
  // Draw the tennis court and ball trajectory on the canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Court colors
    const courtOuterColor = '#1B5E20';  // Dark green
    const courtInnerColor = '#4CAF50';  // Green
    const lineColor = '#FFFFFF';        // White
    const netColor = '#FFFFFF';         // White
    
    // Draw court outer area
    ctx.fillStyle = courtOuterColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw court playing surface
    ctx.fillStyle = courtInnerColor;
    ctx.fillRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);
    
    // Draw court lines
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    
    // Outer boundary
    ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
    
    // Net
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.1);
    ctx.lineTo(width * 0.5, height * 0.9);
    ctx.lineWidth = 3;
    ctx.strokeStyle = netColor;
    ctx.stroke();
    
    // Center service line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(width * 0.5, height * 0.1);
    ctx.lineTo(width * 0.5, height * 0.5);
    ctx.stroke();
    
    // Service boxes
    // Left service boxes
    ctx.strokeRect(width * 0.1, height * 0.1, width * 0.4, height * 0.2);
    ctx.strokeRect(width * 0.1, height * 0.3, width * 0.4, height * 0.2);
    
    // Right service boxes
    ctx.strokeRect(width * 0.5, height * 0.1, width * 0.4, height * 0.2);
    ctx.strokeRect(width * 0.5, height * 0.3, width * 0.4, height * 0.2);
    
    // Center mark on baseline
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.9);
    ctx.lineTo(width * 0.5, height * 0.91);
    ctx.stroke();
    
    // If we have lastPoint data and the match is live or we have a highlight, draw the ball trajectory
    if ((isLive || highlightMoment) && lastPoint?.trajectory) {
      drawBallTrajectory(ctx, lastPoint.trajectory, width, height);
      
      // Draw players
      drawPlayer(ctx, lastPoint.player1Position, '#FF5722', width, height); // Player 1 in orange
      drawPlayer(ctx, lastPoint.player2Position, '#2196F3', width, height); // Player 2 in blue
      
      // Draw ball at end position
      if (lastPoint.trajectory.length > 0) {
        const lastPos = lastPoint.trajectory[lastPoint.trajectory.length - 1];
        drawBall(ctx, lastPos.x * width, lastPos.y * height);
      }
    }
    
  }, [isLive, lastPoint, highlightMoment]);
  
  // Helper function to draw the ball trajectory
  const drawBallTrajectory = (ctx, trajectory, width, height) => {
    if (!trajectory || !trajectory.length) return;
    
    ctx.beginPath();
    ctx.moveTo(trajectory[0].x * width, trajectory[0].y * height);
    
    trajectory.forEach((point, index) => {
      if (index > 0) {
        ctx.lineTo(point.x * width, point.y * height);
      }
    });
    
    ctx.strokeStyle = '#FFEB3B'; // Yellow for trajectory
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  
  // Helper function to draw a player
  const drawPlayer = (ctx, position, color, width, height) => {
    if (!position) return;
    
    const x = position.x * width;
    const y = position.y * height;
    
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };
  
  // Helper function to draw the ball
  const drawBall = (ctx, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEB3B'; // Yellow ball
    ctx.fill();
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  return (
    <div className="court-view">
      <div className="court-container">
        <canvas 
          ref={canvasRef}
          width="500"
          height="300"
          className="tennis-court-canvas"
        />
        
        {highlightMoment && (
          <div className={`point-highlight ${highlightMoment.pointType}`}>
            {highlightMoment.pointType === 'ace' && 'ACE!'}
            {highlightMoment.pointType === 'winner' && 'WINNER!'}
            {highlightMoment.pointType === 'fault' && 'FAULT'}
            {highlightMoment.pointType === 'doubleFault' && 'DOUBLE FAULT'}
          </div>
        )}
      </div>
      
      <div className="court-stats">
        <div className="court-stat">
          <span className="stat-label">Rally Length</span>
          <span className="stat-value">{lastPoint?.rallyLength || 0} shots</span>
        </div>
        <div className="court-stat">
          <span className="stat-label">Serve Speed</span>
          <span className="stat-value">{lastPoint?.serveSpeed || '-'} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CourtView;
