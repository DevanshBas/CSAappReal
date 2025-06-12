import React, { useState, useEffect } from 'react';

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

  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0);

  const fetchBattles = async (tab) => {
    setLoadingBattles(true);
    setErrorBattles(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let sampleBattles = [];
      switch (tab) {
        case 'highlights':
          sampleBattles = [
            { id: 'h1', name: 'Featured Climate Battle', status: 'voting', description: 'Vote on the best climate solutions!' },
            { id: 'h2', name: 'Popular Tech Remixes', status: 'voting', description: 'See the top tech ideas remixed.' },
          ];
          break;
        case 'upcoming':
          sampleBattles = [
            { id: 'u1', name: "Next Week's Education Showdown", status: 'upcoming', startTime: '2023-11-15T10:00:00Z', description: 'Get ready for the education battle!' },
            { id: 'u2', name: 'Healthcare Policy Bracket', status: 'upcoming', startTime: '2023-11-20T14:00:00Z', description: 'Policy ideas go head-to-head.' },
          ];
          break;
        case 'voting':
          sampleBattles = [
            { id: 'v1', name: 'Vote Now: Budget Remixes', status: 'voting', description: 'Help decide the best budget approach.' },
            { id: 'v2', name: 'Community Choice Battle', status: 'voting', description: 'Your vote matters in this community battle.' },
          ];
          break;
        case 'mine':
          sampleBattles = [
            { id: 'm1', name: 'My Latest Entry Battle', status: 'upcoming', description: 'Your entry is in this battle.' },
            { id: 'm2', name: 'Previous Win Showcase', status: 'history', winnerRemix: { id: 'myRemix1', name: 'My Winning Remix' }, description: 'You won this battle!' },
          ];
          break;
        case 'history':
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

  const fetchBattleDetails = async (battleId) => {
    setLoadingBattleDetails(true);
    setErrorBattleDetails(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
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
      setCurrentMatchupIndex(0);
    } catch (err) {
      setErrorBattleDetails(err);
      setSelectedBattle(null);
      setCurrentMatchupIndex(0);
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
      setSelectedBattle(null);
      setCurrentMatchupIndex(0);
    }
  }, [selectedBattleId]);

  const handleBattleSelect = (battleId) => {
    setSelectedBattleId(battleId);
  };

  const currentMatchup = selectedBattle?.matchups[currentMatchupIndex];

  const handleVote = (remixId) => {
    console.log(`Voting for remix: ${remixId} in battle: ${selectedBattleId}, matchup: ${currentMatchup.id}`);

    if (selectedBattle && currentMatchup) {
      const updatedBattle = { ...selectedBattle };
      const matchupToUpdate = updatedBattle.matchups.find((m) => m.id === currentMatchup.id);
      if (matchupToUpdate) {
        if (matchupToUpdate.remix1.id === remixId) matchupToUpdate.votes1 += 1;
        else if (matchupToUpdate.remix2.id === remixId) matchupToUpdate.votes2 += 1;
        setSelectedBattle(updatedBattle);
      }
    }

    if (currentMatchupIndex < selectedBattle.matchups.length - 1) {
      setCurrentMatchupIndex(currentMatchupIndex + 1);
    } else {
      console.log('End of matchups for this battle.');
    }
  };

  const handleReaction = (emoji) => {
    console.log(`Reacting with ${emoji} to matchup: ${currentMatchup.id} in battle: ${selectedBattleId}`);

    if (selectedBattle && currentMatchup) {
      const updatedBattle = { ...selectedBattle };
      const matchupToUpdate = updatedBattle.matchups.find((m) => m.id === currentMatchup.id);
      if (matchupToUpdate) {
        if (!matchupToUpdate.reactions.some((r) => r.emoji === emoji)) {
          matchupToUpdate.reactions.push({ emoji });
        }
        setSelectedBattle(updatedBattle);
      }
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div>
        <button onClick={() => setActiveTab('highlights')}>Highlights</button>
        <button onClick={() => setActiveTab('upcoming')}>Upcoming</button>
        <button onClick={() => setActiveTab('voting')}>Vote Zone</button>
        <button onClick={() => setActiveTab('mine')}>Mine</button>
        <button onClick={() => setActiveTab('history')}>History</button>
      </div>

      <div>
        {selectedBattleId ? (
          <div>
            <button onClick={() => setSelectedBattleId(null)}>Back to Battles List</button>
            {loadingBattleDetails && <p>Loading battle details...</p>}
            {errorBattleDetails && <p>Error loading battle details: {errorBattleDetails.message}</p>}
            {selectedBattle && (
              <>
                <h2>{selectedBattle.name}</h2>
                <p>{selectedBattle.description}</p>

                {activeTab === 'voting' && currentMatchup && (
                  <div>
                    <h3>Vote Zone</h3>
                    <p>
                      Matchup {currentMatchupIndex + 1} of {selectedBattle.matchups.length}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6">
                      <RemixCard remix={currentMatchup.remix1} />
                      <RemixCard remix={currentMatchup.remix2} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
                      <button onClick={() => handleVote(currentMatchup.remix1.id)}>Vote for {currentMatchup.remix1.name}</button>
                      <button onClick={() => handleVote(currentMatchup.remix2.id)}>Vote for {currentMatchup.remix2.name}</button>
                    </div>
                    <div style={{ marginTop: 20, textAlign: 'center' }}>
                      <p>Reaction Strip Placeholder</p>
                      <button onClick={() => handleReaction('👍')}>👍</button>
                      <button onClick={() => handleReaction('❤️')}>❤️</button>
                      <button onClick={() => handleReaction('😂')}>😂</button>
                      <p>Progress Bar Placeholder</p>
                      <div style={{ width: '80%', margin: '10px auto', border: '1px solid #ccc', height: 10 }}>
                        <div
                          style={{
                            width: `${((currentMatchupIndex + 1) / selectedBattle.matchups.length) * 100}%`,
                            backgroundColor: 'green',
                            height: '100%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab !== 'voting' && (
                  <div>
                    <h3>Battle Details</h3>
                    {selectedBattle.theme && <p>Theme: {selectedBattle.theme.name}</p>}
                    {selectedBattle.prizes?.length > 0 && (
                      <div>
                        <h4>Prizes:</h4>
                        <ul>
                          {selectedBattle.prizes.map((prize) => (
                            <li key={prize.id}>{prize.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedBattle.sponsors?.length > 0 && (
                      <div>
                        <h4>Sponsors:</h4>
                        <ul>
                          {selectedBattle.sponsors.map((sponsor) => (
                            <li key={sponsor.id}>{sponsor.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <h4>Matchups:</h4>
                    <ul>
                      {selectedBattle.matchups.map((matchup) => (
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
        ) : (
          <>
            {loadingBattles && <p>Loading battles...</p>}
            {errorBattles && <p>Error loading battles: {errorBattles.message}</p>}
            {!loadingBattles && !errorBattles && battles.length === 0 && <p>No battles found for this tab.</p>}

            {battles.length > 0 && (
              <ul>
                {battles.map((battle) => (
                  <div key={battle.id} onClick={() => handleBattleSelect(battle.id)} style={{ cursor: 'pointer' }}>
                    {activeTab === 'highlights' && <HighlightBattleCard battle={battle} />}
                    {activeTab === 'upcoming' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
                        <UpcomingBattleCard battle={battle} />
                      </div>
                    )}
                    {activeTab === 'voting' && <li>🗳️ {battle.name} (Vote Now!)</li>}
                    {activeTab === 'mine' && <MineBattleCard battle={battle} />}
                    {activeTab === 'history' && <HistoryBattleCard battle={battle} />}
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
