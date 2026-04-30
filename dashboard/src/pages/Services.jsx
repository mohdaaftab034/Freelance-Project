import { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FiEdit, FiTrash2, FiX, FiPlus, FiLink, FiImage, FiList, FiCheckCircle, FiClock, FiGrid, FiSettings, FiPackage, FiType, FiUploadCloud } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import '../styles/Services.css';

import { ALLOWED_SERVICES } from '../utils/constants';


function Services() {
  useDocumentTitle('Services Management')
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const galleryInputRef = useRef(null);
  const heroInputRef = useRef(null);
  const overviewImageInputRef = useRef(null);
  const excellenceImageInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/services`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setSelectedService({ ...service });
    } else {
      // Find the first service title that isn't already used
      const existingTitles = services.map(s => s.title);
      const availableTitle = ALLOWED_SERVICES.find(t => !existingTitles.includes(t)) || ALLOWED_SERVICES[0];
      
      setSelectedService({
        title: availableTitle,
        slug: availableTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        description: '',
        image: '',
        serviceIcon: '✦',
        breadcrumb: `Home > Services > ${availableTitle}`,
        overview: ['', ''],
        overviewImage: '',
        excellenceImage: '',
        included: [{ icon: '', title: '', text: '' }],
        features: [{ title: '', text: '' }],
        timelineSteps: ['', '', '', ''],
        gallery: [],
        styleVariant: ''
      });
    }
    setActiveSection('basic');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Auto-generate slug and breadcrumb if title changed
      const slug = selectedService.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const breadcrumb = `Home > Services > ${selectedService.title}`;
      const serviceData = { ...selectedService, slug, breadcrumb };

      const url = serviceData._id 
        ? `${API_BASE_URL}/services/${serviceData._id}`
        : `${API_BASE_URL}/services`;
      
      const method = serviceData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });

      const data = await response.json();
      if (data.success) {
        fetchServices();
        handleCloseModal();
      } else {
        alert('Save failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Network error while saving service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchServices();
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleFileUpload = async (e, targetField, isArray = false) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          if (!isArray) {
            setSelectedService(prev => ({ ...prev, [targetField]: data.url }));
          } else {
            setSelectedService(prev => ({
              ...prev,
              [targetField]: [...prev[targetField], data.url]
            }));
          }
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const updateArrayItem = (field, index, value) => {
    const newArr = [...selectedService[field]];
    newArr[index] = value;
    setSelectedService({ ...selectedService, [field]: newArr });
  };

  const addArrayItem = (field, defaultValue) => {
    setSelectedService({ ...selectedService, [field]: [...selectedService[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    setSelectedService({
      ...selectedService,
      [field]: selectedService[field].filter((_, i) => i !== index)
    });
  };

  const updateObjectInArray = (field, index, subField, value) => {
    const newArr = [...selectedService[field]];
    newArr[index] = { ...newArr[index], [subField]: value };
    setSelectedService({ ...selectedService, [field]: newArr });
  };

  return (
    <div className="services-management-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Services Management</h1>
          <p className="page-subtitle">Configure detailed content for signature service pages</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Add New Service
        </button>
      </div>

      <div className="services-grid-admin">
        {loading ? (
          <div className="loading-state-luxe">
            <div className="upload-spinner-luxe"></div>
            <p>Loading Services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="empty-state-luxe">No services found. Add your first service!</div>
        ) : services.map((service) => (
          <div key={service._id} className="service-admin-card" onClick={() => handleOpenModal(service)}>
            <div className="service-admin-media">
              <img src={service.image || 'https://placehold.co/600x400?text=No+Image'} alt={service.title} />
              <div className="service-status-tag">Active</div>
            </div>
            <div className="service-admin-content">
              <h3 className="service-admin-title">{service.title}</h3>
              <p className="service-admin-path"><FiLink /> /services/{service.slug}</p>
              <p className="service-admin-desc">
                {service.description?.substring(0, 100)}...
              </p>
              <div className="service-admin-actions">
                <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); handleOpenModal(service); }}>
                  <FiEdit /> Edit Details
                </button>
                <button className="btn-icon-delete" onClick={(e) => handleDelete(e, service._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedService && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedService._id ? 'Edit Service Details' : 'New Service'}</h2>
                <p className="modal-subtitle">Full template structure matching the website</p>
              </div>
              <button className="btn-close" onClick={handleCloseModal}><FiX /></button>
            </div>
            
            <div className="modal-body-tabbed">
              <aside className="modal-sidebar-tabs">
                <button className={activeSection === 'basic' ? 'active' : ''} onClick={() => setActiveSection('basic')}>
                  <FiSettings /> <span>Hero Config</span>
                </button>
                <button className={activeSection === 'about' ? 'active' : ''} onClick={() => setActiveSection('about')}>
                  <FiType /> <span>About Section</span>
                </button>
                <button className={activeSection === 'features' ? 'active' : ''} onClick={() => setActiveSection('features')}>
                  <FiPackage /> <span>What We Deliver</span>
                </button>
                <button className={activeSection === 'process' ? 'active' : ''} onClick={() => setActiveSection('process')}>
                  <FiClock /> <span>Our Approach</span>
                </button>
                <button className={activeSection === 'gallery' ? 'active' : ''} onClick={() => setActiveSection('gallery')}>
                  <FiGrid /> <span>Work Gallery</span>
                </button>
              </aside>

              <div className="modal-content-scroll">
                <form id="service-form" onSubmit={handleSave}>
                  {activeSection === 'basic' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Hero Section Configuration</h3>
                      <div className="form-grid-2col">
                        <div className="form-group-full">
                          <label className="form-label-luxe">Service Category (Navbar Match)*</label>
                          <select 
                            className="select-luxe" 
                            value={selectedService.title} 
                            required 
                            onChange={(e) => setSelectedService({...selectedService, title: e.target.value})}
                          >
                            {ALLOWED_SERVICES.map(service => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Style Variant (CSS Class)</label>
                          <input className="input-luxe" type="text" value={selectedService.styleVariant} onChange={(e) => setSelectedService({...selectedService, styleVariant: e.target.value})} placeholder="e.g. wedding, corporate, social" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Service Icon (Emoji/Symbol)</label>
                          <input className="input-luxe" type="text" value={selectedService.serviceIcon} onChange={(e) => setSelectedService({...selectedService, serviceIcon: e.target.value})} placeholder="e.g. ✦, ▣, ✺" />
                        </div>
                        <div className="form-group-full">
                          <label className="form-label-luxe">Listing Image (For Cards & Hero)</label>
                          <div className={`medium-upload-box ${isUploading ? 'uploading' : ''}`} style={{height:'160px'}} onClick={() => !isUploading && heroInputRef.current.click()}>
                            {isUploading ? (
                                <div className="medium-placeholder"><div className="upload-spinner-luxe"></div><p>Uploading...</p></div>
                            ) : selectedService.image ? (
                                <div className="medium-upload-preview">
                                    <img src={selectedService.image} alt="Hero" />
                                    <div className="medium-upload-overlay"><span>Change Image</span></div>
                                </div>
                            ) : (
                                <div className="medium-placeholder"><FiUploadCloud /> Upload Image</div>
                            )}
                            <input type="file" ref={heroInputRef} style={{display:'none'}} accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                          </div>
                        </div>
                        <div className="form-group-full">
                          <label className="form-label-luxe">Short Card Description</label>
                          <textarea className="textarea-luxe" value={selectedService.description} onChange={(e) => setSelectedService({...selectedService, description: e.target.value})} rows="2" placeholder="Brief intro for services grid..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'about' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">About This Service</h3>
                      <div className="form-group-full mb-32">
                        <label className="form-label-luxe">Overview Visual</label>
                        <div className={`medium-upload-box ${isUploading ? 'uploading' : ''}`} onClick={() => !isUploading && overviewImageInputRef.current.click()}>
                            {isUploading ? (
                                <div className="medium-placeholder"><div className="upload-spinner-luxe"></div><p>Uploading...</p></div>
                            ) : selectedService.overviewImage ? (
                                <div className="medium-upload-preview">
                                    <img src={selectedService.overviewImage} alt="About" />
                                    <div className="medium-upload-overlay"><FiUploadCloud /> Change Image</div>
                                </div>
                            ) : (
                                <div className="medium-placeholder">
                                    <FiUploadCloud />
                                    <p>Upload Section Image</p>
                                </div>
                            )}
                            <input type="file" ref={overviewImageInputRef} style={{display:'none'}} accept="image/*" onChange={(e) => handleFileUpload(e, 'overviewImage')} />
                        </div>
                      </div>

                      <div className="form-group-full mb-32">
                        <label className="form-label-luxe">Tailored Excellence Visual</label>
                        <div className={`medium-upload-box ${isUploading ? 'uploading' : ''}`} onClick={() => !isUploading && excellenceImageInputRef.current.click()}>
                            {isUploading ? (
                                <div className="medium-placeholder"><div className="upload-spinner-luxe"></div><p>Uploading...</p></div>
                            ) : selectedService.excellenceImage ? (
                                <div className="medium-upload-preview">
                                    <img src={selectedService.excellenceImage} alt="Excellence" />
                                    <div className="medium-upload-overlay"><FiUploadCloud /> Change Image</div>
                                </div>
                            ) : (
                                <div className="medium-placeholder">
                                    <FiUploadCloud />
                                    <p>Upload Excellence Image</p>
                                </div>
                            )}
                            <input type="file" ref={excellenceImageInputRef} style={{display:'none'}} accept="image/*" onChange={(e) => handleFileUpload(e, 'excellenceImage')} />
                        </div>
                      </div>

                      <div className="dynamic-list-wrap mt-24">
                        <label className="form-label-luxe">Editorial Overview Paragraphs</label>
                        {selectedService.overview.map((para, idx) => (
                          <div key={idx} className="dynamic-list-row">
                            <textarea className="textarea-luxe" value={para} onChange={(e) => updateArrayItem('overview', idx, e.target.value)} rows="3" placeholder={`Paragraph ${idx + 1}...`} />
                            <button type="button" className="btn-delete-small" onClick={() => removeArrayItem('overview', idx)}><FiTrash2 /></button>
                          </div>
                        ))}
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('overview', '')}><FiPlus /> Add Paragraph</button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'features' && (
                    <div className="form-section-active">
                      <div className="dynamic-list-wrap">
                        <h3 className="section-title-modal">What We Deliver (Expertise)</h3>
                        {selectedService.features.map((feat, idx) => (
                          <div key={idx} className="dynamic-object-item card">
                            <input className="input-luxe mb-12" type="text" value={feat.title} placeholder="Expertise Title" onChange={(e) => updateObjectInArray('features', idx, 'title', e.target.value)} />
                            <textarea className="textarea-luxe" value={feat.text} placeholder="Brief Description" onChange={(e) => updateObjectInArray('features', idx, 'text', e.target.value)} rows="2" />
                            <button type="button" className="btn-delete-abs" onClick={() => removeArrayItem('features', idx)}><FiTrash2 /></button>
                          </div>
                        ))}
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('features', { title: '', text: '' })}><FiPlus /> Add Expertise Item</button>
                      </div>

                      <div className="dynamic-list-wrap mt-48">
                        <h3 className="section-title-modal">What's Included (Luxe Package)</h3>
                        <div className="included-grid-modal">
                          {selectedService.included.map((inc, idx) => (
                            <div key={idx} className="dynamic-object-item card">
                              <div className="icon-title-row mb-12">
                                <input className="input-luxe" style={{width:'80px', textAlign:'center'}} type="text" value={inc.icon} placeholder="Icon" onChange={(e) => updateObjectInArray('included', idx, 'icon', e.target.value)} />
                                <input className="input-luxe" type="text" value={inc.title} placeholder="Service Item" onChange={(e) => updateObjectInArray('included', idx, 'title', e.target.value)} />
                              </div>
                              <textarea className="textarea-luxe" value={inc.text} placeholder="Short Description" onChange={(e) => updateObjectInArray('included', idx, 'text', e.target.value)} rows="2" />
                              <button type="button" className="btn-delete-abs" onClick={() => removeArrayItem('included', idx)}><FiTrash2 /></button>
                            </div>
                          ))}
                        </div>
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('included', { icon: '', title: '', text: '' })}><FiPlus /> Add Package Item</button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'process' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Our Signature Process (Timeline)</h3>
                      <div className="timeline-steps-grid">
                        {selectedService.timelineSteps.map((step, idx) => (
                          <div key={idx} className="timeline-step-input">
                            <label className="form-label-luxe" style={{color:'var(--color-gold)'}}>Phase {idx + 1}</label>
                            <input className="input-luxe" type="text" value={step} onChange={(e) => updateArrayItem('timelineSteps', idx, e.target.value)} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-24">
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('timelineSteps', '')}><FiPlus /> Add Phase</button>
                        <button type="button" className="btn-secondary ml-12" onClick={() => removeArrayItem('timelineSteps', selectedService.timelineSteps.length - 1)}>Remove Last Phase</button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'gallery' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Visual Story (Work Gallery)</h3>
                      <div className="gallery-mgmt-box">
                        <div className={`upload-zone-luxe ${isUploading ? 'uploading' : ''}`} onClick={() => !isUploading && galleryInputRef.current.click()}>
                          {isUploading ? (
                              <div className="upload-spinner-luxe"></div>
                          ) : (
                              <FiUploadCloud className="upload-icon-large" />
                          )}
                          <div className="upload-text-content">
                            <p>{isUploading ? 'Uploading Photos...' : 'Upload Gallery Photos'}</p>
                            <span>Luxe visuals for the service showcase</span>
                          </div>
                          <input type="file" ref={galleryInputRef} style={{ display: 'none' }} multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'gallery', true)} />
                        </div>
                        <div className="gallery-preview-grid-modal mt-24">
                          {selectedService.gallery.map((img, idx) => (
                            <div key={idx} className="gallery-thumb-admin">
                              <img src={img} alt="Service Gallery" />
                              <button type="button" onClick={() => removeArrayItem('gallery', idx)}><FiTrash2 /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            <div className="form-footer-sticky">
              <button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={isSaving || isUploading}>Discard</button>
              <button type="submit" form="service-form" className="btn-primary" disabled={isSaving || isUploading}>
                {isSaving ? <div className="upload-spinner-luxe"></div> : null}
                <span>{isSaving ? 'Saving Service...' : 'Save All Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
