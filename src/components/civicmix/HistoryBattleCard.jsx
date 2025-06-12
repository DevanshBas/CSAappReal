import React from 'react';

const HistoryBattleCard = ({ battle }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>{battle.name}</h3>
      {/* Placeholder for winner information */}
      {battle.winnerRemix && (
        <p>Winner: {battle.winnerRemix.name}</p>
      )}
      {/* Add other history battle details here */}
      <p>{battle.description}</p>
    </div>
  );
};

export default HistoryBattleCard;