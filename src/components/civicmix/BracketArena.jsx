import React, { useState, useEffect } from 'react';

// Assuming you have a RemixCard component in the same directory or adjust the path
import RemixCard from './RemixCard';
import HighlightBattleCard from '/src/components/civicmix/HighlightBattleCard.jsx';
import UpcomingBattleCard from '/src/components/civicmix/UpcomingBattleCard.jsx';
import MineBattleCard from '/src/components/civicmix/MineBattleCard.jsx';
import HistoryBattleCard from '/src/components/civicmix/HistoryBattleCard.jsx';

const BracketArena = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  const [battles, setBattles] = useState([]);
  const [loadingBattles, setLoadingBattles] = useState(false);
  const [errorBattles, setErrorBattles] = useState(null);

  const [selectedBattleId, setSelectedBattleId] = useState(null);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [loadingBattleDetails, setLoadingBattleDetails] = useState(false);
  const [errorBattleDetails, setErrorBattleDetails] = useState(null);

  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0); // State to track the current matchup

  // Placeholder function to simulate fetching battles based on tab
  const fetchBattles = async (tab) => {
    setLoadingBattles(true);
    setErrorBattles(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Placeholder data based on tab
      let sampleBattles = [];
      switch (tab) {
        case 'highlights':
          // Highlights might include battles that are currently popular or featured
          sampleBattles = [
            { id: 'h1', name: 'Featured Climate Battle', status: 'voting', description: 'Vote on the best climate solutions!' },
            { id: 'h2', name: 'Popular Tech Remixes', status: 'voting', description: 'See the top tech ideas remixed.' },
          ];
          break;
        case 'upcoming':
          // Upcoming battles with start times
          sampleBattles = [
            { id: 'u1', name: 'Next Week\'s Education Showdown', status: 'upcoming', startTime: '2023-11-15T10:00:00Z', description: 'Get ready for the education battle!' },
            { id: 'u2', name: 'Healthcare Policy Bracket', status: 'upcoming', startTime: '2023-11-20T14:00:00Z', description: 'Policy ideas go head-to-head.' },
          ];
          break;
        case 'voting':
          // Battles currently in the voting phase
          sampleBattles = [
            { id: 'v1', name: 'Vote Now: Budget Remixes', status: 'voting', description: 'Help decide the best budget approach.' },
            { id: 'v2', name: 'Community Choice Battle', status: 'voting', description: 'Your vote matters in this community battle.' },
          ];
          break;
        case 'mine':
          // Battles the current user is involved in (either created or submitted remixes)
          sampleBattles = [
            { id: 'm1', name: 'My Latest Entry Battle', status: 'upcoming', description: 'Your entry is in this battle.' },
            { id: 'm2', name: 'Previous Win Showcase', status: 'history', winnerRemix: { id: 'myRemix1', name: 'My Winning Remix' }, description: 'You won this battle!' },
          ];
          break;
        case 'history':
          // Past battles with results
          sampleBattles = [
            { id: 'his1', name: 'All-Time Champion Tournament', status: 'history', winnerRemix: { id: 'champRemix', name: 'Champion Remix' }, description: 'The grand finale of champions.' },
            { id: 'his2', name: 'Past Battles Archive', status: 'history', winnerRemix: { id: 'oldRemix', name: 'Historic Remix' }, description: 'A look back at previous battles.' },
          ];
          break;
        default:
          sampleBattles = [];
      }
      setBattles(sampleBattles);
    } catch (err) {
      setErrorBattles(err);
      setBattles([]);
    } finally {
      setLoadingBattles(false);
    }
  };

  // Placeholder function to simulate fetching specific battle details
  const fetchBattleDetails = async (battleId) => {
    setLoadingBattleDetails(true);
    setErrorBattleDetails(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Placeholder detailed battle data
      const sampleBattleDetails = {
        id: battleId,
        name: `Details for Battle ${battleId}`,
        description: `This is a detailed description for battle ${battleId}.`,
        theme: { id: 'theme1', name: 'Default Theme' },
        seedingOptions: ['random', 'ranked'],
        votingWindow: { startTime: '...', endTime: '...', duration: '48 hours' },
        prizes: [{ id: 'p1', name: 'Winner Badge' }],
        sponsors: [{ id: 's1', name: 'CivicMix' }],
        matchups: [
          { id: 'match1', remix1: { id: 'r1', name: 'Remix A', content: '...' }, remix2: { id: 'r2', name: 'Remix B', content: '...' }, votes1: 10, votes2: 5 },
          { id: 'match2', remix1: { id: 'r3', name: 'Remix C', content: '...' }, remix2: { id: 'r4', name: 'Remix D', content: '...' }, votes1: 20, votes2: 15, reactions: [] },
           { id: 'match3', remix1: { id: 'r5', name: 'Remix E', content: '...' }, remix2: { id: 'r6', name: 'Remix F', content: '...' }, votes1: 5, votes2: 25 },
        ],
      };
      setSelectedBattle(sampleBattleDetails);
       // Reset to the first matchup when battle details are loaded
      setCurrentMatchupIndex(0);
    } catch (err) {
      setErrorBattleDetails(err);
      setSelectedBattle(null);
       setCurrentMatchupIndex(0); // Reset matchup index on error
    } finally {
      setLoadingBattleDetails(false);
    }
  };


  useEffect(() => {
    fetchBattles(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (selectedBattleId) {
      fetchBattleDetails(selectedBattleId);
    } else {
      setSelectedBattle(null); // Clear details if no battle is selected
       setCurrentMatchupIndex(0); // Reset matchup index
    }
  }, [selectedBattleId]);

  const handleBattleSelect = (battleId) => {
    setSelectedBattleId(battleId);
  };

   // Get the current matchup
  const currentMatchup = selectedBattle?.matchups[currentMatchupIndex];

  // Placeholder functions for voting and reactions
  const handleVote = (remixId) => {
    console.log(`Voting for remix: ${remixId} in battle: ${selectedBattleId}, matchup: ${currentMatchup.id}`);
    // TODO: Implement actual API call to /api/battles/vote

     // Simulate vote update (for demonstration)
     if (selectedBattle && currentMatchup) {
        const updatedBattle = { ...selectedBattle };
        const matchupToUpdate = updatedBattle.matchups.find(m => m.id === currentMatchup.id);
        if (matchupToUpdate) {
           if (matchupToUpdate.remix1.id === remixId) {
             matchupToUpdate.votes1 += 1;
           } else if (matchupToUpdate.remix2.id === remixId) {
             matchupToUpdate.votes2 += 1;
           }
           setSelectedBattle(updatedBattle); // Update state to re-render with new votes
        }
     }

    if (currentMatchupIndex < selectedBattle.matchups.length - 1) {
      setCurrentMatchupIndex(currentMatchupIndex + 1);
    } else {
      console.log("End of matchups for this battle.");
      // TODO: Handle end of battle or show results
    }
  };

  const handleReaction = (emoji) => {
     console.log(`Reacting with ${emoji} to matchup: ${currentMatchup.id} in battle: ${selectedBattleId}`);
     // TODO: Implement actual API call to /api/battles/{battleId}/react

      // Simulate adding reaction (for demonstration)
      if (selectedBattle && currentMatchup) {
         const updatedBattle = { ...selectedBattle };
         const matchupToUpdate = updatedBattle.matchups.find(m => m.id === currentMatchup.id);
         if (matchupToUpdate) {
            // Add reaction, limit to max 3 per user (basic simulation)
            if (!matchupToUpdate.reactions.some(r => r.emoji === emoji /* && r.userId === currentUser.id */)) { // Basic check
                 matchupToUpdate.reactions.push({ emoji: emoji /* , userId: currentUser.id */ });
            }
            setSelectedBattle(updatedBattle); // Update state to re-render with new reactions
         }
      }
  };


  return (
    <div>
      {/* Tab navigation */}
      <div>
        <button onClick={() => setActiveTab('highlights')}>Highlights</button>
        <button onClick={() => setActiveTab('upcoming')}>Upcoming</button>
        <button onClick={() => setActiveTab('voting')}>Vote Zone</button>
        <button onClick={() => setActiveTab('mine')}>Mine</button>
        <button onClick={() => setActiveTab('history')}>History</button>
      </div>

      {/* Content section based on active tab */}
      <div>
        {/* Display selected battle details or vote zone */}
        {selectedBattleId && (
          <div>
            <button onClick={() => setSelectedBattleId(null)}>Back to Battles List</button>
            {loadingBattleDetails && <p>Loading battle details...</p>}
            {errorBattleDetails && <p>Error loading battle details: {errorBattleDetails.message}</p>}
            {selectedBattle && (
              <>
                <h2>{selectedBattle.name}</h2>
                <p>{selectedBattle.description}</p>

                {/* Render Vote Zone if activeTab is 'voting' */}
                {activeTab === 'voting' && currentMatchup && (
                  <div>
                    <h3>Vote Zone</h3>
                    <p>Matchup {currentMatchupIndex + 1} of {selectedBattle.matchups.length}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                       {/* Integrate RemixCard components */}
                       {/* Assuming RemixCard accepts a 'remix' prop */}
                       <RemixCard remix={currentMatchup.remix1} />
                       <RemixCard remix={currentMatchup.remix2} />
                    </div>
                    {/* Vote Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                        <button onClick={() => handleVote(currentMatchup.remix1.id)}>Vote for {currentMatchup.remix1.name}</button>
                        <button onClick={() => handleVote(currentMatchup.remix2.id)}>Vote for {currentMatchup.remix2.name}</button>
                    </div>
                     {/* Placeholder for Reaction Strip and Progress Bar */}
                     <div style={{ marginTop: '20px', textAlign: 'center' }}>
                       <p>Reaction Strip Placeholder</p>
                       <button onClick={() => handleReaction('👍')}>👍</button>
                       <button onClick={() => handleReaction('❤️')}>❤️</button>
                       <button onClick={() => handleReaction('😂')}>😂</button>
                       <p>Progress Bar Placeholder</p> {/* TODO: Implement actual progress bar */}
                       {/* TODO: Implement progress bar component */}
                       <div style={{ width: '80%', margin: '10px auto', border: '1px solid #ccc', height: '10px' }}>
                           {/* Basic representation of progress */}
                            <div style={{
                                width: `${((currentMatchupIndex + 1) / selectedBattle.matchups.length) * 100}%`,
                                backgroundColor: 'green',
                                height: '100%'
                             }}>
                            </div>
                       </div>
                     </div>
                  </div>
                )}

                {/* Render other battle details if activeTab is not 'voting' */}
                {activeTab !== 'voting' && (
                  <div>
                    <h3>Battle Details</h3>
                    {/* Display theme */}
                    {selectedBattle.theme && (
                      <p>Theme: {selectedBattle.theme.name}</p>
                    )}

                    {/* Display prizes */}
                    {selectedBattle.prizes && selectedBattle.prizes.length > 0 && (
                      <div>
                        <h4>Prizes:</h4>
                        <ul>
                          {selectedBattle.prizes.map(prize => (
                            <li key={prize.id}>
                              {prize.name}
                              {/* You might want to display the icon here */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Display sponsors */}
                    {selectedBattle.sponsors && selectedBattle.sponsors.length > 0 && (
                      <div>
                        <h4>Sponsors:</h4>
                        <ul>
                          {selectedBattle.sponsors.map(sponsor => (
                            <li key={sponsor.id}>{sponsor.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <h4>Matchups:</h4>
                    <ul>
                      {selectedBattle.matchups.map(matchup => (
                        <li key={matchup.id}>
                          {matchup.remix1.name} vs {matchup.remix2.name} ({matchup.votes1} - {matchup.votes2})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Placeholder content for other tabs when no battle is selected */}
        {!selectedBattleId && (
          <>
            {loadingBattles && <p>Loading battles...</p>}
            {errorBattles && <p>Error loading battles: {errorBattles.message}</p>}
            {!loadingBattles && !errorBattles && battles.length === 0 && <p>No battles found for this tab.</p>}

            {/* Display battles based on active tab */}
            {battles.length > 0 && (
              <ul>
                {battles.map(battle => (
                  <div key={battle.id} onClick={() => handleBattleSelect(battle.id)} style={{ cursor: 'pointer' }}>
                    {activeTab === 'highlights' && (
                       <HighlightBattleCard battle={battle} />
                    )}
                    {activeTab === 'upcoming' && (
                       <UpcomingBattleCard battle={battle} />
                    )}
                    {activeTab === 'voting' && (
                       // Keep the simple display for voting list
                       <li>🗳️ {battle.name} (Vote Now!)</li>
                    )}
                    {activeTab === 'mine' && (
                       <MineBattleCard battle={battle} />
                    )}
                    {activeTab === 'history' && (
                       <HistoryBattleCard battle={battle} />
                    )}
                  </div>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BracketArena;
