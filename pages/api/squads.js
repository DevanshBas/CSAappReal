// pages/api/squads.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Simulate fetching a list of squads
    const sampleSquads = [
      { id: 'squad1', name: 'Code Ninjas', memberCount: 15, joinPolicy: { type: 'open' } },
      { id: 'squad2', name: 'Policy Wonks', memberCount: 8, joinPolicy: { type: 'approvalRequired' } },
      { id: 'squad3', name: 'Data Mavericks', memberCount: 20, joinPolicy: { type: 'inviteOnly' } },
    ];
    res.status(200).json(sampleSquads);
  } else if (req.method === 'POST') {
    // Simulate creating a new squad
    const newSquadData = req.body;
    console.log('Received data for new squad:', newSquadData);
    res.status(201).json({ message: 'Squad created successfully!', squadId: 'new_squad_123' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}