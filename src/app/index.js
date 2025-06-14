// This file (src/app/[tab]/page.js) will handle routing for different tabs.
// Next.js App Router uses folder structure for routing.
// The [tab] segment captures the tab name from the URL.

import React from 'react';
import BillExplorer from '@/components/civicmix/BillExplorer';
import RemixStudio from '@/components/civicmix/RemixStudio';
import BracketArena from '@/components/civicmix/BracketArena';
import LeaderHub from '@/components/civicmix/LeaderHub';
import SquadsPage from '@/components/civicmix/SquadsPage';
import UserProfile from '@/components/civicmix/UserProfile';
import SettingsPanel from '@/components/civicmix/SettingsPanel';

const TabPage = ({ params }) => {
  const { tab } = params;

  // Render different components based on the 'tab' parameter
  switch (tab) {
    case 'bills':
      return <BillExplorer />;
    case 'remix':
      return <RemixStudio />;
    case 'battles':
      return <BracketArena />;
    case 'leaderboard':
      return <LeaderHub />;
    case 'squads':
      return <SquadsPage />;
    case 'profile':
      return <UserProfile />;
    case 'settings':
      return <SettingsPanel />; // Assuming settings is also a top-level tab
    default:
      // You might want to render a 404 page or a default tab here
      return <div>Page not found</div>;
  }
};

export default TabPage;