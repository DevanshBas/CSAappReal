// Simple Express backend for Bill Blender app
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- WebSocket Setup ---
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(type, data) {
  const msg = JSON.stringify({ type, ...data });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

// --- In-memory Data ---
let bills = [
  { id: '1', type: 'funding', content: 'Allocate $50M for renewable energy research', amount: 50, icon: 'DollarSign', color: 'bg-green-100 border-green-300', category: 'Environment', introduced_date: '2025-05-01', chamber: 'Senate', sponsor: 'Smith', status: 'pending' },
  { id: '2', type: 'deadline', content: 'Implementation deadline: December 2025', amount: 12, icon: 'Clock', color: 'bg-blue-100 border-blue-300', category: 'Environment', introduced_date: '2025-05-01', chamber: 'Senate', sponsor: 'Smith', status: 'pending' },
  { id: '3', type: 'agency', content: 'Department of Energy oversight', amount: 0, icon: 'Building', color: 'bg-purple-100 border-purple-300', category: 'Environment', introduced_date: '2025-05-01', chamber: 'Senate', sponsor: 'Smith', status: 'pending' },
  { id: '4', type: 'funding', content: 'Tax incentives for solar installations: $25M', amount: 25, icon: 'DollarSign', color: 'bg-green-100 border-green-300', category: 'Environment', introduced_date: '2025-05-01', chamber: 'Senate', sponsor: 'Smith', status: 'pending' },
  { id: '5', type: 'deadline', content: 'Quarterly progress reports required', amount: 4, icon: 'Clock', color: 'bg-blue-100 border-blue-300', category: 'Environment', introduced_date: '2025-05-01', chamber: 'Senate', sponsor: 'Smith', status: 'pending' },
  // Example Education bill
  { id: '6', type: 'funding', content: 'Increase K-12 funding by $100M', amount: 100, icon: 'DollarSign', color: 'bg-green-100 border-green-300', category: 'Education', introduced_date: '2025-04-15', chamber: 'House', sponsor: 'Garcia', status: 'pending' },
  { id: '7', type: 'policy', content: 'Mandate computer science in high schools', amount: 0, icon: 'Award', color: 'bg-yellow-100 border-yellow-300', category: 'Education', introduced_date: '2025-04-15', chamber: 'House', sponsor: 'Garcia', status: 'pending' },
  // Example Health bill
  { id: '8', type: 'funding', content: 'Expand rural health clinics: $30M', amount: 30, icon: 'DollarSign', color: 'bg-green-100 border-green-300', category: 'Health', introduced_date: '2025-03-10', chamber: 'Senate', sponsor: 'Lee', status: 'pending' },
  { id: '9', type: 'policy', content: 'Ban flavored vaping products', amount: 0, icon: 'X', color: 'bg-red-100 border-red-300', category: 'Health', introduced_date: '2025-03-10', chamber: 'Senate', sponsor: 'Lee', status: 'pending' }
];

let availableComponents = [
  { id: '6', type: 'funding', content: 'Emergency backup fund: $10M', amount: 10, icon: 'DollarSign', color: 'bg-green-100 border-green-300' },
  { id: '7', type: 'deadline', content: 'Extended deadline: June 2026', amount: 18, icon: 'Clock', color: 'bg-blue-100 border-blue-300' },
  { id: '8', type: 'agency', content: 'EPA collaboration required', amount: 0, icon: 'Building', color: 'bg-purple-100 border-purple-300' }
];

let tournaments = [
  { id: 1, name: 'Climate Action Showdown', participants: 128, prize: 'Civic Creator Badge', status: 'active' },
  { id: 2, name: 'Education Reform Battle', participants: 64, prize: 'Impact Master Badge', status: 'starting' },
  { id: 3, name: 'Infrastructure Face-off', participants: 32, prize: 'Policy Pioneer Badge', status: 'final' }
];

let userStats = {
  remixes: 12,
  wins: 8,
  badges: ['Civic Creator', 'Impact Master'],
  rank: 'Policy Pioneer',
  level: 5
};

let communityPosts = [
  { id: 1, user: 'PolicyPro23', remix: 'Climate Action Reform', likes: 127, comments: 23, timeAgo: '2h ago', preview: 'Increased renewable funding by 40% and accelerated timeline...' },
  { id: 2, user: 'CivicNinja', remix: 'Education Funding Boost', likes: 89, comments: 16, timeAgo: '4h ago', preview: 'Redistributed $200M to underserved districts...' },
  { id: 3, user: 'BillMaster', remix: 'Infrastructure Innovation', likes: 156, comments: 31, timeAgo: '1d ago', preview: 'Smart city integration with green energy components...' }
];

// --- Bracket Battles ---
let brackets = [
  {
    id: 1,
    round: 'Semifinals',
    progress: { current: 1, total: 2 },
    matches: [
      {
        id: 'm1',
        left: { remix: 'Climate Action Reform', user: 'PolicyPro23', preview: 'Increased renewable funding by 40%...' },
        right: { remix: 'Education Funding Boost', user: 'CivicNinja', preview: 'Redistributed $200M...' },
        votes: { left: 12, right: 18 },
        status: 'open'
      },
      {
        id: 'm2',
        left: { remix: 'Infrastructure Innovation', user: 'BillMaster', preview: 'Smart city integration...' },
        right: { remix: 'Green Schools', user: 'EcoKid', preview: 'Solar panels for all schools...' },
        votes: { left: 9, right: 21 },
        status: 'closed'
      }
    ]
  }
];

// --- Recent Bills (for dashboard) ---
let recentBills = [
  { id: 'r1', title: 'Clean Energy Act 2025', date: '2025-06-01', isNew: true },
  { id: 'r2', title: 'Education Funding Boost', date: '2025-05-28', isNew: false },
  { id: 'r3', title: 'Infrastructure Innovation', date: '2025-05-20', isNew: true }
];

// --- User Management ---
let users = [
  { 
    id: 1, 
    name: 'Demo User', 
    username: 'demo', 
    password: 'demo', 
    bio: 'I love remixing bills!', 
    avatar: '', 
    badges: ['Demo Master'],
    followers: [],
    following: [],
    stats: {
      remixes: 5,
      wins: 3,
      votes: { up: 10, down: 2 },
      streakDays: 2,
      engagement: 8,
      level: 2
    },
    createdAt: '2025-06-01T00:00:00.000Z',
    lastActive: '2025-06-09T00:00:00.000Z',
    role: 'user'
  }
];

// --- Session Management ---
let sessions = {}; // sessionId: { userId, expires, lastActivity }
let revokedSessions = new Set(); // For force logout capability
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

function cleanupExpiredSessions() {
  const now = Date.now();
  Object.entries(sessions).forEach(([sessionId, session]) => {
    if (session.expires <= now || revokedSessions.has(sessionId)) {
      delete sessions[sessionId];
      revokedSessions.delete(sessionId);
    }
  });
}

setInterval(cleanupExpiredSessions, 60 * 60 * 1000); // Cleanup every hour

function updateUserActivity(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  const now = new Date();
  const lastActive = user.lastActive ? new Date(user.lastActive) : null;
  
  if (lastActive) {
    const isNextDay = now.getDate() - lastActive.getDate() === 1;
    if (isNextDay) {
      user.stats.streakDays = (user.stats.streakDays || 0) + 1;
    } else if (now.getDate() - lastActive.getDate() > 1) {
      user.stats.streakDays = 1;
    }
  } else {
    user.stats.streakDays = 1;
  }
  
  user.lastActive = now.toISOString();
  broadcast('userActivity', { userId, lastActive: user.lastActive });
}

function generateSessionId() {
  return Math.random().toString(36).slice(2) + Date.now();
}

// --- Middleware ---
const validateSession = (req, res, next) => {
  const sessionId = req.headers['x-session-id'];
  if (!sessionId) return res.status(401).json({ error: 'No session provided' });
  
  if (revokedSessions.has(sessionId)) {
    delete sessions[sessionId];
    revokedSessions.delete(sessionId);
    return res.status(401).json({ error: 'Session has been revoked' });
  }
  
  const session = sessions[sessionId];
  if (!session) return res.status(401).json({ error: 'Invalid session' });
  
  if (session.expires <= Date.now()) {
    delete sessions[sessionId];
    return res.status(401).json({ error: 'Session expired' });
  }
  
  session.expires = Date.now() + SESSION_EXPIRY;
  session.lastActivity = Date.now();
  
  const user = users.find(u => u.id === session.userId);
  if (!user) return res.status(401).json({ error: 'User not found' });
  
  updateUserActivity(user.id);
  req.user = user;
  next();
};

// --- Auth Routes ---
app.post('/api/signup', (req, res) => {
  try {
    const { username, password, name } = req.body;
    
    if (!username || typeof username !== 'string') 
      return res.status(400).json({ error: 'Username is required and must be a string' });
    if (!password || typeof password !== 'string' || password.length < 6) 
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    if (!name || typeof name !== 'string') 
      return res.status(400).json({ error: 'Name is required and must be a string' });
    
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) 
      return res.status(409).json({ error: 'Username is already taken' });
    
    const user = {
      id: users.length + 1,
      username,
      password,
      name,
      bio: '',
      avatar: '',
      badges: ['Newcomer'],
      followers: [],
      following: [],
      stats: {
        remixes: 0,
        wins: 0,
        votes: { up: 0, down: 0 },
        streakDays: 0,
        engagement: 0,
        level: 1
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      role: 'user'
    };
    
    users.push(user);
    
    const sessionId = generateSessionId();
    sessions[sessionId] = {
      userId: user.id,
      expires: Date.now() + SESSION_EXPIRY,
      lastActivity: Date.now()
    };
    
    res.json({
      success: true,
      sessionId,
      user: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        badges: user.badges,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) 
      return res.status(400).json({ error: 'Username and password are required' });
    
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user || user.password !== password) 
      return res.status(401).json({ error: 'Invalid username or password' });
    
    const sessionId = generateSessionId();
    sessions[sessionId] = {
      userId: user.id,
      expires: Date.now() + SESSION_EXPIRY,
      lastActivity: Date.now()
    };
    
    updateUserActivity(user.id);
    
    res.json({
      sessionId,
      user: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        badges: user.badges,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

app.post('/api/demo-login', (req, res) => {
  try {
    const user = users[0];
    const sessionId = generateSessionId();
    sessions[sessionId] = {
      userId: user.id,
      expires: Date.now() + SESSION_EXPIRY,
      lastActivity: Date.now()
    };
    
    updateUserActivity(user.id);
    
    res.json({
      sessionId,
      user: {
        id: user.id,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        badges: user.badges,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ error: 'Internal server error during demo login' });
  }
});

app.post('/api/logout', validateSession, (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'];
    delete sessions[sessionId];
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error during logout' });
  }
});

app.post('/api/force-logout', validateSession, (req, res) => {
  try {
    const { targetUserId } = req.body;
    
    if (req.user.role !== 'admin' && req.user.id !== targetUserId) {
      return res.status(403).json({ error: 'Not authorized to force logout other users' });
    }
    
    Object.entries(sessions).forEach(([sessionId, session]) => {
      if (session.userId === targetUserId) {
        revokedSessions.add(sessionId);
      }
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Force logout error:', error);
    res.status(500).json({ error: 'Internal server error during force logout' });
  }
});

// --- Profile Routes ---
app.get('/api/profile', validateSession, (req, res) => {
  try {
    const { user } = req;
    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      badges: user.badges,
      followers: user.followers,
      following: user.following,
      stats: user.stats,
      lastActive: user.lastActive
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error while fetching profile' });
  }
});

app.post('/api/profile', validateSession, (req, res) => {
  try {
    const { user } = req;
    const { name, bio, avatar } = req.body;
    
    if (name !== undefined) {
      if (typeof name !== 'string' || name.length < 1) 
        return res.status(400).json({ error: 'Name must be a non-empty string' });
      user.name = name;
    }
    
    if (bio !== undefined) {
      if (typeof bio !== 'string') 
        return res.status(400).json({ error: 'Bio must be a string' });
      user.bio = bio;
    }
    
    if (avatar !== undefined) {
      if (typeof avatar !== 'string') 
        return res.status(400).json({ error: 'Avatar must be a string URL' });
      user.avatar = avatar;
    }
    
    res.json({
      success: true,
      profile: {
        id: user.id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        badges: user.badges,
        stats: user.stats,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error while updating profile' });
  }
});

// --- Leaderboard Route ---
app.get('/api/leaderboard', (req, res) => {
  const { filter } = req.query;
  let sorted = users.map(u => ({
    id: u.id,
    name: u.name,
    username: u.username,
    avatar: u.avatar,
    badges: u.badges,
    stats: u.stats,
    topBadge: u.badges[0] || null,
    lastActive: u.lastActive,
    score: calculateScore(u)
  }));

  switch (filter) {
    case 'week':
      sorted = sorted.sort((a, b) => b.stats.wins - a.stats.wins);
      break;
    case 'streak':
      sorted = sorted.sort((a, b) => b.stats.streakDays - a.stats.streakDays);
      break;
    case 'votes':
      sorted = sorted.sort((a, b) => 
        (b.stats.votes.up - b.stats.votes.down) - (a.stats.votes.up - a.stats.votes.down)
      );
      break;
    default:
      sorted = sorted.sort((a, b) => b.score - a.score);
  }

  res.json(sorted);
});

// --- Score Calculation ---
function calculateScore(user) {
  const stats = user.stats || {};
  const votes = stats.votes || { up: 0, down: 0 };
  
  const voteScore = votes.up - votes.down;
  const winScore = (stats.wins || 0) * 20;
  const streakScore = (stats.streakDays || 0) * 5;
  const engagementScore = (stats.engagement || 0) * 2;
  const remixScore = (stats.remixes || 0) * 10;
  
  return voteScore + winScore + streakScore + engagementScore + remixScore;
}

// --- Bill Explorer Data ---
let detailedBills = [
  {
    id: 'env-001',
    title: 'Clean Energy Innovation Act',
    description: 'A comprehensive bill to accelerate the development and deployment of clean energy technologies through increased research funding and tax incentives.',
    topics: ['Environment', 'Energy', 'Innovation'],
    sponsor: 'Sen. Maria Rodriguez',
    region: 'Federal',
    fiscalImpact: 'High',
    amount: 500,
    date: '2025-05-15',
    status: 'In Committee',
    isRemix: false
  },
  {
    id: 'edu-001',
    title: 'Digital Learning Infrastructure Act',
    description: 'Modernize educational infrastructure by providing funding for digital learning tools and high-speed internet access in all public schools.',
    topics: ['Education', 'Technology', 'Infrastructure'],
    sponsor: 'Rep. James Chen',
    region: 'Federal',
    fiscalImpact: 'Medium',
    amount: 250,
    date: '2025-05-20',
    status: 'Introduced',
    isRemix: false
  },
  {
    id: 'heal-001',
    title: 'Rural Healthcare Access Improvement',
    description: 'Expand healthcare access in rural communities through telemedicine infrastructure and incentives for healthcare providers.',
    topics: ['Healthcare', 'Rural Development', 'Technology'],
    sponsor: 'Sen. Robert Thompson',
    region: 'Federal',
    fiscalImpact: 'Medium',
    amount: 300,
    date: '2025-06-01',
    status: 'In Committee',
    isRemix: false
  },
  {
    id: 'env-002',
    title: 'Green Transportation Initiative',
    description: 'Support the transition to electric vehicles through charging infrastructure development and consumer incentives.',
    topics: ['Environment', 'Transportation', 'Infrastructure'],
    sponsor: 'Rep. Emily Parker',
    region: 'Federal',
    fiscalImpact: 'High',
    amount: 450,
    date: '2025-06-05',
    status: 'Introduced',
    isRemix: false
  },
  {
    id: 'env-001-remix',
    title: 'Enhanced Clean Energy Innovation Act',
    description: 'An enhanced version of the Clean Energy Act with additional focus on community solar projects and workforce development.',
    topics: ['Environment', 'Energy', 'Innovation', 'Jobs'],
    sponsor: 'Community Remix',
    region: 'Federal',
    fiscalImpact: 'High',
    amount: 600,
    date: '2025-06-08',
    status: 'Proposed',
    isRemix: true,
    originalId: 'env-001'
  }
];

// --- Bill Explorer Endpoints ---
app.get('/api/bills/all', (req, res) => {
  try {
    res.json(detailedBills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Internal server error while fetching bills' });
  }
});

app.get('/api/bills/:id', (req, res) => {
  try {
    const bill = detailedBills.find(b => b.id === req.params.id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ error: 'Internal server error while fetching bill' });
  }
});

// --- Squad Management ---
let squads = new Map();
let squadConnections = new Map();

// Squad connection handler
wss.on('connection', (ws) => {
  ws.id = Math.random().toString(36).substr(2, 9);
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch (data.type) {
      case 'join_squad':
        const squadId = data.squadId;
        if (!squads.has(squadId)) {
          squads.set(squadId, {
            id: squadId,
            name: data.squadName || 'New Squad',
            members: [],
            sharedBadges: [],
            activeMemberCount: 0,
            chat: []
          });
        }
        
        const squad = squads.get(squadId);
        const member = {
          id: ws.id,
          name: data.userName,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };
        
        squad.members.push(member);
        squad.activeMemberCount++;
        squadConnections.set(ws.id, squadId);
        
        // Notify others in squad
        broadcast('member_joined', { squadId, member });
        break;
        
      case 'bill_update':
        const currentSquadId = squadConnections.get(ws.id);
        if (currentSquadId) {
          broadcast('bill_update', { 
            squadId: currentSquadId, 
            bill: data.bill,
            userId: ws.id
          });
        }
        break;
        
      case 'chat_message':
        const userSquadId = squadConnections.get(ws.id);
        if (userSquadId) {
          const squad = squads.get(userSquadId);
          const message = {
            id: Date.now(),
            userId: ws.id,
            text: data.message.text,
            timestamp: new Date().toISOString()
          };
          squad.chat.push(message);
          broadcast('chat_message', { 
            squadId: userSquadId,
            message 
          });
        }
        break;
        
      case 'typing_status':
        const typingSquadId = squadConnections.get(ws.id);
        if (typingSquadId) {
          broadcast('typing_status', {
            squadId: typingSquadId,
            userId: ws.id,
            isTyping: data.isTyping
          });
        }
        break;
    }
  });
  
  ws.on('close', () => {
    const squadId = squadConnections.get(ws.id);
    if (squadId) {
      const squad = squads.get(squadId);
      squad.members = squad.members.filter(m => m.id !== ws.id);
      squad.activeMemberCount--;
      squadConnections.delete(ws.id);
      broadcast('member_left', { squadId, memberId: ws.id });
    }
  });
});

// --- Squad API Endpoints ---
app.get('/api/squads/:id', (req, res) => {
  const squad = squads.get(req.params.id);
  if (!squad) return res.status(404).json({ error: 'Squad not found' });
  res.json(squad);
});

app.post('/api/squads', (req, res) => {
  const squadId = Math.random().toString(36).substr(2, 9);
  const squad = {
    id: squadId,
    name: req.body.name,
    members: [],
    sharedBadges: [],
    activeMemberCount: 0,
    chat: []
  };
  squads.set(squadId, squad);
  res.json(squad);
});

app.post('/api/squads/:id/invite', (req, res) => {
  const squad = squads.get(req.params.id);
  if (!squad) return res.status(404).json({ error: 'Squad not found' });
  
  // In a real app, send email invites here
  res.json({ success: true });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Sessions will expire after', SESSION_EXPIRY / 1000 / 60 / 60, 'hours');
});

// --- BADGE LOGIC ---
const BADGE_TYPES = [
  {
    name: 'First Remix',
    desc: 'Created your first remix!',
    icon: '🧩',
    check: user => user.remixes >= 1
  },
  {
    name: 'Budget Boss',
    desc: 'Remix caused ≥$1M net budget change.',
    icon: '💰',
    check: (user, impact) => impact && impact.budget >= 100
  },
  {
    name: 'Green Guru',
    desc: 'Remix enviro score ≥90.',
    icon: '🌱',
    check: (user, impact) => impact && impact.greenScore >= 90
  },
  {
    name: 'Streak Starter',
    desc: 'Active for 3 days in a row.',
    icon: '🔥',
    check: user => user.streakDays >= 3
  },
  {
    name: 'Remix Pro',
    desc: 'Created 10 remixes.',
    icon: '🎶',
    check: user => user.remixes >= 10
  },
  {
    name: 'Vote Champ',
    desc: 'Cast 50 votes.',
    icon: '👍',
    check: user => (user.votes.up + user.votes.down) >= 50
  },
  {
    name: 'Bracket Winner',
    desc: 'Won a bracket battle.',
    icon: '🏆',
    check: user => user.wins >= 1
  },
  {
    name: 'Engagement Star',
    desc: 'Posted 10 comments or shares.',
    icon: '💬',
    check: user => user.engagement >= 10
  }
];

function checkAndAwardBadges(user, impact) {
  let newBadges = [];
  for (const badge of BADGE_TYPES) {
    if (!user.badges.some(b => b.name === badge.name) && badge.check(user, impact)) {
      user.badges.push({ name: badge.name, icon: badge.icon });
      newBadges.push(badge);
    }
  }
  return newBadges;
}
