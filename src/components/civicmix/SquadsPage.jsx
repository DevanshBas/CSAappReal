"use client";
import React, { useState, useEffect } from 'react';

import CreateSquadModal from './CreateSquadModal';

// Assuming a placeholder for a successful join state or refresh

const SquadsPage = () => {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSquadId, setSelectedSquadId] = useState(null); // State for selected squad
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [squadRoles, setSquadRoles] = useState([]); // State for squad roles

  // Placeholder function to simulate fetching the list of squads
  const fetchSquads = async () => { // Modified to fetch from /api/squads
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/squads');
      if (!response.ok) {
        throw new Error(`Error fetching squads: ${response.statusText}`);
      }
      const data = await response.json();
      setSquads(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder function to simulate fetching squad roles
  // Modified to fetch from /api/squads/roles
  const fetchSquadRoles = async () => {
    try {
      const response = await fetch('/api/squads/roles');
      if (!response.ok) {
        throw new Error(`Error fetching squad roles: ${response.statusText}`);
      }
      const data = await response.json();
      setSquadRoles(data);
      console.log("Fetched squad roles:", data); // Log fetched roles
    } catch (err) {
      console.error("Error fetching squad roles:", err);
    }
  }; // Corrected closing brace and parenthesis

  // Placeholder function to check if a user can perform an action based on role and permissions
  const canPerformAction = (userRole, requiredPermission) => {
    console.log(`Checking if role "${userRole}" has permission "${requiredPermission}"`);
    // In a real application, you would look up the role in `squadRoles`
    // and check its associated permissions.
    // For now, a basic placeholder check:
    // Placeholder logic - replace with actual permission check
    return true; 
  };
  // Placeholder function to simulate joining a squad
  // Modified to use fetch API to /api/squads/{squadId}/join
  const handleJoinSquad = async (squadId) => {
    console.log(`Attempting to join squad: ${squadId}`);
    try {
      const response = await fetch(`/api/squads/${squadId}/join`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Successfully joined squad: ${squadId}`);
      } // TODO: Handle different response statuses (e.g., already a member, request sent)
      // Optional: Refresh the squad list after joining or requesting to join
      // fetchSquads();
    } catch (error) {
      console.error(`Error joining squad ${squadId}:`, error);
    }
  };
  useEffect(() => {
    // Clear selected squad when fetching new list
    setSelectedSquadId(null);

    // Fetch squads and roles on component mount
    fetchSquads();
    fetchSquadRoles(); // Fetch roles on component mount
  }, []); // Fetch squads on component mount
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    // Optional: Refresh squad list after creation
    // fetchSquads();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Squads</h1>

      {/* Conditionally render either the squad list or the squad feed */}
      {!selectedSquadId ? (
        <>
          {/* Placeholder for Create Squad modal trigger */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Squad
          </button>

          {/* Loading and Error messages */}
          {loading && <p>Loading squads...</p>}
          {error && <p>Error loading squads: {error.message}</p>}

          {/* Display a message if no squads are found after loading */}
          {!loading && !error && squads.length === 0 && <p>No squads found.</p>}

          {/* Grid of Squads */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {squads.map(squad => (
              <div
                key={squad.id}
                className="border rounded-md p-4 flex flex-col items-center cursor-pointer" // Added cursor-pointer
                onClick={() => setSelectedSquadId(squad.id)} // Set selected squad on click
              >
                {/* Add basic styling */}
            {/* Placeholder for icon */}
            {squad.iconUrl && <img src={squad.iconUrl} alt={squad.name} className="w-12 h-12 mb-2" />}
            <h3 className="text-lg font-semibold mb-1">{squad.name}</h3>
            <p className="text-gray-600 mb-2">{squad.memberCount} Members</p>
             {/* Placeholders for description and top members */}
             {squad.description && <p>{squad.description}</p>} {/* Display description if available */}
              {/* Placeholder for top members */}
              {/* squad.topMembers && squad.topMembers.length > 0 && (
                 <p>Top Members: {squad.topMembers.map(member => member.name).join(', ')}</p> )} */}
             <p>Squad Description Placeholder</p>
            {/* Join button - onClick handler added */}
            <button className="px-3 py-1 bg-green-500 text-white rounded-md" onClick={(e) => { e.stopPropagation(); handleJoinSquad(squad.id); }}>
              {/* Conditional display of join button text based on join policy */}
              {squad.joinPolicy.type === 'open' && 'Join'}
              {squad.joinPolicy.type === 'approvalRequired' && 'Request to Join'}
              {squad.joinPolicy.type === 'inviteOnly' && 'Invite Only'} 
            </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Placeholder for Squad Feed when a squad is selected */
        <div className="mt-8">
          <h2>Squad Feed for Squad ID: {selectedSquadId}</h2>
          {/* TODO: Implement Squad Feed component or section */}
          <button onClick={() => setSelectedSquadId(null)}>Back to Squads List</button> {/* Button to go back */}
        </div>
      )}
      <CreateSquadModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        // Add other props for form handling if needed
      />
      
      {/* Create Squad Modal */}
    </div>
  );
};

export default SquadsPage;