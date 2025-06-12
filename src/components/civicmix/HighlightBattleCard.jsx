import React from 'react';

const HighlightBattleCard = ({ battle }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px', backgroundColor: '#fff3cd' }}> {/* Added a light yellow background for highlights */}
      <h3>{battle.name}</h3>
      {/* Placeholder for highlight information */}
      <p>✨ Featured Battle! ✨</p>
      {/* You could add more dynamic highlight info based on the battle data */}
       <p>Status: {battle.status}</p> {/* Displaying status for now */}
    </div>
  );
};

export default HighlightBattleCard;