import { useState, useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FiPlus, FiTrash2, FiSave, FiImage, FiTrendingUp, FiUsers, FiX, FiCheck } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import '../styles/HomeManagement.css';

function HomeManagement() {
  useDocumentTitle('Home Page Management')
  const [activeTab, setActiveTab] = useState('hero');

  const [heroSlides, setHeroSlides] = useState([]);
  const [partners, setPartners] = useState([]);
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/home`);
      const data = await response.json();
      if (data.success) {
        setHeroSlides(data.data.heroSlides);
        setPartners(data.data.partners);
        setCounters(data.data.counters);
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log('Attempting to save home content:', { heroSlides, partners, counters });
    
    try {
      const response = await fetch(`${API_BASE_URL}/home`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroSlides,
          partners,
          counters
        }),
      });
      
      const data = await response.json();
      console.log('SAVE RESPONSE FROM SERVER:', data);
      
      if (data.success) {
        alert('SUCCESS: Home page content updated in database!');
        // Refresh local state with server data to ensure sync
        if (data.data) {
          setHeroSlides(data.data.heroSlides || []);
          setPartners(data.data.partners || []);
          setCounters(data.data.counters || []);
        }
      } else {
        alert('SAVE FAILED: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('CRITICAL SAVE ERROR:', error);
      alert('NETWORK ERROR: Could not connect to the server to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSlide = () => {
    setHeroSlides([...heroSlides, {
      _id: Date.now().toString(),
      image: '',
      label: '',
      title: '',
      description: '',
      ctaText: 'Contact Us',
      ctaLink: '/contact-us'
    }]);
  };

  const handleUpdateSlide = (id, field, value) => {
    console.log(`Updating Slide ${id}: ${field} = ${value}`);
    setHeroSlides(heroSlides.map(s => s._id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteSlide = (id) => {
    setHeroSlides(heroSlides.filter(s => s._id !== id));
  };

  const handleAddPartner = () => {
    const p = prompt("Enter Partner Name:");
    if (p) setPartners([...partners, p]);
  };

  const handleDeletePartner = (name) => {
    setPartners(partners.filter(p => p !== name));
  };

  const handleFileChange = async (id, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Server returned non-JSON response: ' + text.substring(0, 100));
      }

      if (data.success) {
        handleUpdateSlide(id, 'image', data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('UPLOAD ERROR: ' + error.message);
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="home-mgmt-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Home Page Management</h1>
          <p className="page-subtitle">Update global content, hero sliders, and brand assets</p>
        </div>
        <button 
          className={`btn-primary luxe-save-btn ${isSaving ? 'disabled' : ''}`} 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? <div className="upload-spinner-luxe"></div> : <FiSave />}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="mgmt-tabs-luxe">
        <button 
          className={`tab-btn-luxe ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <FiImage /> <span>Hero Slider</span>
        </button>
        <button 
          className={`tab-btn-luxe ${activeTab === 'partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('partners')}
        >
          <FiUsers /> <span>Venue Partners</span>
        </button>
        <button 
          className={`tab-btn-luxe ${activeTab === 'counters' ? 'active' : ''}`}
          onClick={() => setActiveTab('counters')}
        >
          <FiTrendingUp /> <span>Statistics</span>
        </button>
      </div>

      <div className="tab-content-luxe">
        {loading ? (
          <div className="loading-state-luxe">
            <div className="upload-spinner-luxe"></div>
            <p>Loading Home Content...</p>
          </div>
        ) : activeTab === 'hero' && (
          <div className="hero-mgmt-section reveal">
            <div className="section-header-luxe">
              <div className="header-text">
                <h3>Editorial Hero Slider</h3>
                <p className="section-desc">Manage high-impact visual stories on your landing page</p>
              </div>
              <button className="btn-add-luxe" onClick={handleAddSlide}><FiPlus /> New Slide</button>
            </div>
            
            <div className="slides-list-luxe">
              {heroSlides.map((slide, index) => (
                <div key={slide._id || index} className="slide-edit-card-luxe">
                  <div className="slide-card-header">
                    <span className="slide-badge">Slide {index + 1}</span>
                    <button className="btn-icon-delete" onClick={() => handleDeleteSlide(slide._id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                  
                  <div className="form-grid-2col">
                    <div className="form-group-full">
                      <label className="form-label-luxe">Slide Background Image</label>
                      <div className="image-upload-wrapper-luxe">
                        <div 
                          className={`image-preview-luxe ${uploadingId === slide._id ? 'uploading' : ''}`} 
                          style={{ backgroundImage: slide.image ? `url(${slide.image})` : 'none' }}
                        >
                          {uploadingId === slide._id ? (
                            <div className="upload-spinner-luxe"></div>
                          ) : !slide.image ? (
                            <FiImage className="placeholder-icon" />
                          ) : null}
                        </div>
                        <div className="upload-actions-luxe">
                          <label className={`btn-upload-luxe ${uploadingId === slide._id ? 'disabled' : ''}`}>
                            <FiImage /> <span>{slide.image ? 'Change Image' : 'Select Image'}</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(slide._id, e.target.files[0])} 
                              hidden 
                              disabled={uploadingId === slide._id}
                            />
                          </label>
                          {slide.image && (
                            <input 
                              type="text" 
                              className="input-luxe-small" 
                              value={slide.image} 
                              readOnly 
                              placeholder="Image URL"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="form-label-luxe">Metadata / Hashtags</label>
                      <input 
                        type="text" 
                        className="input-luxe"
                        value={slide.label} 
                        onChange={(e) => handleUpdateSlide(slide._id, 'label', e.target.value)}
                        placeholder="#Wedding #Events"
                      />
                    </div>
                    <div>
                      <label className="form-label-luxe">Main Headline</label>
                      <input 
                        type="text" 
                        className="input-luxe"
                        value={slide.title} 
                        onChange={(e) => handleUpdateSlide(slide._id, 'title', e.target.value)}
                        placeholder="e.g. Signature Celebrations"
                      />
                    </div>
                    <div className="form-group-full">
                      <label className="form-label-luxe">Editorial Description</label>
                      <textarea 
                        className="textarea-luxe"
                        rows="3"
                        value={slide.description} 
                        onChange={(e) => handleUpdateSlide(slide._id, 'description', e.target.value)}
                        placeholder="Write a compelling subtext for this slide..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="partners-mgmt-section reveal">
            <div className="section-header-luxe">
              <div className="header-text">
                <h3>Venue Partners Marquee</h3>
                <p className="section-desc">Manage the animated brand bar on the homepage</p>
              </div>
            </div>
            
            <div className="partners-manager-card">
                <div className="partners-chips-wrap">
                  {partners.map((partner) => (
                    <div key={partner} className="partner-chip-luxe">
                      <span>{partner}</span>
                      <button onClick={() => handleDeletePartner(partner)}><FiX /></button>
                    </div>
                  ))}
                  <button className="btn-chip-add" onClick={handleAddPartner}>
                    <FiPlus /> Add Partner
                  </button>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'counters' && (
          <div className="counters-mgmt-section reveal">
            <div className="section-header-luxe">
              <div className="header-text">
                <h3>Performance Statistics</h3>
                <p className="section-desc">Numerical highlights displayed in the impact section</p>
              </div>
            </div>
            
            <div className="counters-edit-grid-luxe">
              {counters.map((counter, idx) => (
                <div key={counter._id || idx} className="counter-edit-card-luxe">
                  <div className="counter-icon-box">
                    <FiTrendingUp />
                  </div>
                  <div className="counter-form-wrap">
                    <div>
                      <label className="form-label-luxe">Display Label</label>
                      <input 
                        type="text" 
                        className="input-luxe"
                        value={counter.label} 
                        onChange={(e) => {
                          const newCounters = [...counters];
                          newCounters[idx].label = e.target.value;
                          setCounters(newCounters);
                        }}
                      />
                    </div>
                    <div>
                      <label className="form-label-luxe">Numeric Value</label>
                      <input 
                        type="text" 
                        className="input-luxe"
                        value={counter.value} 
                        onChange={(e) => {
                          const newCounters = [...counters];
                          newCounters[idx].value = e.target.value;
                          setCounters(newCounters);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeManagement;
