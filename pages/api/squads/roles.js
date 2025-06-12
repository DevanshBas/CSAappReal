// pages/api/squads/roles.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return a static array of sample squad role objects with permissions
    const sampleRoles = [
      {
        id: 'leader',
        name: 'Leader',
        permissions: [
          'can_invite_members',
          'can_remove_members',
          'can_create_battles',
          'can_manage_settings',
        ],
      },
      {
        id: 'strategist',
        name: 'Strategist',
        permissions: [
          'can_create_battles',
          'can_suggest_remixes',
        ],
      },
      {
        id: 'member',
        name: 'Member',
        permissions: [
          'can_view_feed',
          'can_react_to_posts',
        ],
      },
    ];

    res.status(200).json(sampleRoles);
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}