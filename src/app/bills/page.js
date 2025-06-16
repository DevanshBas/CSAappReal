"use client";
import { useState, useEffect } from 'react';

// Since Firebase might not be properly configured, let's use a fallback approach
let db, collection, query, orderBy, onSnapshot;

try {
  const firestore = require('firebase/firestore');
  const firebase = require('@/lib/firebase');
  
  db = firestore.getFirestore(firebase.default || firebase);
  collection = firestore.collection;
  query = firestore.query;
  orderBy = firestore.orderBy;
  onSnapshot = firestore.onSnapshot;
} catch (error) {
  console.warn('Firebase not available, using mock data');
}

// BillExplorer Component
const BillExplorer = ({ bills }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChamber, setSelectedChamber] = useState('all');

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.sponsor?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || bill.status === selectedStatus;
    const matchesChamber = selectedChamber === 'all' || bill.chamber === selectedChamber;
    
    return matchesSearch && matchesStatus && matchesChamber;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Signed into Law':
        return 'bg-green-100 text-green-800';
      case 'Passed House':
      case 'Passed Senate':
        return 'bg-blue-100 text-blue-800';
      case 'In Committee':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Legislative Bills</h1>
        <p className="text-gray-600">Explore current and recent legislative proposals</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Bills</label>
            <input
              type="text"
              placeholder="Search by title, summary, or sponsor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="In Committee">In Committee</option>
              <option value="Passed House">Passed House</option>
              <option value="Passed Senate">Passed Senate</option>
              <option value="Signed into Law">Signed into Law</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Chamber</label>
            <select
              value={selectedChamber}
              onChange={(e) => setSelectedChamber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Chambers</option>
              <option value="House">House</option>
              <option value="Senate">Senate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredBills.length} of {bills.length} bills
        </p>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {filteredBills.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No bills found matching your criteria</p>
          </div>
        ) : (
          filteredBills.map((bill) => (
            <div key={bill.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{bill.title || 'Untitled Bill'}</h3>
                  <p className="text-sm text-gray-600 mb-2">{bill.billNumber || 'No Bill Number'} • {bill.chamber || 'Unknown Chamber'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
                  {bill.status || 'Unknown Status'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{bill.summary || 'No summary available.'}</p>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span><strong>Sponsor:</strong> {bill.sponsor || 'Unknown'}</span>
                  <span><strong>Introduced:</strong> {bill.introducedDate ? new Date(bill.introducedDate).toLocaleDateString() : 'Unknown'}</span>
                </div>
                
                {bill.tags && bill.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {bill.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Mock data for fallback
const getMockBills = () => [
  {
    id: "bill-1",
    title: "Climate Action and Innovation Act",
    summary: "Comprehensive legislation to address climate change through clean energy investments and carbon reduction targets.",
    introducedDate: "2024-03-15",
    status: "In Committee",
    sponsor: "Rep. Sarah Johnson",
    chamber: "House",
    billNumber: "H.R. 1234",
    tags: ["Environment", "Energy", "Climate"]
  },
  {
    id: "bill-2",
    title: "Digital Privacy Protection Act",
    summary: "Establishes comprehensive data privacy rights for consumers and regulates data collection by tech companies.",
    introducedDate: "2024-03-10",
    status: "Passed House",
    sponsor: "Sen. Michael Chen",
    chamber: "Senate",
    billNumber: "S. 567",
    tags: ["Privacy", "Technology", "Consumer Rights"]
  },
  {
    id: "bill-3",
    title: "Infrastructure Modernization Bill",
    summary: "Funding for updating roads, bridges, broadband networks, and public transportation systems nationwide.",
    introducedDate: "2024-03-05",
    status: "Signed into Law",
    sponsor: "Rep. David Martinez",
    chamber: "House",
    billNumber: "H.R. 890",
    tags: ["Infrastructure", "Transportation", "Technology"]
  },
  {
    id: "bill-4",
    title: "Healthcare Affordability Act",
    summary: "Measures to reduce prescription drug costs and expand access to affordable healthcare coverage.",
    introducedDate: "2024-02-28",
    status: "In Committee",
    sponsor: "Sen. Lisa Wang",
    chamber: "Senate",
    billNumber: "S. 234",
    tags: ["Healthcare", "Prescription Drugs", "Insurance"]
  }
];

// Main BillsPage Component
const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db || !collection || !query || !orderBy || !onSnapshot) {
      // Use mock data if Firebase is not available
      console.log('Using mock data - Firebase not configured');
      setTimeout(() => {
        setBills(getMockBills());
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const q = query(collection(db, "bills"), orderBy("introducedDate", "desc"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const billsData = [];
        snapshot.forEach((doc) => {
          billsData.push({ id: doc.id, ...doc.data() });
        });
        setBills(billsData);
        setLoading(false);
      }, (err) => {
        console.error("Error fetching bills:", err);
        // Fallback to mock data on error
        setBills(getMockBills());
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up Firebase listener:", err);
      // Fallback to mock data on error
      setBills(getMockBills());
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <BillExplorer bills={bills} />
    </div>
  );
};

export default BillsPage;
