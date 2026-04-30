import { useState, useEffect } from 'react';
import { FiEye, FiTrash2, FiX, FiCheckCircle, FiClock, FiMail, FiPhone, FiCalendar, FiTag, FiUser, FiMessageCircle, FiSend } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import '../styles/Enquiries.css';

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, { mode: 'cors' });
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enquiry record?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
          method: 'DELETE',
          mode: 'cors',
        });
        const data = await response.json();
        if (data.success) {
          setEnquiries(enquiries.filter(e => e._id !== id));
          handleCloseModal();
        }
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setEnquiries(enquiries.map(e => e._id === id ? data.data : e));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(data.data);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="enquiries-container-luxe">
      <div className="page-header">
        <div>
          <h1 className="page-title">Lead Management</h1>
          <p className="page-subtitle">Nurture and track your potential client relationships</p>
        </div>
        <button className="btn-primary-luxe" onClick={() => alert("Exporting data to CSV...")}>
            <span>Download All Leads</span>
        </button>
      </div>

      <div className="leads-grid-luxe reveal">
        {loading ? (
          <div className="loading-spinner-container">
            <p>Loading enquiries...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="no-data-container">
            <p>No real leads found.</p>
          </div>
        ) : (
          enquiries.map(e => (
            <div key={e._id} className="lead-card-luxe" onClick={() => handleOpenDetails(e)}>
              <div className="lead-card-header">
                  <span className={`status-tag-luxe ${e.status.toLowerCase()}`}>{e.status}</span>
                  <span className="lead-date-luxe">{formatDate(e.createdAt)}</span>
              </div>
              <div className="lead-card-body">
                  <div className="lead-avatar-luxe">{e.name.charAt(0)}</div>
                  <div className="lead-main-info">
                      <h3 className="lead-name-luxe">{e.name}</h3>
                      <div className="lead-meta-luxe">
                          <span className="lead-type-luxe">{e.eventType}</span>
                      </div>
                  </div>
              </div>
              <div className="lead-card-footer">
                  <div className="lead-contact-strip">
                      <FiMail /> <span>{e.email}</span>
                  </div>
                  <button className="lead-view-btn" onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDetails(e);
                  }}>
                      Details
                  </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedEnquiry && (
        <div className="modal-overlay-luxe">
          <div className="modal-content-luxe detail-popup-luxe reveal">
            <div className="popup-sidebar">
                <div className="sidebar-top">
                    <div className="enquiry-avatar-large">{selectedEnquiry.name.charAt(0)}</div>
                    <h2 className="popup-name">{selectedEnquiry.name}</h2>
                    <span className="popup-type-tag">{selectedEnquiry.eventType}</span>
                </div>
                
                <div className="sidebar-contact-list">
                    <div className="contact-item-luxe">
                        <label>Email Address</label>
                        <p>{selectedEnquiry.email}</p>
                    </div>
                    <div className="contact-item-luxe">
                        <label>Phone Number</label>
                        <p>{selectedEnquiry.phone}</p>
                    </div>
                    <div className="contact-item-luxe">
                        <label>Submitted On</label>
                        <p>{formatDate(selectedEnquiry.createdAt)}</p>
                    </div>
                </div>

                <div className="status-selector-popup">
                    <label className="sidebar-label">Update Stage</label>
                    <div className="status-options-column">
                        {['New', 'Contacted', 'Closed'].map(status => (
                            <button 
                                key={status}
                                className={`status-opt-btn ${selectedEnquiry.status === status ? 'active' : ''}`}
                                onClick={() => updateStatus(selectedEnquiry._id, status)}
                            >
                                <div className="dot"></div>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="popup-main">
                <div className="popup-header-actions">
                    <button className="btn-close-luxe" onClick={handleCloseModal}><FiX /></button>
                </div>
                
                <div className="popup-body-content">
                    <div className="message-section-luxe">
                        <div className="section-title-luxe">
                            <FiMessageCircle /> <span>Customer Requirements</span>
                        </div>
                        <div className="requirement-card">
                            <p>"{selectedEnquiry.message}"</p>
                        </div>
                    </div>

                    <div className="action-section-luxe">
                        <div className="section-title-luxe">
                            <FiSend /> <span>Quick Actions</span>
                        </div>
                        <div className="action-buttons-luxe">
                            <a href={`mailto:${selectedEnquiry.email}`} className="action-btn-luxe primary">
                                <FiMail /> Send Email
                            </a>
                            <a href={`tel:${selectedEnquiry.phone}`} className="action-btn-luxe">
                                <FiPhone /> Call Now
                            </a>
                            <button className="action-btn-luxe danger" onClick={() => handleDelete(selectedEnquiry._id)}>
                                <FiTrash2 /> Delete Lead
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Enquiries;
