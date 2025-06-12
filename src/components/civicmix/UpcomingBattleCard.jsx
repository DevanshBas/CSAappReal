import React, { useState, useEffect } from 'react';

const UpcomingBattleCard = ({ battle }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(battle.startTime) - +new Date();
      let timeLeft = '';

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        timeLeft = 'Starting Soon!'; // Or 'In Progress' depending on your logic
      }

      return timeLeft;
    };

    // Update the countdown initially and every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when the component unmounts or startTime changes
    return () => clearInterval(timer);
  }, [battle.startTime]); // Recalculate if the battle start time changes

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <h3>{battle.name}</h3>
      <p>Starts In: {timeLeft}</p>
      {/* Placeholder for other upcoming battle details */}
      <p>{battle.description}</p>
    </div>
  );
};

export default UpcomingBattleCard;
