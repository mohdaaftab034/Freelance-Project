import { useState, useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FiEdit, FiTrash2, FiStar, FiX, FiPlus, FiCheckCircle, FiCircle, FiUser } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import { ALLOWED_SERVICES } from '../utils/constants';
import '../styles/Testimonials.css';

function Testimonials() {
  useDocumentTitle('Testimonials Management')
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/testimonials/admin`);
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setSelectedTestimonial({ ...testimonial });
    } else {
      setSelectedTestimonial({
        name: '',
        role: '',
        event: ALLOWED_SERVICES[0],
        rating: 5,
        quote: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = selectedTestimonial._id 
        ? `${API_BASE_URL}/testimonials/${selectedTestimonial._id}`
        : `${API_BASE_URL}/testimonials`;
      
      const method = selectedTestimonial._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedTestimonial)
      });

      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
        handleCloseModal();
      } else {
        alert('Save failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Network error while saving testimonial');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchTestimonials();
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar key={star} className={star <= rating ? 'star-filled' : 'star-empty'} />
        ))}
      </div>
    );
  };

  return (
    <div className="testimonials-management-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Testimonials Management</h1>
          <p className="page-subtitle">Manage client reviews and ratings displayed on the website</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Add New Testimonial
        </button>
      </div>

      <div className="testimonials-list">
        {loading ? (
          <div className="loading-state-luxe" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
            <p>Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="empty-state-luxe" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
            No testimonials found. Add your first client review!
          </div>
        ) : testimonials.map((t) => (
          <div key={t._id} className="testimonial-admin-card">
            <div className="testimonial-card-header">
              <div className="client-info">
                <div className="client-avatar">{t.name.charAt(0)}</div>
                <div>
                  <h3 className="client-name">{t.name}</h3>
                  <span className="event-type-tag">{t.event}</span>
                </div>
              </div>
              <div className="testimonial-actions-top">
                <span className={`status-pill ${t.isActive ? 'published' : 'draft'}`}>
                  {t.isActive ? 'Published' : 'Hidden'}
                </span>
              </div>
            </div>
            
            <div className="testimonial-card-body">
              {renderStars(t.rating)}
              <p className="client-role" style={{ color: 'var(--color-gold)', fontSize: '0.85rem', marginBottom: '8px' }}>{t.role}</p>
              <p className="testimonial-text">"{t.quote}"</p>
            </div>

            <div className="testimonial-card-footer">
              <button className="btn-edit-text" onClick={() => handleOpenModal(t)}>
                <FiEdit /> Edit Review
              </button>
              <button className="btn-icon-delete" onClick={() => handleDelete(t._id)}>
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedTestimonial && (
        <div className="modal-overlay">
          <div className="modal-content testimonial-modal-luxe">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedTestimonial._id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                <p className="modal-subtitle">Share your success stories with future clients</p>
              </div>
              <button className="btn-close" onClick={handleCloseModal}><FiX /></button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="modal-content-scroll">
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label-luxe">Client / Couple Name*</label>
                    <input 
                      type="text" 
                      className="input-luxe" 
                      required
                      value={selectedTestimonial.name}
                      onChange={(e) => setSelectedTestimonial({...selectedTestimonial, name: e.target.value})}
                      placeholder="e.g. Priyanshu & Aarti"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label-luxe">Client Role*</label>
                    <input 
                      type="text" 
                      className="input-luxe" 
                      required
                      value={selectedTestimonial.role}
                      onChange={(e) => setSelectedTestimonial({...selectedTestimonial, role: e.target.value})}
                      placeholder="e.g. Wedding Client / CEO"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-luxe">Event Category</label>
                    <select 
                      className="select-luxe"
                      value={selectedTestimonial.event}
                      onChange={(e) => setSelectedTestimonial({...selectedTestimonial, event: e.target.value})}
                    >
                      {ALLOWED_SERVICES.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label-luxe">Star Rating</label>
                    <div className="rating-input-luxe">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button 
                                key={num}
                                type="button"
                                className={`star-btn-luxe ${num <= selectedTestimonial.rating ? 'active' : ''}`}
                                onClick={() => setSelectedTestimonial({...selectedTestimonial, rating: num})}
                            >
                                <FiStar />
                            </button>
                        ))}
                    </div>
                  </div>

                  <div className="form-group-full">
                    <label className="form-label-luxe">Review Narrative*</label>
                    <textarea 
                      className="textarea-luxe" 
                      required
                      rows="6"
                      value={selectedTestimonial.quote}
                      onChange={(e) => setSelectedTestimonial({...selectedTestimonial, quote: e.target.value})}
                      placeholder="Describe the client's experience in detail..."
                    ></textarea>
                  </div>

                  <div className="form-group-full">
                    <label className="form-label-luxe">Visibility Status</label>
                    <div className="status-selector-luxe">
                        <button 
                          type="button"
                          className={`status-opt ${selectedTestimonial.isActive ? 'active' : ''}`}
                          onClick={() => setSelectedTestimonial({...selectedTestimonial, isActive: true})}
                        >
                          {selectedTestimonial.isActive ? <FiCheckCircle /> : <FiCircle />}
                          Published
                        </button>
                        <button 
                          type="button"
                          className={`status-opt ${!selectedTestimonial.isActive ? 'active' : ''}`}
                          onClick={() => setSelectedTestimonial({...selectedTestimonial, isActive: false})}
                        >
                          {!selectedTestimonial.isActive ? <FiCheckCircle /> : <FiCircle />}
                          Hidden
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-footer-sticky">
                <button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={isSaving}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimonials;

