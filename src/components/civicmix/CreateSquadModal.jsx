import React, { useState } from 'react';

const CreateSquadModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // Placeholder state for form inputs
  const [squadName, setSquadName] = useState(''); // State for squad name
  const [squadIcon, setSquadIcon] = useState(null); // State for squad icon file

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For simplicity, we'll just send the name for now.
    // Handling file uploads in API routes requires more complex logic
    // (e.g., using formidable or multer) and storage solutions.
    const newSquadData = {
      name: squadName,
      // icon: squadIcon // You would send the file data appropriately
    };

    try {
      const response = await fetch('/api/squads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSquadData),
      });
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error('Error creating squad:', error);
      // TODO: Handle error (show error message to user)
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '1.2em',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <h2>Create New Squad</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="squadName" style={{ display: 'block', marginBottom: '5px' }}>Squad Name:</label>
            <input
              type="text"
              id="squadName"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="squadIcon" style={{ display: 'block', marginBottom: '5px' }}>Squad Icon:</label>
            <input
              type="file"
              id="squadIcon"
              accept="image/*"
              onChange={(e) => setSquadIcon(e.target.files[0])}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Create Squad
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSquadModal;