import { useState } from 'react';
import { Smile, Plus, Search } from 'lucide-react';

const RemixReactions = ({ billId, currentUser }) => {
  const [reactions, setReactions] = useState([
    { id: 1, emoji: '🔥', count: 12, users: ['user1', 'user2'] },
    { id: 2, emoji: '💡', count: 8, users: ['user3'] },
    { id: 3, emoji: '🌟', count: 15, users: ['user4', 'user5'] }
  ]);

  const [showGifPicker, setShowGifPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async (query) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=YOUR_GIPHY_API_KEY&q=${query}&limit=15`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  const handleReaction = (reactionId) => {
    setReactions(reactions.map(reaction => {
      if (reaction.id === reactionId) {
        const userIndex = reaction.users.indexOf(currentUser);
        if (userIndex === -1) {
          return {
            ...reaction,
            count: reaction.count + 1,
            users: [...reaction.users, currentUser]
          };
        } else {
          return {
            ...reaction,
            count: reaction.count - 1,
            users: reaction.users.filter(user => user !== currentUser)
          };
        }
      }
      return reaction;
    }));
  };

  const addGifReaction = (gif) => {
    const newReaction = {
      id: Date.now(),
      gif: gif.images.fixed_height.url,
      count: 1,
      users: [currentUser]
    };
    setReactions([...reactions, newReaction]);
    setShowGifPicker(false);
  };

  return (
    <div className="reactions-container">
      <div className="reactions-list">
        {reactions.map(reaction => (
          <button
            key={reaction.id}
            className={`reaction-button ${reaction.users.includes(currentUser) ? 'active' : ''}`}
            onClick={() => handleReaction(reaction.id)}
          >
            {reaction.emoji || <img src={reaction.gif} alt="GIF reaction" className="gif-reaction" />}
            <span className="reaction-count">{reaction.count}</span>
          </button>
        ))}
        <button className="add-reaction" onClick={() => setShowGifPicker(true)}>
          <Plus size={20} />
        </button>
      </div>

      {showGifPicker && (
        <div className="gif-picker">
          <div className="gif-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search GIFs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchGifs(e.target.value);
              }}
            />
          </div>
          <div className="gif-grid">
            {gifs.map(gif => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => addGifReaction(gif)}
                className="gif-option"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RemixReactions;
