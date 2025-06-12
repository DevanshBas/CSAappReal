import React from 'react';

const BillDetailView = ({ bill, onBackClick }) => {
  if (!bill) {
    return <div className="p-4">Select a bill to see details.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={onBackClick}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Back to Bill Explorer
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
        {/* Left Column: Bill Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{bill.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Sponsor:</strong> {bill.sponsor}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Topic:</strong> {bill.topic}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Status:</strong> {bill.status}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Date:</strong> {bill.date}</p>
          {bill.impact && (
            <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Impact:</strong> {bill.impact}</p>
          )}

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Full Text</h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{bill.fullText}</p>
          </div>
        </div>

        {/* Right Column: AI Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Summary</h3>
          <p className="text-gray-700 dark:text-gray-300">
            [Placeholder for AI-generated summary of the bill. This would typically provide a concise overview
            of the bill's purpose, key provisions, and potential implications.]
            <br /><br />
            The AI analysis would break down complex legal language into easily understandable points,
            highlighting the main arguments for and against the bill, and its potential effects on different
            groups or sectors.
          </p>
          {/* You would integrate your AI summary component or logic here */}
          {/* <AISummaryComponent billId={bill.id} /> */}
        </div>
      </div>
    </div>
  );
};

export default BillDetailView;