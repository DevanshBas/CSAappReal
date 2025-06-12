import React from 'react';

const MineBattleCard = ({ battle }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h4>{battle.name}</h4>
      <p>Status: {battle.status}</p>
      {/* Placeholder to indicate user's involvement */}
      {battle.status === 'upcoming' && <p>Your entry is in this upcoming battle.</p>}
      {battle.status === 'history' && battle.winnerRemix && battle.winnerRemix.id === 'myRemix1' && (
        <p style={{ fontWeight: 'bold', color: 'green' }}>🏆 You Won! 🏆</p>
      )}
      {/* You could add more details about the user's specific entry */}
       <p>{battle.description}</p> {/* Displaying description for now */}
    </div>
  );
};
export default MineBattleCard;