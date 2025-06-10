import { useState, useEffect } from 'react';
import { Trophy, Star, Award, Clock } from 'lucide-react';

const ChallengeSystem = () => {
  const [challenges, setChallenges] = useState({
    daily: {
      id: 'dc-001',
      title: 'Reduce healthcare costs by 15%',
      description: 'Create a bill remix that reduces healthcare costs without cutting coverage',
      deadline: new Date().setHours(23, 59, 59, 999),
      rewards: {
        points: 2000,
        badge: 'Healthcare Hero 🏥',
        leaderboardPin: true
      },
      participants: [],
      submissions: []
    },
    weekly: {
      id: 'wc-001',
      title: 'Environmental Impact Champion',
      description: 'Create the most eco-friendly policy that maintains economic growth',
      deadline: new Date().setDate(new Date().getDate() + 7),
      rewards: {
        points: 5000,
        badge: 'Green Pioneer 🌱',
        leaderboardPin: true
      },
      participants: [],
      submissions: []
    }
  });

  const [userProgress, setUserProgress] = useState({
    streak: 0,
    completedChallenges: [],
    unlockedReactions: ['💸', '🤯', '🌱']
  });

  const formatTimeLeft = (deadline) => {
    const now = new Date();
    const timeLeft = deadline - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="challenges-container">
      <div className="challenge-section daily">
        <div className="challenge-header">
          <Trophy className="icon" />
          <h2>Daily Challenge</h2>
          <Clock className="icon" />
          <span className="time-left">{formatTimeLeft(challenges.daily.deadline)}</span>
        </div>
        <div className="challenge-card">
          <h3>{challenges.daily.title}</h3>
          <p>{challenges.daily.description}</p>
          <div className="rewards">
            <div className="reward">
              <Star className="icon" />
              <span>{challenges.daily.rewards.points} pts</span>
            </div>
            <div className="reward">
              <Award className="icon" />
              <span>{challenges.daily.rewards.badge}</span>
            </div>
          </div>
          <button className="btn-primary">Participate</button>
        </div>
      </div>

      <div className="challenge-section weekly">
        <div className="challenge-header">
          <Trophy className="icon" />
          <h2>Weekly Challenge</h2>
          <Clock className="icon" />
          <span className="time-left">{formatTimeLeft(challenges.weekly.deadline)}</span>
        </div>
        <div className="challenge-card">
          <h3>{challenges.weekly.title}</h3>
          <p>{challenges.weekly.description}</p>
          <div className="rewards">
            <div className="reward">
              <Star className="icon" />
              <span>{challenges.weekly.rewards.points} pts</span>
            </div>
            <div className="reward">
              <Award className="icon" />
              <span>{challenges.weekly.rewards.badge}</span>
            </div>
          </div>
          <button className="btn-primary">Participate</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSystem;
