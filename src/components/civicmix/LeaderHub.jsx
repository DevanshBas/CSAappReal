import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile'; // Assuming UserProfile is in the same directory

const LeaderHub = ({ userId }) => { // Added userId prop for potential future use (e.g., highlighting current user)
  const [activeTab, setActiveTab] = useState('global'); // 'global', 'squad', 'badges'
  const [selectedRange, setSelectedRange] = useState('allTime'); // 'allTime', 'thisMonth', 'thisWeek', 'today'
  const [leaderboardData, setLeaderboardData] = useState([]); // State to hold the fetched leaderboard data
  const [leaderboardTypes, setLeaderboardTypes] = useState([]); // State to hold available leaderboard types (for tabs)
  const [dateRanges, setDateRanges] = useState([]); // State to hold available date ranges (for selector)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State to hold the ID of the selected user for the modal

  // Placeholder function to simulate fetching leaderboard data
  const fetchLeaderboardData = async (type, range) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate fetching data based on type and range
      const sampleData = [
        { id: 1, rank: 1, username: 'UserA', score: 1000, badges: 5 },
        { id: 2, rank: 2, username: 'UserB', score: 950, badges: 4 },
        { id: 3, rank: 3, username: 'UserC', score: 900, badges: 4 },
      ];
      setLeaderboardData(sampleData);
    } catch (err) {
      setError(err);
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder function to simulate fetching leaderboard types
  const fetchLeaderboardTypes = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setLeaderboardTypes([{ id: 'global', name: 'Global' }, { id: 'squad', name: 'Squad' }, { id: 'badges', name: 'Badges' }]);
  };

  // Placeholder function to simulate fetching date ranges
  const fetchDateRanges = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setDateRanges([{ id: 'allTime', name: 'All Time' }, { id: 'thisMonth', name: 'This Month' }, { id: 'thisWeek', name: 'This Week' }, { id: 'today', name: 'Today' }]);
  };

  // Fetch initial data, types, and ranges on component mount
  useEffect(() => {
    const fetchDataOptions = async () => {
      const types = await fetchLeaderboardTypes();
      const ranges = await fetchDateRanges();

      if (types.length > 0) {
        setActiveTab(types[0].id);
      }
      if (ranges.length > 0) {
        setSelectedRange(ranges[0].id);
      }
    };
    fetchDataOptions();
  }, []);

  // Fetch leaderboard data whenever activeTab or selectedRange changes
  useEffect(() => {
    fetchLeaderboardData(activeTab, selectedRange);
  }, [activeTab, selectedRange]);

  // Function to handle opening the modal
  const openUserProfileModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeUserProfileModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null); // Clear selected user ID on close
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard Hub</h1>
      {/* Tabs for Leaderboard Types */}
      {loading && leaderboardTypes.length === 0 && <p>Loading leaderboard types...</p>}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="leaderboardTabs" role="tablist">
          {leaderboardTypes.map(type => (
            <li className="me-2" role="presentation" key={type.id}>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === type.id}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === type.id ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab(type.id)}
              >
                {type.name}
              </button>
            </li>
          ))}
          {leaderboardTypes.length === 0 && !loading && (
             <li className="me-2" role="presentation">
                <span className="inline-block p-4 text-gray-500">No leaderboard types available.</span>
             </li>
          )} {/* Added closing parenthesis for conditional rendering */}
        </ul>
      </div>
      {/* Leaderboard Content */}
      <div id="leaderboardTabContent">
        {/* Date Range Selector */}
        <div className="mb-4 flex items-center">
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Select Date Range:</label>
          <select
            id="dateRange"
            name="dateRange"
            className="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            {dateRanges.map(range => (
              <option key={range.id} value={range.id}>{range.name}</option>
            ))}
             {/* Show loading option only if no ranges are loaded and still loading */}
            {dateRanges.length === 0 && loading && (<option value="">Loading ranges...</option>)}
          </select>
        </div>

        {/* Leaderboard Table Placeholder */}
        <div className="mt-6">
          {loading && <p>Loading leaderboard...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {!loading && !error && leaderboardData.length === 0 && (
            <p>No leaderboard data available for the selected criteria.</p>
          )}
          {!loading && !error && leaderboardData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      User
                    </th>
                    {/* Add more table headers as needed */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Badges
                    </th>
                    {/* Placeholder headers */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      XP
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Level
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Wins
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {leaderboardData.map(user => (
                    <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => openUserProfileModal(user.id)}> {/* Add onClick handler */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.rank}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {/* Placeholder for Avatar */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-400 rounded-full"> {/* Placeholder avatar */}</div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                                {/* Placeholder for Display Name if different */}
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.score}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.badges}</td>
                       {/* Placeholder data for other columns */}
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">XP Bar Placeholder</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Level Placeholder</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Wins Placeholder</td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Streak Placeholder</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* UserProfile Modal */}
      {isModalOpen && selectedUserId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="modal-content bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
            <UserProfile userId={selectedUserId} onClose={closeUserProfileModal} /> {/* Pass onClose to UserProfile */}\
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderHub;