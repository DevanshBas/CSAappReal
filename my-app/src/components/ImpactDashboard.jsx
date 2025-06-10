import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Scale, Clock } from 'lucide-react';

const ImpactDashboard = ({ impact, remixBill }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [timeline, setTimeline] = useState({
    costs: [],
    benefits: []
  });

  useEffect(() => {
    // Generate 5-year timeline data based on impact
    if (remixBill.length === 0) return;

    const yearlyCost = impact.budget * 0.2; // Spread budget over 5 years
    const yearlyJobs = Math.round(impact.jobs * 0.3); // Jobs created gradually
    const costs = [];
    const benefits = [];

    for (let year = 1; year <= 5; year++) {
      costs.push({
        year: 2025 + year - 1,
        value: yearlyCost,
        households: Math.round(2000000 * (year / 5)) // Affected households increases over time
      });

      benefits.push({
        year: 2025 + year - 1,
        jobs: Math.round(yearlyJobs * year),
        savings: yearlyCost * 0.15 * year, // Accumulated savings
        beneficiaries: Math.round(100000 * year) // People benefiting increases each year
      });
    }

    setTimeline({ costs, benefits });
  }, [impact, remixBill]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 1000000);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };

  return (
    <div className="impact-dashboard">
      <h2 className="impact-title">Impact Simulation</h2>
      
      {/* Summary Cards */}
      <div className="impact-summary">
        <div className="impact-card">
          <div className="impact-icon budget">
            <DollarSign size={24} />
          </div>
          <div className="impact-stat">
            <div className="value">{formatCurrency(impact.budget)}</div>
            <div className="label">Total Budget</div>
          </div>
          <div className="impact-detail">
            <div className="cost-per-household">
              ≈ ${Math.round(impact.budget * 1000000 / 2000000)} per affected household
            </div>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-icon jobs">
            <Users size={24} />
          </div>
          <div className="impact-stat">
            <div className="value">+{formatNumber(impact.jobs)}</div>
            <div className="label">Jobs Created</div>
          </div>
          <div className="impact-detail">
            <div className="timeline">Over 5 years</div>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-icon score">
            <Scale size={24} />
          </div>
          <div className="impact-stat">
            <div className="value">{impact.greenScore}</div>
            <div className="label">Environmental Score</div>
          </div>
          <div className="impact-detail">
            <div className="trend">
              {impact.greenScore >= 60 ? 'Positive Impact' : 'Needs Review'}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="timeline-section">
        <div className="timeline-header">
          <h3>5-Year Impact Timeline</h3>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowDetail(!showDetail)}
          >
            {showDetail ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {showDetail && (
          <div className="timeline-detail">
            <div className="timeline-costs">
              <h4>Costs & Trade-offs</h4>
              <div className="timeline-grid">
                {timeline.costs.map((year) => (
                  <div key={year.year} className="timeline-year">
                    <div className="year">{year.year}</div>
                    <div className="cost">{formatCurrency(year.value)}</div>
                    <div className="households">
                      {formatNumber(year.households)} households affected
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="timeline-benefits">
              <h4>Benefits & Returns</h4>
              <div className="timeline-grid">
                {timeline.benefits.map((year) => (
                  <div key={year.year} className="timeline-year">
                    <div className="year">{year.year}</div>
                    <div className="jobs">+{formatNumber(year.jobs)} jobs</div>
                    <div className="savings">
                      {formatCurrency(year.savings)} in savings
                    </div>
                    <div className="beneficiaries">
                      {formatNumber(year.beneficiaries)} people benefiting
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="impact-insights">
        <h3>Key Insights</h3>
        <ul>
          <li>
            <strong>Tax Impact:</strong> {formatNumber(2000000)} households would see an average tax increase
            of ${Math.round(impact.budget * 1000000 / 2000000)} per year
          </li>
          <li>
            <strong>Job Creation:</strong> Creates {formatNumber(impact.jobs)} jobs over 5 years,
            primarily in {remixBill[0]?.type === 'funding' ? 'public' : 'private'} sector
          </li>
          <li>
            <strong>Long-term Benefits:</strong> Projected ${formatNumber(impact.budget * 1000000 * 0.15 * 5)} in
            cumulative savings by 2030
          </li>
          {impact.greenScore >= 60 && (
            <li>
              <strong>Environmental Impact:</strong> Positive environmental score indicates sustainable
              long-term benefits
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ImpactDashboard;
