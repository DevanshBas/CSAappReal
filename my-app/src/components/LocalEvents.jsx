import { useState, useEffect } from 'react';
import { MapPin, Users, Award, Calendar } from 'lucide-react';

const LocalEvents = () => {
  const [events, setEvents] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('state'); // 'city' or 'state'

  // Simulated data - replace with actual API calls
  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: "Live Bill Remix Jam Session",
        date: "2024-02-15",
        time: "18:00",
        location: "City Hall Innovation Lab",
        description: "Join fellow citizens to collaboratively remix the new transportation bill",
        attendees: 24,
        category: "Workshop"
      },
      {
        id: 2,
        title: "Policy Impact Hackathon",
        date: "2024-02-20",
        time: "10:00",
        location: "Tech Hub Downtown",
        description: "24-hour event to create impactful bill remixes for local issues",
        attendees: 45,
        category: "Hackathon"
      }
    ]);

    setLeaderboard([
      {
        id: 1,
        username: "PolicyPro",
        points: 15000,
        badges: ["🏆", "⭐", "🌟"],
        impactScore: 92
      },
      {
        id: 2,
        username: "CivicInnovator",
        points: 12500,
        badges: ["🌟", "💫"],
        impactScore: 88
      }
    ]);
  }, []);

  const handleEventRegistration = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          attendees: event.attendees + 1
        };
      }
      return event;
    }));
  };

  return (
    <div className="local-engagement">
      <div className="events-section">
        <h2>
          <Calendar className="icon" />
          Upcoming Local Events
        </h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <span className="category-tag">{event.category}</span>
                <h3>{event.title}</h3>
              </div>
              <div className="event-details">
                <p><Calendar className="icon" /> {event.date} at {event.time}</p>
                <p><MapPin className="icon" /> {event.location}</p>
                <p><Users className="icon" /> {event.attendees} attending</p>
              </div>
              <p className="event-description">{event.description}</p>
              <button 
                className="btn-primary"
                onClick={() => handleEventRegistration(event.id)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="leaderboard-section">
        <div className="leaderboard-header">
          <h2>
            <Award className="icon" />
            Local Leaders
          </h2>
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
        </div>
        <div className="leaderboard-list">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="leaderboard-item">
              <div className="rank">{index + 1}</div>
              <div className="user-info">
                <span className="username">{user.username}</span>
                <div className="badges">
                  {user.badges.map((badge, i) => (
                    <span key={i} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="stats">
                <div className="points">{user.points} pts</div>
                <div className="impact-score">
                  Impact: {user.impactScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalEvents;
