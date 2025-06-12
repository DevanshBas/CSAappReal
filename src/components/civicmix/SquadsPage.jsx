"use client";
import React, { useState, useEffect } from 'react';

import CreateSquadModal from './CreateSquadModal';

const SquadsPage = () => {
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSquadId, setSelectedSquadId] = useState(null); // State for selected squad
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [squadRoles, setSquadRoles] = useState([]); // State for squad roles

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

  const fetchSquadRoles = async () => { // Modified to fetch from /api/squads/roles
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
  };

  const canPerformAction = (userRole, requiredPermission) => {
    console.log(`Checking if role "${userRole}" has permission "${requiredPermission}"`);
    // In a real application, you would look up the role in `squadRoles`
    // and check its associated permissions.
    // For now, a basic placeholder check:
    return true;
  };

  const handleJoinSquad = async (squadId) => { // Modified to use fetch API to /api/squads/{squadId}/join
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
    <div className="py-8 px-4 text-primary font-poppins">
      <h1 className="text-2xl mb-4">Squads</h1>

      {/* Conditionally render either the squad list or the squad feed */}
      {!selectedSquadId ? (
        <div className="flex flex-col items-center w-full"> {/* Use a div instead of an empty fragment */}
          {/* Placeholder for Create Squad modal trigger */}
          <button
            className="px-4 py-2 bg-accent text-white rounded-xl transition-transform active:scale-[.98] hover:bg-white hover:bg-opacity-10"
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squads.map(squad => (
              <div
                key={squad.id}
                className="border rounded-xl p-4 flex flex-col items-center cursor-pointer shadow-sm bg-card"
                onClick={() => setSelectedSquadId(squad.id)} // Set selected squad on click
              >
                {/* Add basic styling */}
                {/* Placeholder for icon */}
                {squad.iconUrl && <img src={squad.iconUrl} alt={squad.name} className="w-12 h-12 mb-2" />}
                <h3 className="text-lg font-semibold mb-1">{squad.name}</h3>
                <p className="text-secondary mb-2">{squad.memberCount} Members</p>
                {/* Placeholders for description and top members */}
                {squad.description && <p>{squad.description}</p>} {/* Display description if available */}
                {/* Placeholder for top members */}
                {/* squad.topMembers && squad.topMembers.length > 0 && (
                 <p>Top Members: {squad.topMembers.map(member => member.name).join(', ')}</p> )} */}
                {/* Join button - onClick handler added */}
                <button className="px-3 py-1 bg-accent text-white rounded-xl transition-transform active:scale-[.98] hover:bg-white hover:bg-opacity-10" onClick={(e) => { e.stopPropagation(); handleJoinSquad(squad.id); }}>
                  {squad.joinPolicy.type === 'open' && 'Join'}
                  {squad.joinPolicy.type === 'approvalRequired' && 'Request to Join'}
                  {squad.joinPolicy.type === 'inviteOnly' && 'Invite Only'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Placeholder for Squad Feed when a squad is selected */
        <div className="mt-8">
          <h2>Squad Feed for Squad ID: {selectedSquadId}</h2>
          {/* TODO: Implement Squad Feed component or section */}
          <button onClick={() => setSelectedSquadId(null)} className="px-4 py-2 bg-accent text-white rounded-xl transition-transform active:scale-[.98] hover:bg-white hover:bg-opacity-10">Back to Squads List</button> {/* Button to go back */}
        </div>
      )}
      <CreateSquadModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        // Add other props for form handling if needed
      />
    </div>
  );
};

export default SquadsPage;
