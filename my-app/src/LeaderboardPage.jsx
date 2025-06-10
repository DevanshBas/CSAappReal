import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FILTERS = [
  { key: 'all', label: 'All-Time' },
  { key: 'week', label: 'This Week' },
  { key: 'streak', label: 'Streak Masters' },
  { key: 'votes', label: 'Most Voted' }
];

const fetchLeaderboard = async (filter) => {
  const res = await fetch(`http://localhost:4000/api/leaderboard?filter=${filter}`);
  return res.json();
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <svg className="animate-spin -ml-1 mr-3 h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const Podium = ({ users }) => (
  <div className="leaderboard-podium">
    <div className="podium-spot second">
      {users[1] && <PodiumUser user={users[1]} place={2} />}
    </div>
    <div className="podium-spot first">
      {users[0] && <PodiumUser user={users[0]} place={1} />}
    </div>
    <div className="podium-spot third">
      {users[2] && <PodiumUser user={users[2]} place={3} />}
    </div>
  </div>
);

const PodiumUser = ({ user, place }) => (
  <div className={`podium-user place-${place}`} title={`${user.name}'s Profile`}>
    <div className="avatar podium-avatar">
      {user.avatar_url ? <img src={user.avatar_url} alt={user.name} /> : user.name[0]}
    </div>
    <div className="name">{user.name}</div>
    <div className="score">{user.score.toLocaleString()}</div>
    <div className="badge">{user.topBadge || 'Newcomer'}</div>
    <div className="place-label">#{place}</div>
  </div>
);

const LeaderboardTable = ({ users }) => (
  <table className="leaderboard-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th></th>
        <th>Name</th>
        <th>Score</th>
        <th>Top Badge</th>
      </tr>
    </thead>
    <tbody>
      {users.slice(3, 50).map((u, i) => (
        <tr key={u.id} title={`${u.name}'s Profile`}>
          <td>{i + 4}</td>
          <td>
            <span className="avatar small">
              {u.avatar_url ? <img src={u.avatar_url} alt={u.name} /> : u.name[0]}
            </span>
          </td>
          <td>{u.name}</td>
          <td>{u.score.toLocaleString()}</td>
          <td>{u.topBadge || 'Newcomer'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const LeaderboardPage = () => {
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard(filter)
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      });
  }, [filter]);

  return (
    <div className="leaderboard-page">
      <Link to="/" className="home-button" aria-label="Return to home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </Link>
      
      <h1>Leaderboard</h1>
      
      <div className="leaderboard-tabs">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={filter === f.key ? "active" : ""}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      {loading ? <LoadingSpinner /> : (
        <>
          <Podium users={users} />
          <LeaderboardTable users={users} />
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
