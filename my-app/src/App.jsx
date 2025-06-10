import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Clock, Building, Users, Award, Play, Zap, Target } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage';
import BillExplorer from './BillExplorer';
import ImpactDashboard from './components/ImpactDashboard';
import ChallengeSystem from './components/ChallengeSystem';
import RemixReactions from './components/RemixReactions';
import LocalEvents from './components/LocalEvents';

const ICONS = { DollarSign, Clock, Building, Users, Award, Play, Zap, Target };

const wsUrl = 'ws://localhost:4000';

const fetchAPI = async (endpoint) => {
  const res = await fetch(`http://localhost:4000/api/${endpoint}`);
  return res.json();
};

const BracketBattle = ({ brackets, onVote }) => {
  if (!brackets || brackets.length === 0) return null;
  // Only show the first bracket for now
  const bracket = brackets[0];
  const rounds = [bracket]; // For demo, only one round

  return (
    <div className="bracket-section mt-4">
      <h2 className="mb-2">Bracket Battle: {bracket.round}</h2>
      <div className="bracket-graphic">
        {bracket.matches.map((match, idx) => (
          <div key={match.id} className="bracket-match-card">
            <div className="bracket-pair">
              <div className={`bracket-entry${match.status==='open'?' clickable':''}`}
                   onClick={()=>match.status==='open'&&onVote(match.id,'left')}>
                <div className="remix-title">{match.left.remix}</div>
                <div className="remix-user">by {match.left.user}</div>
                <div className="remix-preview">{match.left.preview}</div>
                <div className="votes">{match.votes.left} votes</div>
              </div>
              <div className="vs">VS</div>
              <div className={`bracket-entry${match.status==='open'?' clickable':''}`}
                   onClick={()=>match.status==='open'&&onVote(match.id,'right')}>
                <div className="remix-title">{match.right.remix}</div>
                <div className="remix-user">by {match.right.user}</div>
                <div className="remix-preview">{match.right.preview}</div>
                <div className="votes">{match.votes.right} votes</div>
              </div>
            </div>
            <div className="bracket-status">{match.status==='open'?'Vote now!':'Closed'}</div>
          </div>
        ))}
      </div>
      <div className="bracket-progress mt-2">
        <div style={{width:'100%',background:'#e0e7ff',height:8,borderRadius:4,overflow:'hidden'}}>
          <div style={{width:`${100*bracket.progress.current/bracket.progress.total}%`,background:'var(--primary-teal)',height:'100%',transition:'width 0.3s'}}></div>
        </div>
        <div className="small mt-1">Round {bracket.progress.current} of {bracket.progress.total}</div>
      </div>
    </div>
  );
};

const CommunityFeed = ({ posts, filter, setFilter }) => {
  const filters = [
    { key: 'mostVoted', label: 'Most Voted' },
    { key: 'recent', label: 'Recent' },
    { key: 'friends', label: 'Your Friends' }
  ];
  let filtered = posts;
  if (filter === 'mostVoted') filtered = [...posts].sort((a,b)=>b.likes-a.likes);
  if (filter === 'recent') filtered = [...posts]; // Already sorted by time
  if (filter === 'friends') filtered = posts.filter(p => p.user === 'PolicyPro23' || p.user === 'CivicNinja'); // Demo: hardcoded friends

  // --- Voting State ---
  const [voteState, setVoteState] = React.useState({}); // { [remixId]: 1|-1 }
  const userId = 4; // Demo: 'You'

  const handleVote = async (remixId, value) => {
    await fetch(`http://localhost:4000/remix/${remixId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, value })
    });
    setVoteState(v => ({ ...v, [remixId]: value }));
    // Optionally: update post.likes/dislikes in UI
  };

  return (
    <section className="section mt-4">
      <div className="flex-center mb-2" style={{gap:16}}>
        {filters.map(f => (
          <button key={f.key} className={`btn btn-secondary${filter===f.key?' active':''}`} onClick={()=>setFilter(f.key)}>{f.label}</button>
        ))}
      </div>
      <div className="feed-list">
        {filtered.map(post => (
          <div key={post.id} className="card feed-card mb-2">
            <div className="flex-between mb-1">
              <span className="avatar" style={{background:'#e0e7ff',color:'#146C94',fontWeight:700}}>{post.user[0]}</span>
              <span className="small">{post.timeAgo}</span>
            </div>
            <div className="remix-title mb-1">{post.remix}</div>
            <div className="remix-preview mb-1">{post.preview}</div>
            {/* If post.badgeEarned, show badge pop-up on card */}
            {post.badgeEarned && (
              <span className="badge-icon" style={{position:'absolute',top:8,right:8,zIndex:2}} title={post.badgeEarned.desc||post.badgeEarned.name||post.badgeEarned}>{post.badgeEarned.icon||'🏅'}</span>
            )}
            <RemixReactions billId={post.id} currentUser="You" />
            <div className="flex-between small mt-2">
              <span>
                <button
                  className={`btn btn-xs${voteState[post.id]===1?' btn-primary':''}`}
                  onClick={()=>handleVote(post.id,1)}
                  aria-label="Upvote"
                  disabled={voteState[post.id]===1}
                  style={{marginRight:4}}
                >👍</button>
                <button
                  className={`btn btn-xs${voteState[post.id]===-1?' btn-primary':''}`}
                  onClick={()=>handleVote(post.id,-1)}
                  aria-label="Downvote"
                  disabled={voteState[post.id]===-1}
                >👎</button>
                &nbsp; {post.likes} &nbsp; 💬 {post.comments}
              </span>
              <button className="btn btn-primary btn-xs">Challenge</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/leaderboard')
      .then(res => res.json())
      .then(setLeaders);
  }, []);
  return (
    <section className="section mt-4">
      <h3>Leaderboard</h3>
      <table className="leaderboard-table">
        <thead><tr><th>User</th><th>Wins</th><th>Votes</th><th>Badges</th></tr></thead>
        <tbody>
          {leaders.map(u => (
            <tr key={u.id} className={u.name==='You'?'highlight-row':''}>
              <td>
                {u.name}
                {/* Top 1-3 badges as icons with tooltips */}
                <span style={{marginLeft:8}}>
                  {(u.badges||[]).slice(0,3).map((b,i) => (
                    <span key={b.name||b} className="badge-icon" title={b.desc||b.name||b}>{b.icon||'🏅'}</span>
                  ))}
                </span>
              </td>
              <td>{u.stats?.wins ?? u.wins}</td>
              <td>{u.stats?.votes ?? (u.votes?.up || 0) - (u.votes?.down || 0)}</td>
              <td>{(u.badges||[]).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const BadgePop = ({ badge, onClose }) => (
  <div className="badge-pop-modal">
    <div className="badge-pop-content">
      <div className="badge-pop-icon">🏅</div>
      <div className="badge-pop-title">Badge Unlocked!</div>
      <div className="badge-pop-badge">{badge}</div>
      <button className="btn btn-primary mt-2" onClick={onClose}>Close</button>
    </div>
  </div>
);

const MilestonePop = ({ milestone, onClose }) => (
  <div className="badge-pop-modal">
    <div className="badge-pop-content">
      <div className="badge-pop-icon">🎉</div>
      <div className="badge-pop-title">Milestone!</div>
      <div className="badge-pop-badge">{milestone}</div>
      <button className="btn btn-primary mt-2" onClick={onClose}>Close</button>
    </div>
  </div>
);

// --- Update ProfileModal for ARIA and keyboard accessibility ---
const ProfileModal = ({ user, onClose, editable, onSave, onFollow, isFollowing }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar || '');
  const modalRef = useRef();
  useEffect(() => {
    setName(user.name);
    setBio(user.bio || '');
    setAvatar(user.avatar || '');
  }, [user]);
  useEffect(() => {
    // Focus modal for screen readers
    if (modalRef.current) modalRef.current.focus();
    // Trap focus inside modal
    const handleTab = (e) => {
      if (!modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll('input,button,[tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length-1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    modalRef.current && modalRef.current.addEventListener('keydown', handleTab);
    return () => modalRef.current && modalRef.current.removeEventListener('keydown', handleTab);
  }, [onClose]);
  const handleSave = () => {
    onSave && onSave({ name, bio, avatar });
    setEdit(false);
  };
  return (
    <div className="profile-modal" role="dialog" aria-modal="true" aria-label="User Profile" tabIndex="-1" ref={modalRef}>
      <div className="profile-content">
        <span className="sr-only">Profile modal. Press Escape to close.</span>
        <div className="profile-header">
          <div className="avatar" style={{width:64,height:64,fontSize:32}}>{avatar ? <img src={avatar} alt={name} style={{width:64,height:64,borderRadius:'50%'}} /> : name[0]}</div>
          <div>
            {edit ? (
              <>
                <label className="sr-only" htmlFor="profile-name">Name</label>
                <input id="profile-name" className="profile-name mb-1" value={name} onChange={e=>setName(e.target.value)} />
                <label className="sr-only" htmlFor="profile-bio">Bio</label>
                <input id="profile-bio" className="profile-bio mb-1" value={bio} onChange={e=>setBio(e.target.value)} />
                <label className="sr-only" htmlFor="profile-avatar">Avatar URL</label>
                <input id="profile-avatar" className="mb-1" value={avatar} onChange={e=>setAvatar(e.target.value)} placeholder="Avatar URL (optional)" />
              </>
            ) : (
              <>
                <div className="profile-name">{name}</div>
                <div className="profile-bio">{bio}</div>
              </>
            )}
          </div>
        </div>
        <div className="profile-stats">
          <div>Remixes: {user.remixes || user.stats?.remixes || 0}</div>
          <div>Wins: {user.wins || user.stats?.wins || 0}</div>
          <div>Streak: {user.streakDays || user.stats?.streakDays || 0}</div>
        </div>
        <div className="profile-badges">
          <h4>Badges</h4>
          <div className="badge-shelf">
            {(user.badges||[]).map((b,i) => (
              <span key={b.name||b}
                className="badge-icon custom-tooltip-container"
                tabIndex="0"
                aria-label={b.desc||b.name||b}
              >
                {b.icon||'🏅'}
                <span className="custom-tooltip" role="tooltip">{b.desc||b.name||b}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          {editable && !edit && <button className="btn btn-secondary" onClick={()=>setEdit(true)}>Edit</button>}
          {editable && edit && <button className="btn btn-primary" onClick={handleSave}>Save</button>}
          {onFollow && (
            <button className="btn btn-secondary" onClick={onFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
          )}
          <button className="btn btn-secondary" onClick={onClose} aria-label="Close profile modal">Close</button>
        </div>
      </div>
    </div>
  );
};

const AuthModal = ({ onClose, onAuth }) => {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let res;
      if (mode === 'signup') {
        res = await fetch('http://localhost:4000/api/signup', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, name })
        });
        if (!res.ok) throw new Error((await res.json()).error);
        setMode('login');
        setError('Account created! Please log in.');
        return;
      } else {
        res = await fetch('http://localhost:4000/api/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const data = await res.json();
        onAuth(data);
        onClose();
        return;
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleDemo = async () => {
    const res = await fetch('http://localhost:4000/api/demo-login', { method: 'POST' });
    const data = await res.json();
    onAuth(data);
    onClose();
  };
  return (
    <div className="profile-modal">
      <div className="profile-content">
        <h2>{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input className="mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          )}
          <input className="mb-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
          <input className="mb-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <div className="mb-2" style={{color:'red'}}>{error}</div>}
          <button className="btn btn-primary mb-2" type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
        </form>
        <button className="btn btn-secondary mb-2" onClick={handleDemo}>Demo Mode</button>
        <div className="small">
          {mode === 'signup' ? (
            <>Already have an account? <button className="link" onClick={()=>setMode('login')}>Log In</button></>
          ) : (
            <>No account? <button className="link" onClick={()=>setMode('signup')}>Sign Up</button></>
          )}
        </div>
        <button className="btn btn-secondary mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const BillBlender = () => {
  // --- State from backend ---
  const [originalBill, setOriginalBill] = useState([]);
  const [remixBill, setRemixBill] = useState([]);
  const [availableComponents, setAvailableComponents] = useState([]);
  const [impact, setImpact] = useState({ budget: 0, jobs: 0, greenScore: 0 });
  const [tournaments, setTournaments] = useState([]);
  const [userStats, setUserStats] = useState({ remixes: 0, wins: 0, badges: [], rank: '', level: 0 });
  const [leaders, setLeaders] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('remix');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(null);
  const [brackets, setBrackets] = useState([]);
  const [feedFilter, setFeedFilter] = useState('mostVoted');
  const [showBadge, setShowBadge] = useState(null);
  const [showMilestone, setShowMilestone] = useState(null);
  const [page, setPage] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState(() => {
    const s = localStorage.getItem('sessionId');
    return s ? { sessionId: s } : null;
  });
  const [profile, setProfile] = useState(null);
  const wsRef = useRef(null);

  // --- WebSocket for real-time updates ---
  useEffect(() => {
    wsRef.current = new window.WebSocket(wsUrl);
    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'leaderboard') setLeaders(msg.leaders);
      if (msg.type === 'userStats' && msg.userId === 4) setUserStats(msg.stats);
      if (msg.type === 'badge' && msg.userId === 4) {
        // Show badge popup for each new badge
        if (Array.isArray(msg.badges)) {
          msg.badges.forEach(badge => setShowBadge(badge));
        }
      }
      // Add more event types as needed
    };
    return () => wsRef.current && wsRef.current.close();
  }, []);

  // --- Fetch all data on mount ---
  useEffect(() => {
    fetchAPI('bills').then(setOriginalBill);
    fetchAPI('components').then(setAvailableComponents);
    fetchAPI('tournaments').then(setTournaments);
    fetchAPI('user-stats').then(setUserStats);
    fetchAPI('community-posts').then(setCommunityPosts);
    fetchAPI('brackets').then(setBrackets);
  }, []);

  // --- Drag-n-Drop logic (remix, reorder, swap) ---
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOverPane, setDragOverPane] = useState(null);

  const handleDragStart = (item, pane, idx) => {
    setDraggedCard({ ...item, pane, idx });
  };
  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverIndex(null);
    setDragOverPane(null);
  };
  const handleDragOver = (e, pane, idx) => {
    e.preventDefault();
    setDragOverPane(pane);
    setDragOverIndex(idx);
  };
  const handleDrop = (e, pane, idx) => {
    e.preventDefault();
    if (!draggedCard) return;
    let fromPane = draggedCard.pane;
    let toPane = pane;
    let fromIdx = draggedCard.idx;
    let toIdx = idx;
    if (fromPane === toPane) {
      // Reorder within the same pane
      let arr = fromPane === 'original' ? [...originalBill] : [...remixBill];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      if (fromPane === 'original') setOriginalBill(arr);
      else setRemixBill(arr);
    } else {
      // Move/swap between panes
      let fromArr = fromPane === 'original' ? [...originalBill] : [...remixBill];
      let toArr = toPane === 'original' ? [...originalBill] : [...remixBill];
      const [moved] = fromArr.splice(fromIdx, 1);
      toArr.splice(toIdx, 0, moved);
      if (fromPane === 'original') setOriginalBill(fromArr), setRemixBill(toArr);
      else setRemixBill(fromArr), setOriginalBill(toArr);
    }
    setDraggedCard(null);
    setDragOverIndex(null);
    setDragOverPane(null);
  };

  // --- Card Tag Color Logic ---
  const getTagColor = (type) => {
    if (type === 'funding') return { background: '#34d399', color: '#065f46' };
    if (type === 'date') return { background: '#60a5fa', color: '#1e3a8a' };
    if (type === 'agency') return { background: '#a78bfa', color: '#4c1d95' };
    return { background: '#e5e7eb', color: '#374151' };
  };

  // --- Impact Predictor (simple demo logic) ---
  useEffect(() => {
    if (remixBill.length === 0) return;
    const budget = remixBill.reduce((sum, i) => sum + (i.amount || 0), 0);
    const jobs = Math.round(budget * 11.3);
    const greenScore = Math.min(100, Math.round(budget * 1.1 + 35));
    setImpact({ budget, jobs, greenScore });
  }, [remixBill]);

  // --- Impact Notes ---
  const getImpactNotes = () => {
    if (remixBill.length === 0) return 'No changes yet.';
    let notes = [];
    if (impact.budget > 0) notes.push(`May add $${impact.budget}M in funding.`);
    if (impact.jobs > 0) notes.push(`May add ${impact.jobs} jobs.`);
    if (impact.greenScore > 60) notes.push('Likely to improve environmental score.');
    else if (impact.greenScore < 40) notes.push('Could reduce environmental score.');
    else notes.push('Moderate environmental impact.');
    return notes.join(' ');
  };

  // Voting handler
  const handleBracketVote = async (matchId, side) => {
    await fetch('http://localhost:4000/api/brackets/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, side })
    });
    // Refresh brackets
    fetchAPI('brackets').then(setBrackets);
  };

  // Example: Earn badge on first remix
  useEffect(() => {
    if (userStats.remixes === 1 && !userStats.badges.includes('First Remix')) {
      fetch('http://localhost:4000/api/badges/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: 'First Remix' })
      }).then(() => setShowBadge('First Remix'));
    }
    if (userStats.remixes === 10) setShowMilestone('Congrats, 10 remixes!');
    if (impact.budget >= 100 && !userStats.badges.includes('Budget Boss')) {
      fetch('http://localhost:4000/api/badges/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: 'Budget Boss' })
      }).then(() => setShowBadge('Budget Boss'));
    }
    if (impact.greenScore >= 90 && !userStats.badges.includes('Green Guru')) {
      fetch('http://localhost:4000/api/badges/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: 'Green Guru' })
      }).then(() => setShowBadge('Green Guru'));
    }
  }, [userStats.remixes, impact.budget, impact.greenScore]);

  // --- Dark Mode Toggle ---
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // --- Auth handler ---
  const handleAuth = (data) => {
    setSession({ sessionId: data.sessionId });
    localStorage.setItem('sessionId', data.sessionId);
  };
  const handleLogout = () => {
    setSession(null);
    setProfile(null);
    localStorage.removeItem('sessionId');
  };

  // --- Profile save handler ---
  const handleProfileSave = async (fields) => {
    if (!session) return;
    await fetch('http://localhost:4000/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-session-id': session.sessionId },
      body: JSON.stringify(fields)
    });
    // Refresh profile
    const res = await fetch('http://localhost:4000/api/profile', { headers: { 'x-session-id': session.sessionId } });
    setProfile(await res.json());
  };

  // --- UI ---
  return (
    <Router>
      <div className="app">
        {/* App Bar */}
        <div className="app-bar">
          <div className="logo">🧩</div>
          <div className="title">Bill Blender</div>
          <div className="actions">
            {profile ? (
              <>
                <span className="avatar" style={{marginRight:8}}>{profile.name[0]}</span>
                <button className="btn btn-secondary" onClick={()=>setShowProfile(true)}>Profile</button>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={()=>setShowAuth(true)}>Sign Up / Log In</button>
            )}
          </div>
        </div>

        {/* Nav Bar */}
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/explorer">Bill Explorer</Link>
          <Link to="/engage">Community</Link>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/explorer" element={<BillExplorer />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/engage" element={<EngagementHub />} />
            <Route path="/" element={
              <>
                {/* Main Grid: Remix Playground */}
                <div className="mt-4 grid-12">
                  {/* Original Bill */}
                  <div className="col-span-6">
                    <section className="section">
                      <div className="p-2 mb-2" style={{background:'var(--primary-teal)',color:'var(--soft-white)',borderRadius:'12px 12px 0 0'}}>
                        <h3 style={{margin:0}}>Original Bill</h3>
                      </div>
                      <div className="cards-grid">
                        {originalBill.map((item, idx) => {
                          const Icon = ICONS[item.icon] || DollarSign;
                          const tagStyle = getTagColor(item.type);
                          return (
                            <div
                              key={item.id}
                              className={`card${draggedCard && draggedCard.id === item.id ? ' dragging' : ''}${dragOverPane==='original'&&dragOverIndex===idx?' drop-snap':''}`}
                              draggable
                              onDragStart={() => handleDragStart(item, 'original', idx)}
                              onDragEnd={handleDragEnd}
                              onDragOver={e => handleDragOver(e, 'original', idx)}
                              onDrop={e => handleDrop(e, 'original', idx)}
                              style={dragOverPane==='original'&&dragOverIndex===idx?{boxShadow:'0 0 0 3px var(--primary-teal)'}:{}}
                            >
                              <span className="drag-handle">☰</span>
                              <div className="flex-center mb-2" style={{fontSize:'22px'}}><Icon /></div>
                              <div className="mb-1" style={{fontWeight:600}}>{item.content}</div>
                              <span className="pill" style={{...tagStyle,marginBottom:8,marginRight:0}}>{item.type}</span>
                              {item.amount > 0 && <div className="small">${item.amount}M</div>}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                  {/* Squad Workspace */}
                  <div className="col-span-6">
                    <section className="section">
                      <SquadWorkspace 
                        remixBill={remixBill} 
                        onBillChange={setRemixBill}
                        user={profile}
                      />
                    </section>
                  </div>
                  {/* Your Remix */}
                  <div className="col-span-6">
                    <section className="section">
                      <div className="p-2 mb-2" style={{background:'var(--primary-teal)',color:'var(--soft-white)',borderRadius:'12px 12px 0 0'}}>
                        <h3 style={{margin:0}}>Your Remix</h3>
                      </div>
                      <div className="cards-grid">
                        {remixBill.map((item, idx) => {
                          const Icon = ICONS[item.icon] || DollarSign;
                          const tagStyle = getTagColor(item.type);
                          return (
                            <div
                              key={item.id}
                              className={`card${draggedCard && draggedCard.id === item.id ? ' dragging' : ''}${dragOverPane==='remix'&&dragOverIndex===idx?' drop-snap':''}`}
                              draggable
                              onDragStart={() => handleDragStart(item, 'remix', idx)}
                              onDragEnd={handleDragEnd}
                              onDragOver={e => handleDragOver(e, 'remix', idx)}
                              onDrop={e => handleDrop(e, 'remix', idx)}
                              style={dragOverPane==='remix'&&dragOverIndex===idx?{boxShadow:'0 0 0 3px var(--primary-teal)'}:{}}
                            >
                              <span className="drag-handle">☰</span>
                              <div className="flex-center mb-2" style={{fontSize:'22px'}}><Icon /></div>
                              <div className="mb-1" style={{fontWeight:600}}>{item.content}</div>
                              <span className="pill" style={{...tagStyle,marginBottom:8,marginRight:0}}>{item.type}</span>
                              {item.amount > 0 && <div className="small">${item.amount}M</div>}
                              <button className="btn btn-secondary mt-2" style={{padding:'6px 16px',fontSize:'14px'}} onClick={()=>moveToAvailable(item)}>Remove</button>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                </div>

                {/* Impact Simulation Dashboard */}
                <ImpactDashboard impact={impact} remixBill={remixBill} />
                {/* Impact Notes */}
                <div className="mt-2 mb-4 text-center" style={{fontSize:'16px',color:'var(--slate-gray)'}}>
                  {getImpactNotes()}
                </div>

                {/* Bracket Battle */}
                <BracketBattle brackets={brackets} onVote={handleBracketVote} />

                {/* Community Feed */}
                <CommunityFeed posts={communityPosts} filter={feedFilter} setFilter={setFeedFilter} />
              </>
            } />
          </Routes>
        </main>

        {showBadge && <BadgePop badge={showBadge} onClose={()=>setShowBadge(null)} />}
        {showMilestone && <MilestonePop milestone={showMilestone} onClose={()=>setShowMilestone(null)} />}
        {showProfile && profile && (
          <ProfileModal
            user={profile}
            onClose={()=>setShowProfile(false)}
            editable={true}
            onSave={handleProfileSave}
          />
        )}
        {showAuth && <AuthModal onClose={()=>setShowAuth(false)} onAuth={handleAuth} />}
      </div>
    </Router>
  );
};

export default BillBlender;