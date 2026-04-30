import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../styles/DashboardHome.css';
import { FiCalendar, FiUsers, FiLayers, FiMessageSquare } from 'react-icons/fi';

function DashboardHome() {
  const [stats, setStats] = useState({
    enquiries: 0,
    services: 0,
    projects: 0,
    testimonials: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [enqRes, servRes, projRes, testRes] = await Promise.all([
          fetch(`${API_BASE_URL}/enquiries`),
          fetch(`${API_BASE_URL}/services`),
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/testimonials/admin`)
        ]);

        const [enqData, servData, projData, testData] = await Promise.all([
          enqRes.json(),
          servRes.json(),
          projRes.json(),
          testRes.json()
        ]);

        setStats({
          enquiries: enqData.success ? enqData.data.length : 0,
          services: servData.success ? servData.data.length : 0,
          projects: projData.success ? projData.data.length : 0,
          testimonials: testData.success ? testData.data.length : 0
        });

        if (enqData.success) {
          // Take the 5 most recent leads
          const sorted = [...enqData.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentLeads(sorted.slice(0, 5));
        }

      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-home-luxe">
      <div className="page-header">
        <div>
          <h1 className="page-title">Performance Overview</h1>
          <p className="page-subtitle">Real-time metrics and recent activity for Event Foundation</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="card stat-card" onClick={() => navigate('/dashboard/enquiries')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-luxe"><FiMessageSquare /></div>
          <div className="stat-content-luxe">
            <span className="stat-label">Total Enquiries</span>
            <span className="stat-value">{stats.enquiries}</span>
          </div>
        </div>
        <div className="card stat-card" onClick={() => navigate('/dashboard/services')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-luxe"><FiLayers /></div>
          <div className="stat-content-luxe">
            <span className="stat-label">Active Services</span>
            <span className="stat-value">{stats.services}</span>
          </div>
        </div>
        <div className="card stat-card" onClick={() => navigate('/dashboard/our-work')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-luxe"><FiUsers /></div>
          <div className="stat-content-luxe">
            <span className="stat-label">Portfolio Projects</span>
            <span className="stat-value">{stats.projects}</span>
          </div>
        </div>
        <div className="card stat-card" onClick={() => navigate('/dashboard/testimonials')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon-luxe"><FiCalendar /></div>
          <div className="stat-content-luxe">
            <span className="stat-label">Client Stories</span>
            <span className="stat-value">{stats.testimonials}</span>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header-luxe">
          <h3>Recent Leads</h3>
          <button className="btn-edit-text" onClick={() => navigate('/dashboard/enquiries')}>View All Enquiries</button>
        </div>
        <div className="table-container card">
          <table className="luxe-table">
            <thead>
              <tr>
                <th>Received On</th>
                <th>Name</th>
                <th>Event Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>Loading leads...</td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>No recent leads found.</td>
                </tr>
              ) : recentLeads.map((lead) => (
                <tr key={lead._id} onClick={() => navigate('/dashboard/enquiries')} style={{ cursor: 'pointer' }}>
                  <td>{formatDate(lead.createdAt)}</td>
                  <td className="font-bold text-dark">{lead.name}</td>
                  <td><span className="event-tag-luxe">{lead.eventType}</span></td>
                  <td>
                    <span className={`status-pill-admin ${lead.status?.toLowerCase() || 'new'}`}>
                      {lead.status || 'New'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

