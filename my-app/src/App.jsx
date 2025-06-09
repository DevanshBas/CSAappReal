import React, { useState, useEffect } from 'react';
import { Trophy, Users, Target, TrendingUp, Award, Play, Zap, DollarSign, Clock, Building, Heart, MessageCircle } from 'lucide-react';

const BillBlender = () => {
  const [activeTab, setActiveTab] = useState('remix');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(null);
  
  const [originalBill, setOriginalBill] = useState([
    { id: '1', type: 'funding', content: 'Allocate $50M for renewable energy research', amount: 50, icon: DollarSign, color: 'bg-green-100 border-green-300' },
    { id: '2', type: 'deadline', content: 'Implementation deadline: December 2025', amount: 12, icon: Clock, color: 'bg-blue-100 border-blue-300' },
    { id: '3', type: 'agency', content: 'Department of Energy oversight', amount: 0, icon: Building, color: 'bg-purple-100 border-purple-300' },
    { id: '4', type: 'funding', content: 'Tax incentives for solar installations: $25M', amount: 25, icon: DollarSign, color: 'bg-green-100 border-green-300' },
    { id: '5', type: 'deadline', content: 'Quarterly progress reports required', amount: 4, icon: Clock, color: 'bg-blue-100 border-blue-300' }
  ]);
  
  const [remixBill, setRemixBill] = useState([...originalBill]);
  const [availableComponents, setAvailableComponents] = useState([
    { id: '6', type: 'funding', content: 'Emergency backup fund: $10M', amount: 10, icon: DollarSign, color: 'bg-green-100 border-green-300' },
    { id: '7', type: 'deadline', content: 'Extended deadline: June 2026', amount: 18, icon: Clock, color: 'bg-blue-100 border-blue-300' },
    { id: '8', type: 'agency', content: 'EPA collaboration required', amount: 0, icon: Building, color: 'bg-purple-100 border-purple-300' }
  ]);

  const [impact, setImpact] = useState({
    budget: 75,
    jobs: 850,
    greenScore: 82,
    timeline: 24
  });

  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Climate Action Showdown', participants: 128, prize: 'Civic Creator Badge', status: 'active' },
    { id: 2, name: 'Education Reform Battle', participants: 64, prize: 'Impact Master Badge', status: 'starting' },
    { id: 3, name: 'Infrastructure Face-off', participants: 32, prize: 'Policy Pioneer Badge', status: 'final' }
  ]);

  const [userStats, setUserStats] = useState({
    remixes: 12,
    wins: 8,
    badges: ['Civic Creator', 'Impact Master'],
    rank: 'Policy Pioneer',
    level: 5
  });

  const [communityPosts] = useState([
    { 
      id: 1, 
      user: 'PolicyPro23', 
      remix: 'Climate Action Reform', 
      likes: 127, 
      comments: 23, 
      timeAgo: '2h ago',
      preview: 'Increased renewable funding by 40% and accelerated timeline...'
    },
    { 
      id: 2, 
      user: 'CivicNinja', 
      remix: 'Education Funding Boost', 
      likes: 89, 
      comments: 16, 
      timeAgo: '4h ago',
      preview: 'Redistributed $200M to underserved districts...'
    },
    { 
      id: 3, 
      user: 'BillMaster', 
      remix: 'Infrastructure Innovation', 
      likes: 156, 
      comments: 31, 
      timeAgo: '1d ago',
      preview: 'Smart city integration with green energy components...'
    }
  ]);

  const calculateImpact = (billComponents) => {
    const totalBudget = billComponents.reduce((sum, item) => sum + (item.amount || 0), 0);
    const estimatedJobs = Math.round(totalBudget * 11.3);
    const greenScore = Math.min(100, Math.round(totalBudget * 1.1 + 35));
    const deadlineItems = billComponents.filter(item => item.type === 'deadline');
    const timeline = deadlineItems.length > 0 ? deadlineItems.reduce((sum, item) => sum + item.amount, 0) : 24;
    
    setImpact({
      budget: totalBudget,
      jobs: estimatedJobs,
      greenScore: greenScore,
      timeline: timeline
    });
  };

  const handleDragStart = (e, item, source) => {
    setDraggedItem({ item, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, zone) => {
    e.preventDefault();
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e, targetZone) => {
    e.preventDefault();
    setDragOverZone(null);
    
    if (!draggedItem) return;
    
    const { item, source } = draggedItem;
    
    if (source === targetZone) return;
    
    if (source === 'remix') {
      setRemixBill(prev => {
        const updated = prev.filter(i => i.id !== item.id);
        calculateImpact(updated);
        return updated;
      });
    } else {
      setAvailableComponents(prev => prev.filter(i => i.id !== item.id));
    }
    
    if (targetZone === 'remix') {
      setRemixBill(prev => {
        const updated = [...prev, item];
        calculateImpact(updated);
        return updated;
      });
    } else {
      setAvailableComponents(prev => [...prev, item]);
    }
    
    setDraggedItem(null);
  };

  const moveToRemix = (item) => {
    setAvailableComponents(prev => prev.filter(i => i.id !== item.id));
    setRemixBill(prev => {
      const updated = [...prev, item];
      calculateImpact(updated);
      return updated;
    });
  };

  const moveToAvailable = (item) => {
    setRemixBill(prev => {
      const updated = prev.filter(i => i.id !== item.id);
      calculateImpact(updated);
      return updated;
    });
    setAvailableComponents(prev => [...prev, item]);
  };

  useEffect(() => {
    calculateImpact(remixBill);
  }, []);

  const BillCard = ({ item, source, showActions = false }) => {
    const IconComponent = item.icon;
    const isDragging = draggedItem?.item.id === item.id;
    
    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, item, source)}
        className={`p-4 mb-3 rounded-lg border-2 ${item.color} ${
          isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        } transition-all duration-200 cursor-move hover:shadow-md hover:scale-105 group`}
      >
        <div className="flex items-start gap-3">
          <IconComponent className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {item.content}
            </p>
            {item.amount > 0 && (
              <p className="text-xs text-gray-600 mt-1 font-semibold">
                ${item.amount}M
              </p>
            )}
          </div>
          {showActions && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              {source === 'available' ? (
                <button
                  onClick={() => moveToRemix(item)}
                  className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => moveToAvailable(item)}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ImpactCard = ({ title, value, unit, icon: Icon, color, change = null }) => (
    <div className={`p-4 rounded-lg ${color} border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {typeof value === 'number' && value > 999 ? value.toLocaleString() : value}
        <span className="text-sm font-normal text-gray-600 ml-1">{unit}</span>
      </div>
      {change && (
        <div className={`text-xs mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}{change} from original
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8 py-6">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-xl px-6 py-3 shadow border flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full max-w-md mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Level {userStats.level}</span>
            </div>
            <div className="w-full sm:w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '70%'}}></div>
            </div>
            <span className="text-sm text-gray-600">{userStats.rank}</span>
          </div>
          <div className="flex bg-white rounded-xl p-1 shadow border w-full max-w-md">
            {[
              { id: 'remix', label: 'Remix Playground', icon: Play },
              { id: 'battles', label: 'Bracket Battles', icon: Trophy },
              { id: 'community', label: 'Community', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-base w-full sm:w-auto justify-center font-medium ${
                  activeTab === id
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'remix' && (
          <div>
            {/* Original Bill Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="inline-block">📄</span>
                <span>Original Bill</span>
                <span className="text-base font-normal text-gray-500 ml-2">Clean Energy Act 2025</span>
              </h2>
              <div className="space-y-4">
                {originalBill.map((item) => (
                  <div key={item.id} className={`p-4 rounded-xl border ${item.color} shadow-sm flex items-center gap-4`}> 
                    <item.icon className="w-6 h-6 flex-shrink-0 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-800 leading-tight">
                        {item.content}
                      </p>
                      {item.amount > 0 && (
                        <p className="text-sm text-gray-600 mt-1 font-semibold">
                          ${item.amount}M
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Remix Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="inline-block">🎨</span>
                <span>Your Remix</span>
                <span className="text-base font-normal text-gray-500 ml-2">({remixBill.length} components)</span>
              </h2>
              <div
                onDragOver={(e) => handleDragOver(e, 'remix')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'remix')}
                className="min-h-32 p-2 sm:p-4 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/40 mb-4"
              >
                {remixBill.length > 0 ? (
                  remixBill.map((item) => (
                    <BillCard key={item.id} item={item} source="remix" showActions={true} />
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-medium">Ready to Remix!</p>
                    <p className="text-sm">Drag components here or click Add buttons below</p>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  🧩 Component Library
                  <span className="text-base font-normal text-gray-500">({availableComponents.length} available)</span>
                </h3>
                <div
                  onDragOver={(e) => handleDragOver(e, 'available')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'available')}
                  className="space-y-2 p-2 rounded-xl border border-dashed border-blue-200 bg-blue-50/40"
                >
                  {availableComponents.map((item) => (
                    <BillCard key={item.id} item={item} source="available" showActions={true} />
                  ))}
                  {availableComponents.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      <p className="text-sm">All components are in use!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive grid for battles and community */}
        {activeTab === 'battles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🏆 Active Tournaments
              </h2>
              <div className="space-y-4">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className="p-5 border-2 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-purple-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{tournament.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tournament.status === 'active' ? 'bg-green-100 text-green-800' :
                        tournament.status === 'starting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {tournament.participants} players
                      </span>
                      <span className="text-sm font-medium text-purple-600">
                        🏅 {tournament.prize}
                      </span>
                    </div>
                    <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-md hover:bg-purple-700 transition-colors font-semibold shadow-sm hover:shadow-md">
                      {tournament.status === 'active' ? 'Join Battle' : tournament.status === 'starting' ? 'Register Now' : 'View Results'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📈 Your Battle Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Remixes Created</span>
                  <span className="font-bold text-purple-600 text-xl">{userStats.remixes}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Battle Wins</span>
                  <span className="font-bold text-green-600 text-xl">{userStats.wins}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Win Rate</span>
                  <span className="font-bold text-orange-600 text-xl">{Math.round((userStats.wins / userStats.remixes) * 100)}%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Current Rank</span>
                  <span className="font-bold text-blue-600 text-lg">{userStats.rank}</span>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    🏅 Your Badge Collection
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userStats.badges.map((badge, index) => (
                      <div key={index} className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg border text-center">
                        <Award className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-800">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg">
                  🎯 Quick Battle
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                👥 Community Feed
                <div className="flex items-center ml-auto gap-4">
                  <select className="px-3 py-1 border rounded text-sm">
                    <option>🔥 Trending</option>
                    <option>🆕 Latest</option>
                    <option>👑 Top Rated</option>
                  </select>
                </div>
              </h2>
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="p-6 border-2 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-purple-300 hover:shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {post.user[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{post.user}</h3>
                          <p className="text-gray-600">shared remix: <span className="font-semibold text-purple-600">"{post.remix}"</span></p>
                          <p className="text-sm text-gray-500 mt-1">{post.timeAgo}</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
                        ⚔️ Challenge
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-purple-400">
                      <p className="text-gray-700 italic">"{post.preview}"</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          {post.likes} likes
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments} comments
                        </button>
                        <button className="hover:text-purple-500 transition-colors">
                          Share
                        </button>
                      </div>
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        View Full Remix →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  Load More Posts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillBlender;