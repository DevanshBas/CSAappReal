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
      {onClose && <button onClick={onClose} style={{ float: 'right' }}>Close</button>}
      <h2>User Profile</h2>

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: 'red' }}>Error loading profile: {error.message}</p>}
      {!loading && !error && !userData && <p>User not found.</p>} {/* Handle case where user data is not loaded */}

      {userData && (
        <>
          {/* Profile Header: Banner, Avatar, Name, Handle */}
          <div className="relative flex flex-col items-center justify-center text-center bg-muted/20 rounded-2xl px-6 py-10 shadow-md mb-6">
            <img src={userData.banner} alt="Banner" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img src={userData.avatar} alt="Avatar" className="h-24 w-24 rounded-full border-4 border-white" />
            </div>
            <div className="mt-16"> {/* Adjust margin top to accommodate the avatar */}
                <h2 className="text-2xl font-semibold">{userData.displayName}</h2>
                <p className="text-muted-foreground text-sm">{userData.handle}</p>
            </div>
          </div>

          <div className="bio-section" style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Bio</h3>
            {userData.bioSections && userData.bioSections.length > 0 ? (
              userData.bioSections.map((section, index) => (
                <div key={index} style={{ marginBottom: '10px' }} className="space-y-3">
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              ))
            ) : (
              // Fallback for old bio property if bioSections doesn't exist or is empty
              userData.bio && <p className="space-y-3">{userData.bio}</p>
            )}
          </div>

          {/* Wrap the following sections in a parent grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 px-4 py-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-card rounded-2xl p-6 shadow-md mb-6">
              <div className="text-center">
                <div className="text-lg font-semibold">{userData?.totalPoints || 0}</div>
                <div className="text-muted-foreground text-sm">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{userData?.remixesCreated || 0}</div>
                <div className="text-muted-foreground text-sm">Remixes Created</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{userData?.battlesWon || 0}</div>
                <div className="text-muted-foreground text-sm">Battles Won</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{userData?.streak || 0}</div>
                <div className="text-muted-foreground text-sm">Streak</div>
              </div>
            </div>

            {/* Badge Case */}
            <div className="bg-card rounded-2xl shadow-md p-6 space-y-3">
              <h2 className="text-lg font-semibold">Badges</h2>
              {/* Display user's earned badges */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 bg-card rounded-2xl p-6 shadow-md mb-6">
                {userData.badges && userData.badges.length > 0 ? (
                  userData.badges.map(userBadge => {
                    // Find the metadata for the earned badge
                    const badgeMetadata = allBadges.find(b => b.id === userBadge.badgeId);
                    return badgeMetadata ? (
                      <div key={userBadge.badgeId} className="text-center">
                        <img
                          src={badgeMetadata.icon}
                          alt={badgeMetadata.name}
                          className="w-12 h-12 mx-auto" // Fixed size and centered
                          title={badgeMetadata.name + (badgeMetadata.description ? ': ' + badgeMetadata.description : '')}
                        />
 <p className="text-xs mt-1">{badgeMetadata.name}</p> {/* Smaller text for badge name */}
                      </div>
 ) : (
 // Optional: Display a placeholder if badge metadata not found
 <div key={userBadge.badgeId} className="text-center">
 <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto"></div> {/* Fixed size and centered placeholder */}
 <p className="text-xs mt-1 text-muted-foreground">Unknown Badge</p>
 </div>
 );
 })
 ) : (
 <p className="text-muted-foreground text-sm">No badges earned yet.</p>
 )}
              </div>
            </div>

            {/* Placeholder for RemixGallery */}
            <div className="bg-card rounded-2xl shadow-md p-6 space-y-3">
              <h2 className="text-lg font-semibold mb-4">Remix Gallery</h2>
              {/* TODO: Implement Remix Gallery component */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Placeholder for individual Remix Cards */}
                <div className="bg-muted rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-300 flex items-center justify-center text-muted-foreground"> {/* Placeholder image */}
                    Image Placeholder
                  </div>
                </div>
              </div>
            </div>
            {/* Placeholder for BattleHistory */}
            <div className="bg-card rounded-2xl shadow-md p-6 space-y-3">
              <h2 className="text-lg font-semibold">Your Battle Submissions</h2> {/* Renamed from Battle History */}
              <div className="bg-card rounded-2xl shadow-md p-6 grid grid-cols-1 gap-4">
                {/* Placeholder for individual battle submissions */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex-grow mb-2 sm:mb-0">
                    <div className="font-bold">My Awesome Remix Title</div>
                    <div className="text-muted-foreground text-sm">Battle: Climate Action Showdown</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Active</span> {/* Status badge */}
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-semibold">150 Votes</div>
                      <div className="w-20 h-2 bg-blue-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[75%] transition-all duration-500 ease-out"></div></div> {/* Progress bar (75% filled) */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
