import React, { useState, useEffect, useRef } from 'react';
import { Users, Plus, Share2, Award, MessageSquare } from 'lucide-react';

const SquadWorkspace = ({ remixBill, onBillChange, user }) => {
  const [squad, setSquad] = useState({
    id: '',
    name: '',
    members: [],
    sharedBadges: [],
    activeMember: []
  });
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [wsConnection, setWsConnection] = useState(null);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const chatEndRef = useRef(null);

  // Scrolls chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    // Connect to WebSocket for real-time collaboration
    const ws = new WebSocket('ws://localhost:4000');
    
    ws.onopen = () => {
      console.log('Connected to squad workspace');
      setWsConnection(ws);
      
      // Join squad on connection
      ws.send(JSON.stringify({
        type: 'join_squad',
        squadId: 'demo-squad', // In real app, get from props or URL
        userName: user?.name || 'Anonymous',
        squadName: 'Climate Justice Crew'
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'bill_update':
          onBillChange(data.bill);
          break;
        case 'member_joined':
          setSquad(prev => ({
            ...prev,
            members: [...prev.members, data.member],
            activeMember: [...prev.activeMember, data.member]
          }));
          break;
        case 'member_left':
          setSquad(prev => ({
            ...prev,
            activeMember: prev.activeMember.filter(m => m.id !== data.memberId)
          }));
          break;
        case 'chat_message':
          setChat(prev => [...prev, data.message]);
          break;
        case 'badge_earned':
          setSquad(prev => ({
            ...prev,
            sharedBadges: [...prev.sharedBadges, data.badge]
          }));
          break;
        case 'typing_status':
          setTypingUsers(prev => {
            const updated = new Set(prev);
            if (data.isTyping) {
              updated.add(data.userName);
            } else {
              updated.delete(data.userName);
            }
            return updated;
          });
          break;
      }
    };

    let typingTimeout;
    const handleTyping = (isTyping) => {
      if (wsConnection) {
        wsConnection.send(JSON.stringify({
          type: 'typing_status',
          isTyping
        }));
      }
    };

    const messageInput = document.getElementById('chat-input');
    if (messageInput) {
      messageInput.addEventListener('input', () => {
        handleTyping(true);
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => handleTyping(false), 1000);
      });
    }

    return () => {
      clearTimeout(typingTimeout);
      if (wsConnection) {
        wsConnection.close();
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chatMessage = {
      type: 'chat_message',
      message: {
        text: message,
        user: user?.name || 'Anonymous',
        timestamp: new Date().toISOString()
      }
    };

    wsConnection?.send(JSON.stringify(chatMessage));
    setMessage('');
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    wsConnection?.send(JSON.stringify({
      type: 'invite_member',
      email: inviteEmail
    }));
    
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="squad-workspace">
      <div className="squad-header">
        <div className="squad-info">
          <h2>
            <Users className="icon" size={24} />
            {squad.name || 'Climate Justice Crew'}
          </h2>
          <div className="squad-stats">
            <span className="active-count">
              {squad.activeMember.length} active members
            </span>
            <span className="badge-count">
              <Award size={16} /> {squad.sharedBadges.length} shared badges
            </span>
          </div>
          <div className="member-avatars">
            {squad.activeMember.map(member => (              <div 
                key={member.id} 
                className={`member-avatar ${typingUsers.has(member.id) ? 'typing' : ''}`}
                title={`${member.name}${typingUsers.has(member.id) ? ' is typing...' : ''}`}
                style={{ backgroundColor: member.color }}
              >
                {member.name[0]}
              </div>
            ))}
            <button className="add-member" onClick={() => setShowInviteModal(true)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="squad-badges">
          {squad.sharedBadges.map(badge => (
            <div key={badge.id} className="squad-badge" title={badge.description}>
              {badge.icon} {badge.name}
            </div>
          ))}
        </div>
      </div>

      <div className="workspace-content">
        <div className="bill-editor">
          {/* Collaborative bill editing area */}
          {/* This will show the remixBill content */}
        </div>

        <div className="collaboration-sidebar">
          {/* Chat Section */}
          <div className="chat-section">
            <h3>
              <MessageSquare size={16} />
              Squad Chat
            </h3>
            <div className="chat-messages">
              {chat.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`chat-message ${msg.user === user.name ? 'own-message' : ''}`}
                >
                  <div className="message-header">
                    <span className="user">{msg.user}</span>
                    <span className="time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={sendMessage} className="chat-input">
              <input
                id="chat-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>

          {/* Active Members */}
          <div className="active-members">
            <h3>
              <Users size={16} />
              Active Now
            </h3>
            {squad.activeMember.map(member => (
              <div key={member.id} className="active-member">
                <div 
                  className="member-indicator"
                  style={{ backgroundColor: member.color }}
                />
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="invite-modal">
          <div className="modal-content">
            <h3>Invite a Member</h3>
            <form onSubmit={handleInvite}>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter member's email"
                required
              />
              <button type="submit">Send Invite</button>
              <button type="button" onClick={() => setShowInviteModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquadWorkspace;
