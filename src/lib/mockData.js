export const mockBills = [
  {
    id: 'bill-001',
    title: 'An Act to Promote Sustainable Urban Farming',
    sponsor: 'Rep. Anya Sharma',
    date: '2023-10-26',
    topic: 'Environment',
    status: 'Pending',
    tags: ['Climate', 'Agriculture', 'Community'],
    text: 'This act establishes grant programs and provides tax incentives for urban farming initiatives in metropolitan areas...',
    impact: 'High'
  },
  {
    id: 'bill-002',
    title: 'Healthcare Accessibility Expansion Act',
    sponsor: 'Sen. Ben Carter',
    date: '2023-11-15',
    topic: 'Healthcare',
    status: 'Passed',
    tags: ['Healthcare', 'Social Welfare'],
    text: 'To expand access to affordable healthcare services, this act increases funding for community health centers and subsidies for low-income individuals...',
    impact: 'Very High'
  },
  {
    id: 'bill-003',
    title: 'Student Loan Forgiveness Program',
    sponsor: 'Rep. Olivia Chen',
    date: '2023-09-01',
    topic: 'Education',
    status: 'Failed',
    tags: ['Education', 'Economy'],
    text: 'A program to forgive federal student loans for eligible graduates working in public service fields for at least 5 years...',
    impact: 'Medium'
  },
];

export const mockUsers = [
  {
    id: 'user-001',
    displayName: 'CivicChampion',
    avatar: '/avatars/champ.png',
    xp: 1250,
    level: 12,
    totalScore: 500,
    wins: 10,
    streakDays: 5,
    badges: ['badge-winner', 'badge-participant'],
    bio: 'Passionate about making a difference!',
    coverImage: '/covers/cover1.jpg'
  },
  {
    id: 'user-002',
    displayName: 'RemixMaster',
    avatar: '/avatars/remix.png',
    xp: 800,
    level: 8,
    totalScore: 350,
    wins: 7,
    streakDays: 3,
    badges: ['badge-remixer'],
    bio: 'Love reshaping policy.',
    coverImage: '/covers/cover2.jpg'
  },
  {
    id: 'user-003',
    displayName: 'BracketBuster',
    avatar: '/avatars/bracket.png',
    xp: 1500,
    level: 15,
    totalScore: 600,
    wins: 15,
    streakDays: 7,
    badges: ['badge-winner', 'badge-streak'],
    bio: 'Here to dominate the arena.',
    coverImage: '/covers/cover3.jpg'
  },
];

export const mockSquads = [
  {
    id: 'squad-001',
    name: 'Policy Pioneers',
    icon: '/squads/pioneers.png',
    memberCount: 15,
    inviteLink: 'civicmix.app/squad/policy-pioneers',
    members: ['user-001', 'user-002'], // partial list for example
    feed: [
      { type: 'remix', userId: 'user-001', remixId: 'remix-abc' },
      { type: 'bracket', bracketId: 'bracket-xyz' }
    ]
  },
  {
    id: 'squad-002',
    name: 'Legislative Legends',
    icon: '/squads/legends.png',
    memberCount: 10,
    inviteLink: 'civicmix.app/squad/legislative-legends',
    members: ['user-003'],
    feed: []
  },
];

export const mockBrackets = [
  {
    id: 'bracket-001',
    title: 'Climate Action Showdown',
    themeTag: 'Climate',
    countdownEnd: '2023-12-01T10:00:00Z',
    matches: [
      { id: 'match-001', remix1: 'remix-a', remix2: 'remix-b', votes1: 50, votes2: 60, winner: null },
      { id: 'match-002', remix1: 'remix-c', remix2: 'remix-d', votes1: 75, votes2: 40, winner: 'remix-c' },
    ]
  }
];

export const mockRemixes = [
    {
        id: 'remix-a',
        title: 'Greener Cities Act Remix',
        originalBillId: 'bill-001',
        authorId: 'user-001',
        icon: '/remix-icons/leaf.png',
        upvotes: 25,
        downvotes: 5,
        sections: [ /* ... remix content details ... */ ]
    },
     {
        id: 'remix-b',
        title: 'Urban Farm Boost',
        originalBillId: 'bill-001',
        authorId: 'user-002',
        icon: '/remix-icons/tractor.png',
        upvotes: 30,
        downvotes: 3,
        sections: [ /* ... remix content details ... */ ]
    },
     {
        id: 'remix-c',
        title: 'Universal Healthcare Plus',
        originalBillId: 'bill-002',
        authorId: 'user-003',
        icon: '/remix-icons/heart.png',
        upvotes: 50,
        downvotes: 10,
        sections: [ /* ... remix content details ... */ ]
    },
     {
        id: 'remix-d',
        title: 'Accessible Clinics',
        originalBillId: 'bill-002',
        authorId: 'user-001',
        icon: '/remix-icons/clinic.png',
        upvotes: 20,
        downvotes: 2,
        sections: [ /* ... remix content details ... */ ]
    },
];

export const mockBadges = [
    { id: 'badge-winner', name: 'Bracket Champion', icon: '/badges/crown.png', description: 'Won a bracket tournament.' },
    { id: 'badge-participant', name: 'Active Voter', icon: '/badges/vote.png', description: 'Participated in 10+ bracket rounds.' },
    { id: 'badge-remixer', name: 'Creative Legislator', icon: '/badges/quill.png', description: 'Created 5+ public remixes.' },
     { id: 'badge-streak', name: 'Voting Streak', icon: '/badges/fire.png', description: 'Voted for 3+ consecutive days.' },
];