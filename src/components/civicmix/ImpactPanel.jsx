import React from 'react';

const ImpactPanel = () => {
  return (
    <div className="impact-panel">
      <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placeholder for AI Prediction Graph 1 */}
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Predicted Economic Impact</h4>
          {/* Placeholder for a graph or chart */}
          <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
            Graph Placeholder
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Plain-English callout about the economic impact.
          </p>
        </div>

        {/* Placeholder for AI Prediction Graph 2 */}
        <div className="p-4 border rounded-md">
          <h4 className="font-medium mb-2">Predicted Social Impact</h4>
          {/* Placeholder for a graph or chart */}
          <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">
            Graph Placeholder
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Plain-English callout about the social impact.
          </p>
        </div>
      </div>

      {/* Placeholder for additional plain-English callouts */}
      <div className="mt-4 p-4 border rounded-md">
        <h4 className="font-medium mb-2">Key Observations</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>This change is predicted to have a positive effect on X.</li>
          <li>Consider adjusting Y for better outcome on Z.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImpactPanel;