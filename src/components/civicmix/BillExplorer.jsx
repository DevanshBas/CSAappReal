// src/components/civicmix/BillExplorer.jsx
// src/components/civicmix/BillExplorer.jsx
import React, { useState, useEffect } from 'react';
import Filters from './Filters';

// src/components/civicmix/BillExplorer.jsx
const BillExplorer = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterOptions, setFilterOptions] = useState({
    topics: [],
    sponsors: [],
    statuses: [],
    tags: [],
  });
  const [facetCounts, setFacetCounts] = useState({
    topics: [],
    sponsors: [],
    statuses: [],
    tags: [],
  });

  // Simulate fetching filter options
  const fetchFilterOptions = async () => {
    try {
      const fetchedFilterOptions = await new Promise(resolve =>
        setTimeout(() => resolve({
          topics: ['Education', 'Healthcare', 'Environment'],
          sponsors: ['John Doe', 'Jane Smith'],
          statuses: ['Introduced', 'Passed House', 'Enacted'],
          tags: ['Climate', 'Tech'],
        }), 300) // Simulate a quicker fetch for options
      );
      setFilterOptions(fetchedFilterOptions);
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    }
  };

  // Simulate fetching facet counts based on current filters
  const fetchFacetCounts = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // In a real application, you would send the current filters
      // (searchTerm, selectedTopic, etc.) to the /api/bills/facets endpoint
      // and the backend would return the counts based on those filters.
      // For this simulation, we'll return some sample counts.
      const simulatedFacetCounts = {
        topics: [{ id: 'Education', count: 15 }, { id: 'Healthcare', count: 10 }, { id: 'Environment', count: 8 }],
        sponsors: [{ id: 'John Doe', count: 12 }, { id: 'Jane Smith', count: 11 }],
        statuses: [{ id: 'Introduced', count: 20 }, { id: 'Passed House', count: 3 }, { id: 'Enacted', count: 2 }],
        tags: [{ id: 'Climate', count: 5 }, { id: 'Tech', count: 7 }],
      };
      setFacetCounts(simulatedFacetCounts);
    } catch (err) {
      console.error("Failed to fetch facet counts:", err);
    }
  };

  // Simulate fetching and filtering data
  const fetchBills = async () => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real application, you would send the current filters, search term,
    // sorting options, and pagination parameters to the /api/bills endpoint
    // and the backend would return the filtered, sorted, and paginated bills.
    // For this simulation, we'll just return some sample bills.
    const sampleBills = [
      { id: '1', title: 'Sample Bill 1 (Education)', sponsor: 'John Doe', date: '2023-10-26', topic: 'Education', status: 'Introduced', tags: ['Tech'] },
      { id: '2', title: 'Sample Bill 2 (Healthcare)', sponsor: 'Jane Smith', date: '2023-10-25', topic: 'Healthcare', status: 'Passed House', tags: ['Climate'] },
      { id: '3', title: 'Sample Bill 3 (Environment)', sponsor: 'John Doe', date: '2023-10-24', topic: 'Environment', status: 'Enacted', tags: ['Climate'] },
      { id: '4', title: 'Sample Bill 4 (Education)', sponsor: 'Jane Smith', date: '2023-10-23', topic: 'Education', status: 'Introduced', tags: [] },
      { id: '5', title: 'Sample Bill 5 (Healthcare)', sponsor: 'John Doe', date: '2023-10-22', topic: 'Healthcare', status: 'Introduced', tags: ['Tech'] },
    ];

    setBills(filteredBills);
    setLoading(false);
  };

  // Simulate fetching and filtering data
  useEffect(() => {
    fetchBills();
  }, [searchTerm, selectedTopic, selectedSponsor, selectedStatus, selectedTag, sortBy]); // Depend on filter and sort state

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, []); // Empty dependency array means this runs once on mount

  // Fetch facet counts when filters or search term changes
  useEffect(() => {
    fetchFacetCounts();
  }, [searchTerm, selectedTopic, selectedSponsor, selectedStatus, selectedTag]); // Depend on filter state

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    // fetchBills will be triggered by the useEffect hook
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'topic': setSelectedTopic(value); break;
      case 'sponsor': setSelectedSponsor(value); break;
      case 'status': setSelectedStatus(value); break;
      case 'tag': setSelectedTag(value); break;
      default: break;
    }
    // fetchBills and fetchFacetCounts will be triggered by useEffect hooks

    setBills(filteredBills);
    setLoading(false);
  };

  // Fetch filter options on mount
  useEffect(() => {
 fetchFilterOptions();
  }, []); // Empty dependency array means this runs once on mount

  // Fetch facet counts when filters or search term changes
  useEffect(() => {
 fetchFacetCounts();
  }, [searchTerm, selectedTopic, selectedSponsor, selectedStatus, selectedTag]); // Depend on filter state

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    // Trigger bill fetching with new search term
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'topic': setSelectedTopic(value); break;
      case 'sponsor': setSelectedSponsor(value); break;
      case 'status': setSelectedStatus(value); break;
      case 'tag': setSelectedTag(value); break;
      default: break;
    }
    // The useEffect hook will trigger fetchBills when these states change


  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
    // fetchBills will be triggered by the useEffect hook
  };

  return (<div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-4">Explore Bills</h1>
<div className="mb-4">
      <Filters
        searchTerm={searchTerm}
        selectedTopic={selectedTopic}
        selectedSponsor={selectedSponsor}
        selectedStatus={selectedStatus}
        selectedTag={selectedTag}
 filterOptions={filterOptions}
 facetCounts={facetCounts}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange} />      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <p>Loading bills...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && bills.map(bill => (
          <BillCard key={bill.id} bill={bill} />
        ))}
      </div>
    </div>
  );
};

export default BillExplorer;