import React, { useState } from 'react';

const RemixBoard = ({ remixSchema }) => {
  const [canvasCards, setCanvasCards] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardTypeData = e.dataTransfer.getData('cardType');
    const canvasCardId = e.dataTransfer.getData('canvasCardId');

    if (cardTypeData) {
      console.log('Dropped a new card from Original pane. Card type ID:', cardTypeData);
      // Handle dropping a new card from the original pane
      const droppedCardType = remixSchema?.cardTypes?.find(type => type.id === cardTypeData);

      if (droppedCardType) {
        // Create a new card object
        const newCard = {
          id: Date.now().toString(), // Simple unique ID
          type: droppedCardType.id,
          // Add default properties from schema if needed
        };
        setCanvasCards([...canvasCards, newCard]);
      }
    } else if (canvasCardId) {
      console.log('Dropped an existing canvas card. Card ID:', canvasCardId);
      // Handle rearranging an existing card on the canvas
      const targetElement = e.target.closest('.canvas-card');
      const targetCardId = targetElement ? targetElement.dataset.cardId : null;

      if (targetCardId) {
        // Find the dragged and target card indices
        const draggedCardIndex = canvasCards.findIndex(card => card.id === canvasCardId);
        const targetCardIndex = canvasCards.findIndex(card => card.id === targetCardId);

        if (draggedCardIndex !== -1 && targetCardIndex !== -1) {
          // Create a new array with the reordered cards
          const newCanvasCards = [...canvasCards];
          const [draggedCard] = newCanvasCards.splice(draggedCardIndex, 1);
          newCanvasCards.splice(targetCardIndex, 0, draggedCard);
          setCanvasCards(newCanvasCards);
        }
      } else {
         // Handle dropping outside of a card (e.g., at the end)
         const draggedCardIndex = canvasCards.findIndex(card => card.id === canvasCardId);
         if (draggedCardIndex !== -1) {
            const newCanvasCards = [...canvasCards];
            const [draggedCard] = newCanvasCards.splice(draggedCardIndex, 1);
            newCanvasCards.push(draggedCard); // Add to the end
            setCanvasCards(newCanvasCards);
         }
      }
    }

  };

  // Use remixSchema to understand available card types and their properties
  return (
    <div className="remix-board flex space-x-4 h-full">
      {/* Original Pane */}
      <div className="original-pane w-1/3 border border-gray-300 rounded p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Original Bill</h3>
        <p className="text-sm text-gray-500 mb-4">Drag elements to the canvas</p>
        {/* Render draggable elements based on remixSchema */}
        {remixSchema?.cardTypes?.map((cardType) => (
          <div
            key={cardType.id}
            className="original-card bg-gray-100 p-2 rounded mb-2 cursor-grab border border-gray-300"
            draggable="true"
            onDragStart={(e) => { // Use event.dataTransfer.setData to transfer the card type ID
              e.dataTransfer.setData('cardType', cardType.id);
              console.log('Dragging card type:', cardType.id);
            }}
          >
            {cardType.name || 'Unknown Card Type'}
          </div>
        ))}
      </div>

      {/* Canvas Pane */}
      <div
        className="canvas-pane w-2/3 border border-gray-300 rounded p-4 relative overflow-y-auto flex flex-col items-center" // Added flex classes for vertical stacking
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h3 className="text-lg font-semibold mb-2">Remix Canvas</h3>
        {/* Drop Zone Indicator (Optional) */}
        <div className="drop-zone-indicator absolute inset-0 border-4 border-dashed border-transparent pointer-events-none"></div>

        {/* Render cards on the canvas */}
        {canvasCards.map(card => (
          <div
            data-card-id={card.id} // Added data attribute for easier identification
            key={card.id}
            className="canvas-card bg-blue-200 p-2 rounded m-2 absolute cursor-move" // Basic styling for now
            draggable="true"
            onDragStart={(e) => {
              e.dataTransfer.setData('canvasCardId', card.id);
              console.log('Dragging canvas card ID:', card.id);
            }}
            style={{ top: 0, left: 0 }} // Basic positioning - will need to be updated
          >
 {card.type} {/* Display the card type */}
          </div>
        ))}

        {/* Trash Zone Placeholder */}
        <div className="absolute bottom-4 right-4 bg-red-500 text-white p-4 rounded-full opacity-75 hover:opacity-100 transition">
          Trash Zone
        </div>
      </div>

      {/* Trash Zone */}
      <div
        className="trash-zone w-1/6 border border-red-500 bg-red-100 rounded p-4 flex justify-center items-center"
        onDragOver={handleDragOver}
        onDrop={(e) => {
          e.preventDefault();
          const canvasCardId = e.dataTransfer.getData('canvasCardId');
          if (canvasCardId) {
            setCanvasCards(canvasCards.filter(card => card.id !== canvasCardId));
          }
        }}
      >
        <h3 className="text-lg font-semibold text-red-700">Drag here to delete</h3>
      </div>
    </div>
  );
};

export default RemixBoard;
        </div>
      </div>
    </div>
  );
};

export default RemixBoard;