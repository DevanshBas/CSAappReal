import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId, onClose }) => { // Added onClose prop for modal
  const [userData, setUserData] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [allBadges, setAllBadges] = useState([]); // Renamed from badges to allBadges for clarity

  // Separate loading states for each fetch
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingUserSettings, setLoadingUserSettings] = useState(true);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const [loading, setLoading] = useState(true); // Main loading state

  const [error, setError] = useState(null); // Main error state


  // Placeholder function to fetch user data
  const fetchUserData = async (id) => {
    setLoadingUserData(true); // Set individual loading state
    setError(null); // Keep the main error state
    console.log(`Fetching user data for ID: ${id}`);
    try {
      // Simulate API call to /api/users/{userId}
      await new Promise(resolve => setTimeout(resolve, 500));
      setUserData({
        id: id,
        displayName: `User ${id}`,
        handle: `@user${id}`,
        bio: `This is the bio for user ${id}.`,
        avatar: '/path/to/default-avatar.png', // Placeholder
        banner: '/path/to/default-banner.png', // Placeholder
        badges: [{ badgeId: 'badge1' }, { badgeId: 'badge3' }], // Sample earned badges
        // Add other user properties as needed
        totalRemixes: 15,
        bracketWins: 3,
        xp: 1250,
        bioSections: [{ title: 'About Me', content: 'I am a remix enthusiast!' }, { title: 'Interests', content: 'Climate, Tech, Education' }],
        streak: 7,
        stats: { // Sample stats data matching the schema types
          totalRemixes: 15,
          bracketWins: 3,
          xp: 1250,
          streak: 7,
        },
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoadingUserData(false); // Set individual loading state to false in finally
    }
  };

  // Placeholder function to fetch user settings
  const fetchUserSettings = async () => {
    setLoadingUserSettings(true); // Set individual loading state
    console.log('Fetching user settings');
    try {
      // Simulate API call to /api/user/settings
      await new Promise(resolve => setTimeout(resolve, 500));
      setUserSettings({
        statWidgetSchema: [{ type: 'totalRemixes', label: 'Total Remixes' }, { type: 'bracketWins', label: 'Bracket Wins' }, { type: 'xp', label: 'XP' }, { type: 'streak', label: 'Streak' }], // Added labels for display
        // Add other settings as needed
      });
    } catch (err) {
      // Handle error for settings if needed
      console.error("Error fetching user settings:", err);
      setError(err); // Set main error state
    } finally {
      setLoadingUserSettings(false); // Set individual loading state to false in finally
    }
  };

  // Placeholder function to fetch all badge metadata
  const fetchBadges = async () => {
    setLoadingBadges(true); // Set individual loading state
    console.log('Fetching badge metadata from /api/badges');
    try {
      // Simulate API call to /api/badges
      await new Promise(resolve => setTimeout(resolve, 500));
      setAllBadges([
        { id: 'badge1', name: 'Early Adopter', icon: '/path/to/badge1.png', description: 'Joined early!' },
        { id: 'badge2', name: 'Bracket Master', icon: '/path/to/badge2.png' },
        { id: 'badge3', name: 'Social Butterfly', icon: '/path/to/badge3.png', description: 'Liked a lot of remixes.' },
      ]); // Sample badges
    } catch (err) {
      // Handle error for badges if needed
      console.error("Error fetching badges:", err);
      setError(err); // Set main error state
    } finally {
      setLoadingBadges(false); // Set individual loading state to false in finally
    }
  };

  useEffect(() => {
    // Set main loading state to true when initiating fetches
    setLoading(true);

    // Initiate all data fetches
    fetchUserSettings(); // Fetch settings (not dependent on userId)
    fetchBadges(); // Fetch all badges metadata (not dependent on userId)
    if (userId) { // Only fetch user data if userId is provided
        fetchUserData(userId);
    } else {
        // If no userId, set user data loading to false immediately
        setLoadingUserData(false);
        setUserData(null); // Clear user data
    }

  }, [userId]); // Refetch user data when userId changes


  // Effect to set main loading state to false when all individual fetches are complete
  useEffect(() => {
    if (!loadingUserData && !loadingUserSettings && !loadingBadges) {
      setLoading(false); // Set main loading to false when all individual fetches are complete
    }
  }, [loadingUserData, loadingUserSettings, loadingBadges]);


   // Placeholder function for editing profile
   const handleEditProfile = () => {
     console.log('Edit Profile button clicked');
     // TODO: Implement edit profile functionality (e.g., open a modal)
   };


  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {/* Add a close button for the modal */}
      {onClose && <button onClick={onClose} style={{ float: 'right' }}>Close</button>}
      <h2>User Profile</h2>

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: 'red' }}>Error loading profile: {error.message}</p>}

      {!loading && !error && !userData && <p>User not found.</p>} {/* Handle case where user data is not loaded */}


      {userData && (
        <>
          {/* Profile Header: Banner, Avatar, Name, Handle */}
          <div className="banner-section" style={{ marginBottom: '20px', position: 'relative' }}>
            <img src={userData.banner} alt="Banner" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
            <div style={{ position: 'absolute', bottom: '-50px', left: '20px' }}>
               <img src={userData.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid white' }} />
            </div>
             <div style={{ marginTop: '60px', marginLeft: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '5px' }}>{userData.displayName}</h2>
                <p style={{ fontSize: '1.1rem', color: '#555' }}>{userData.handle}</p>
             </div>
          </div>


          {/* Stats Card */}
          <div className="stats-card" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px', marginTop: '70px' }}>
            <h3>Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {userSettings?.statWidgetSchema.map(widget => (
                userData.stats?.[widget.type] !== undefined ? ( // Check if stat data exists
                   <div key={widget.type} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                     <strong>{widget.label || widget.type}:</strong> {userData.stats[widget.type]}
                      {/* Add specific widget rendering here based on widget.type if needed */}
                      {widget.type === 'xp' && (
                         <div style={{ width: '100%', backgroundColor: 'lightgray', height: '10px', marginTop: '5px' }}>
                            {/* Basic XP bar representation */}
                            <div style={{ width: `${(userData.stats.xp / 2000) * 100}%`, backgroundColor: 'green', height: '100%' }}></div> {/* Assuming max XP of 2000 for progress */}
                         </div>
                      )}
                   </div>
                ) : null // Don't render if stat data is missing
              ))}
            </div>
          </div>


          {/* Bio Section */}
          <div className="bio-section" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Bio</h3>
            {userData.bioSections && userData.bioSections.length > 0 ? (
              userData.bioSections.map((section, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              ))
            ) : (
              // Fallback for old bio property if bioSections doesn't exist or is empty
              userData.bio && <p>{userData.bio}</p>
            )}
          </div>


          {/* BadgeCase */}
          <div className="badge-case" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Badges</h3>
            {/* Display user's earned badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {userData.badges && userData.badges.length > 0 ? (
                userData.badges.map(userBadge => {
                  // Find the metadata for the earned badge
                  const badgeMetadata = allBadges.find(b => b.id === userBadge.badgeId);
                  return badgeMetadata ? (
                    <div key={userBadge.badgeId} style={{ textAlign: 'center', maxWidth: '80px' }}>
                      <img
                        src={badgeMetadata.icon}
                        alt={badgeMetadata.name}
                        style={{ width: '50px', height: '50px', margin: '0 auto' }}
                        title={badgeMetadata.name + (badgeMetadata.description ? ': ' + badgeMetadata.description : '')}
                      />
                       <p style={{ fontSize: '0.8rem', marginTop: '5px', wordBreak: 'break-word' }}>{badgeMetadata.name}</p>
                    </div>
                  ) : (
                     // Optional: Display a placeholder if badge metadata not found
                     <div key={userBadge.badgeId} style={{ textAlign: 'center', maxWidth: '80px' }}>
                         <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '50%', margin: '0 auto' }}></div>
                         <p style={{ fontSize: '0.8rem', marginTop: '5px', wordBreak: 'break-word', color: '#888' }}>Unknown Badge</p>
                     </div>
                  );
                })
              ) : (
                 <p>No badges earned yet.</p>
              )}
            </div>
          </div>


          {/* Placeholder for RemixGallery */}
          <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Remix Gallery</h3>
            <p>Placeholder for user's remixes.</p>
            {/* TODO: Implement Remix Gallery component */}
          </div>


          {/* Placeholder for BattleHistory */}
          <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Battle History</h3>
            <p>Placeholder for user's battle history.</p>
             {/* TODO: Implement Battle History component */}
          </div>


          {/* Edit Profile Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
             <button
                onClick={handleEditProfile}
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
             >
                Edit Profile
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
