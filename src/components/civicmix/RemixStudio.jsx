import React, { useState, useEffect } from 'react';
import BillSelector from './BillSelector';
import RemixBoard from './RemixBoard';
import ImpactPanel from './ImpactPanel';
import { Button } from '../ui/Button';
import { Undo2, Redo2, Save, Send } from 'lucide-react';
import BillCard from './BillCard'; // Assuming you'll use BillCard for BillSelector

const RemixStudio = () => {
  const [currentBill, setCurrentBill] = useState(null);
  const [remixData, setRemixData] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [remixSchema, setRemixSchema] = useState(null);
  const [templates, setRemixTemplates] = useState([]);


  useEffect(() => {
    // Load saved draft from localStorage or IndexedDB
    const savedRemix = localStorage.getItem('civicmix_remix_draft');
    if (savedRemix && JSON.parse(savedRemix).length > 0) { // Check if saved data is not empty
      setRemixData(JSON.parse(savedRemix)); 
      setHistory([JSON.parse(savedRemix)]);
    }
  }, []);

  useEffect(() => {
    const fetchRemixSchema = async () => {
      // Simulate fetching remix schema from /api/remix/schema
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const schema = {
        cardCategories: [
          { id: 'funding', name: 'Funding', description: 'Financial aspects of the bill' },
          { id: 'agencies', name: 'Agencies', description: 'Government agencies involved' },
          { id: 'timelines', name: 'Timelines', description: 'Key dates and schedules' },
          { id: 'textBlocks', name: 'Text Blocks', description: 'Specific sections of text' },
        ],
      }; // Replace with actual API call
      setRemixSchema(schema);
    };

    const fetchTemplates = async () => {
      // Simulate fetching templates from /api/remix/templates
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const templates = [{ id: 'default', name: 'Default Template', description: 'A basic starting point' }]; // Replace with actual API call
      setRemixTemplates(templates);
    };

    fetchRemixSchema();
    fetchTemplates();
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Placeholder handler functions for now
  const handleBillSelect = (bill) => {
    setCurrentBill(bill);
    // Initialize remixData based on the selected bill - Placeholder
    setRemixData([]); // Or appropriate initial state
    setHistory([[]]);
    setHistoryIndex(0);
  };

  const handleRemixChange = (newRemixData) => {
    setRemixData(newRemixData);
    // Placeholder for history management
    // const newHistory = history.slice(0, historyIndex + 1);
    // setHistory([...newHistory, newRemixData]);
    // setHistoryIndex(historyIndex + 1);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Logic to save remix - Placeholder
    console.log("Saving remix:", remixData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
 setIsSaving(false);
    alert("Remix saved!"); // Placeholder feedback
  };

  const handleSubmit = async () => {
    if (!remixData || remixData.length === 0) {
      alert("Remix is empty!"); // Placeholder validation
      return;
    }
    setIsSubmitting(true);
    // Logic to submit remix - Placeholder
    console.log("Submitting remix:", remixData);
 await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    alert("Remix submitted!"); // Placeholder feedback
    // localStorage.removeItem('civicmix_remix_draft'); // Clear draft after submission - Placeholder
  };

 const handleUndo = () => {
    // Placeholder for undo logic
    console.log("Undo action triggered.");
  };

  const handleRedo = () => {
    // Placeholder for redo logic
    if (historyIndex < history.length - 1) {
      const nextRemixData = history[historyIndex + 1];
 setRemixData(nextRemixData);
 setHistoryIndex(historyIndex + 1);
      console.log("Redoing action. New history index:", historyIndex + 1);
    } else {
      console.log("Cannot redo further.");
    }
  };

  if (!remixSchema || templates.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading Remix Studio configuration...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remix Studio</h1>

      {!currentBill && (
        <div className="mb-4">
          <BillSelector onSelectBill={handleBillSelect} />
        </div>
      )}

      {currentBill && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{currentBill.title} - Remixing</h2>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                aria-label="Undo"
              >
                <Undo2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                aria-label="Redo"
              >
                <Redo2 className="h-5 w-5" />
              </Button>
               <Button
                className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-xl px-6 py-3 hover:from-blue-600 hover:to-green-500 active:scale-95 transition"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
               <Button
                className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-xl px-6 py-3 hover:from-blue-600 hover:to-green-500 active:scale-95 transition"
                onClick={handleSubmit}
                disabled={isSubmitting || !remixData || remixData.length === 0}
              >
                 <Send className="mr-2 h-4 w-4" /> {isSubmitting ? 'Submitting...' : 'Submit Remix'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RemixBoard
                originalBill={currentBill}
                remixData={remixData}
                onRemixChange={handleRemixChange}
              />
            </div>
            <div>
              <ImpactPanel remixData={remixData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RemixStudio;