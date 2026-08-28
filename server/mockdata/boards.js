module.exports = [
  {
    _id: '64f2a3b4c5d6e7f8a9b0c1d2',
    name: 'Project Alpha',
    ownerId: '64f1a2b3c4d5e6f7a8b9c0d1',
    members: [
      { userId: '64f1a2b3c4d5e6f7a8b9c0d1', role: 'owner' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d2', role: 'editor' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d3', role: 'viewer' }
    ],
    columns: [
      { _id: '64f3a4b5c6d7e8f9a0b1c2d3', title: 'To Do', position: 0 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2d4', title: 'In Progress', position: 1 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2d5', title: 'Review', position: 2 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2d6', title: 'Done', position: 3 }
    ],
    createdAt: new Date('2026-06-01T09:00:00Z'),
    updatedAt: new Date('2026-08-25T14:30:00Z')
  },
  {
    _id: '64f2a3b4c5d6e7f8a9b0c1d3',
    name: 'Project Beta',
    ownerId: '64f1a2b3c4d5e6f7a8b9c0d2',
    members: [
      { userId: '64f1a2b3c4d5e6f7a8b9c0d2', role: 'owner' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d4', role: 'editor' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d5', role: 'editor' }
    ],
    columns: [
      { _id: '64f3a4b5c6d7e8f9a0b1c2d7', title: 'Backlog', position: 0 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2d8', title: 'In Progress', position: 1 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2d9', title: 'Done', position: 2 }
    ],
    createdAt: new Date('2026-07-10T10:00:00Z'),
    updatedAt: new Date('2026-08-20T16:00:00Z')
  },
  {
    _id: '64f2a3b4c5d6e7f8a9b0c1d4',
    name: 'Team Planning',
    ownerId: '64f1a2b3c4d5e6f7a8b9c0d1',
    members: [
      { userId: '64f1a2b3c4d5e6f7a8b9c0d1', role: 'owner' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d2', role: 'editor' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d3', role: 'editor' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d4', role: 'viewer' },
      { userId: '64f1a2b3c4d5e6f7a8b9c0d5', role: 'viewer' }
    ],
    columns: [
      { _id: '64f3a4b5c6d7e8f9a0b1c2da', title: 'Ideas', position: 0 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2db', title: 'Planned', position: 1 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2dc', title: 'In Progress', position: 2 },
      { _id: '64f3a4b5c6d7e8f9a0b1c2dd', title: 'Completed', position: 3 }
    ],
    createdAt: new Date('2026-08-01T08:00:00Z'),
    updatedAt: new Date('2026-08-27T12:00:00Z')
  }
];
