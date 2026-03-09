import React, { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics() {
  const [stats, setStats] = useState({
    total_students: 0,
    average_gpa: 0,
    students_by_major: {},
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const majorEntries = Object.entries(stats.students_by_major);

  return (
    <div className="statistics-container">
      <h2>Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{stats.total_students}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average GPA</div>
          <div className="stat-value">{stats.average_gpa.toFixed(2)}</div>
        </div>
      </div>

      <div className="major-stats">
        <h3>Students by Major</h3>
        {majorEntries.length === 0 ? (
          <p className="empty-message">No data available</p>
        ) : (
          <table className="major-table">
            <thead>
              <tr>
                <th>Major</th>
                <th>Number of Students</th>
              </tr>
            </thead>
            <tbody>
              {majorEntries.map(([major, count]) => (
                <tr key={major}>
                  <td>{major}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button className="btn btn-primary" onClick={fetchStatistics}>
        Refresh Statistics
      </button>
    </div>
  );
}

export default Statistics;
