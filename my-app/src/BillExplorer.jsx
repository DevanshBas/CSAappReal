import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';

const BillExplorer = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    topic: '',
    sponsor: '',
    region: '',
    fiscalImpact: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch bills from the backend
    const fetchBills = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/bills/all');
        const data = await res.json();
        setBills(data);
      } catch (err) {
        console.error('Failed to fetch bills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Filter bills based on search term and filters
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic = !filters.topic || bill.topics.includes(filters.topic);
    const matchesSponsor = !filters.sponsor || bill.sponsor === filters.sponsor;
    const matchesRegion = !filters.region || bill.region === filters.region;
    const matchesFiscal = !filters.fiscalImpact || bill.fiscalImpact === filters.fiscalImpact;

    return matchesSearch && matchesTopic && matchesSponsor && matchesRegion && matchesFiscal;
  });

  const uniqueTopics = [...new Set(bills.flatMap(b => b.topics))];
  const uniqueSponsors = [...new Set(bills.map(b => b.sponsor))];
  const uniqueRegions = [...new Set(bills.map(b => b.region))];
  const fiscalImpactOptions = ['High', 'Medium', 'Low'];

  return (
    <div className="bill-explorer">
      <div className="bill-explorer-header">
        <h1>Bill Explorer Database</h1>
        <p>Search and filter real bills to understand their context and impact</p>
      </div>

      <div className="search-filter-container">
        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search bills by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Section */}
        <div className="filters">
          <div className="filter-group">
            <label>Topic</label>
            <select 
              value={filters.topic}
              onChange={(e) => setFilters({...filters, topic: e.target.value})}
            >
              <option value="">All Topics</option>
              {uniqueTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sponsor</label>
            <select
              value={filters.sponsor}
              onChange={(e) => setFilters({...filters, sponsor: e.target.value})}
            >
              <option value="">All Sponsors</option>
              {uniqueSponsors.map(sponsor => (
                <option key={sponsor} value={sponsor}>{sponsor}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
            >
              <option value="">All Regions</option>
              {uniqueRegions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Fiscal Impact</label>
            <select
              value={filters.fiscalImpact}
              onChange={(e) => setFilters({...filters, fiscalImpact: e.target.value})}
            >
              <option value="">Any Impact</option>
              {fiscalImpactOptions.map(impact => (
                <option key={impact} value={impact}>{impact}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bills-list">
        {loading ? (
          <div className="loading">Loading bills...</div>
        ) : filteredBills.length === 0 ? (
          <div className="no-results">No bills found matching your criteria</div>
        ) : (
          filteredBills.map(bill => (
            <div key={bill.id} className="bill-card">
              <div className="bill-header">
                <h3>{bill.title}</h3>
                <div className="bill-meta">
                  <span className="sponsor">Sponsor: {bill.sponsor}</span>
                  <span className="region">Region: {bill.region}</span>
                  <span className="fiscal-impact">Fiscal Impact: {bill.fiscalImpact}</span>
                </div>
              </div>
              
              <div className="bill-content">
                <p>{bill.description}</p>
                <div className="bill-topics">
                  {bill.topics.map(topic => (
                    <span key={topic} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              {bill.isRemix && (
                <div className="view-original">
                  <a href={`/bills/${bill.originalId}`} className="btn btn-secondary">
                    <ExternalLink size={16} />
                    View Original
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillExplorer;
