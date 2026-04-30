import { useState, useRef } from 'react';
import { FiTrash2, FiX, FiUploadCloud, FiEdit, FiPlus, FiImage, FiSettings, FiType, FiPackage, FiGrid } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import { ALLOWED_SERVICES } from '../utils/constants';
import '../styles/OurWork.css';

const initialProjects = [
  {
    slug: 'royal-vows-night-lucknow',
    title: 'Royal Vows Night',
    category: 'Weddings',
    location: 'Taj Mahal, Lucknow',
    year: '2025',
    guests: '450 Guests',
    services: 'Venue Styling, Hospitality, Entertainment',
    summary: 'A grand evening wedding with a regal decor language, custom lighting design, and seamless guest-flow coordination.',
    overviewParagraphs: [
      'Every case study is shaped as a tightly orchestrated editorial story, balancing planning precision, premium styling, guest flow, and production discipline.',
      'This project reflects the same dark luxury language used throughout the site: minimal hierarchy, gold accents, high-contrast imagery, and a refined sense of spatial rhythm.'
    ],
    executionHighlightsText: 'This project was delivered through a tightly coordinated planning model, blending premium design direction with on-ground operational control and hospitality excellence.',
    executionHighlightsList: [
      'End-to-end vendor and logistics orchestration',
      'Experience-focused guest journey mapping',
      'Real-time production, styling, and quality supervision'
    ],
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80',
      'https://images.unsplash.com/photo-1587271339318-2e78b7c86088?w=1400&q=80'
    ]
  }
];

function OurWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const galleryInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    setSelectedProject(project || {
      title: '',
      category: ALLOWED_SERVICES[0],
      location: '',
      year: new Date().getFullYear().toString(),
      guests: '',
      services: '',
      summary: '',
      overviewParagraphs: ['', ''],
      executionHighlightsText: '',
      executionHighlightsList: ['', '', ''],
      coverImage: '',
      images: []
    });
    setActiveSection('basic');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Auto-generate slug if title changed or new
      const slug = selectedProject.slug || selectedProject.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const projectData = { ...selectedProject, slug };

      const url = projectData._id 
        ? `${API_BASE_URL}/projects/${projectData._id}`
        : `${API_BASE_URL}/projects`;
      
      const method = projectData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();
      if (data.success) {
        fetchProjects();
        handleCloseModal();
      } else {
        alert('Save failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Network error while saving project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
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
            setSelectedProject(prev => ({ ...prev, [targetField]: data.url }));
          } else {
            setSelectedProject(prev => ({
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
    const newArr = [...selectedProject[field]];
    newArr[index] = value;
    setSelectedProject({ ...selectedProject, [field]: newArr });
  };

  const addArrayItem = (field, defaultValue) => {
    setSelectedProject({ ...selectedProject, [field]: [...selectedProject[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    setSelectedProject({
      ...selectedProject,
      [field]: selectedProject[field].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="ourwork-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Our Work Management</h1>
          <p className="page-subtitle">Configure detailed project case studies and galleries</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Add New Project
        </button>
      </div>

      <div className="work-grid">
        {loading ? (
          <div className="loading-state-luxe">
            <div className="upload-spinner-luxe"></div>
            <p>Loading Portfolio...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state-luxe">No projects found. Add your first project!</div>
        ) : projects.map((project) => (
          <div key={project._id} className="work-card" onClick={() => handleOpenModal(project)}>
            <div className="work-card-media">
              <img src={project.coverImage || 'https://placehold.co/800x400?text=No+Cover'} alt={project.title} />
              <div className="work-card-overlay">
                <FiEdit className="edit-icon" />
              </div>
              <span className="card-category-tag">{project.category}</span>
            </div>
            <div className="work-card-body">
              <div className="work-card-info">
                <span className="work-card-year">{project.year}</span>
                <h3 className="work-card-title">{project.title || 'Untitled Project'}</h3>
                <p className="work-card-summary">{project.summary?.substring(0, 80)}...</p>
                <div className="work-card-stats">
                  <span><FiImage /> {project.images.length} Photos</span>
                  <span>• {project.location}</span>
                </div>
              </div>
              <div className="work-card-actions">
                <button className="btn-icon-delete" onClick={(e) => handleDelete(e, project._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedProject.title ? 'Edit Case Study' : 'New Case Study'}</h2>
                <p className="modal-subtitle">Project structure matching the luxe case study template</p>
              </div>
              <button className="btn-close" onClick={handleCloseModal}><FiX /></button>
            </div>
            
            <div className="modal-body-tabbed">
              <aside className="modal-sidebar-tabs">
                <button className={activeSection === 'basic' ? 'active' : ''} onClick={() => setActiveSection('basic')}>
                  <FiSettings /> <span>Hero & Meta</span>
                </button>
                <button className={activeSection === 'overview' ? 'active' : ''} onClick={() => setActiveSection('overview')}>
                  <FiType /> <span>Case Story</span>
                </button>
                <button className={activeSection === 'execution' ? 'active' : ''} onClick={() => setActiveSection('execution')}>
                  <FiPackage /> <span>Execution</span>
                </button>
                <button className={activeSection === 'gallery' ? 'active' : ''} onClick={() => setActiveSection('gallery')}>
                  <FiGrid /> <span>Visual Story</span>
                </button>
              </aside>

              <div className="modal-content-scroll">
                <form id="project-form" onSubmit={handleSave}>
                  {activeSection === 'basic' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Primary Configuration</h3>
                      <div className="form-grid-2col">
                        <div className="form-group-full">
                          <label className="form-label-luxe">Project Title*</label>
                          <input className="input-luxe" type="text" value={selectedProject.title} required onChange={(e) => setSelectedProject({...selectedProject, title: e.target.value})} placeholder="e.g. Royal Vows Night" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Category</label>
                          <select className="select-luxe" value={selectedProject.category} onChange={(e) => setSelectedProject({...selectedProject, category: e.target.value})}>
                            {ALLOWED_SERVICES.map(service => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Year</label>
                          <input className="input-luxe" type="text" value={selectedProject.year} onChange={(e) => setSelectedProject({...selectedProject, year: e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Location</label>
                          <input className="input-luxe" type="text" value={selectedProject.location} onChange={(e) => setSelectedProject({...selectedProject, location: e.target.value})} placeholder="e.g. Taj Mahal, Lucknow" />
                        </div>
                        <div className="form-group">
                          <label className="form-label-luxe">Scale (Guests)</label>
                          <input className="input-luxe" type="text" value={selectedProject.guests} onChange={(e) => setSelectedProject({...selectedProject, guests: e.target.value})} placeholder="e.g. 450 Guests" />
                        </div>
                         <div className="form-group-full">
                          <label className="form-label-luxe">Case Study Cover Image</label>
                          <div className={`medium-upload-box ${isUploading ? 'uploading' : ''}`} onClick={() => !isUploading && coverInputRef.current.click()}>
                            {isUploading ? (
                                <div className="medium-placeholder"><div className="upload-spinner-luxe"></div><p>Uploading...</p></div>
                            ) : selectedProject.coverImage ? (
                                <div className="medium-upload-preview">
                                    <img src={selectedProject.coverImage} alt="Cover" />
                                    <div className="medium-upload-overlay"><FiUploadCloud /> Change Cover</div>
                                </div>
                            ) : (
                                <div className="medium-placeholder"><FiUploadCloud /> <p>Upload Project Cover</p></div>
                            )}
                            <input type="file" ref={coverInputRef} style={{display:'none'}} accept="image/*" onChange={(e) => handleFileUpload(e, 'coverImage')} />
                          </div>
                        </div>
                        <div className="form-group-full">
                          <label className="form-label-luxe">Hero Summary (Editorial Intro)</label>
                          <textarea className="textarea-luxe" value={selectedProject.summary} onChange={(e) => setSelectedProject({...selectedProject, summary: e.target.value})} rows="3" placeholder="Brief luxe summary..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'overview' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Case Story (Overview Section)</h3>
                      <div className="dynamic-list-wrap">
                        <label className="form-label-luxe">Editorial Story Paragraphs</label>
                        {selectedProject.overviewParagraphs.map((para, idx) => (
                          <div key={idx} className="dynamic-list-row">
                            <textarea className="textarea-luxe" value={para} onChange={(e) => updateArrayItem('overviewParagraphs', idx, e.target.value)} rows="4" placeholder={`Paragraph ${idx + 1}...`} />
                            <button type="button" className="btn-delete-small" onClick={() => removeArrayItem('overviewParagraphs', idx)}><FiTrash2 /></button>
                          </div>
                        ))}
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('overviewParagraphs', '')}><FiPlus /> Add Story Paragraph</button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'execution' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Execution & Scope</h3>
                      <div className="form-group-full mb-32">
                        <label className="form-label-luxe">Execution Highlights Narrative</label>
                        <textarea className="textarea-luxe" value={selectedProject.executionHighlightsText} onChange={(e) => setSelectedProject({...selectedProject, executionHighlightsText: e.target.value})} rows="3" placeholder="Luxe description of the process..." />
                      </div>
                      
                      <div className="dynamic-list-wrap mb-32">
                        <label className="form-label-luxe">Execution Bullet Points</label>
                        {selectedProject.executionHighlightsList.map((point, idx) => (
                          <div key={idx} className="dynamic-list-row">
                            <input className="input-luxe" type="text" value={point} onChange={(e) => updateArrayItem('executionHighlightsList', idx, e.target.value)} placeholder={`Bullet Point ${idx + 1}...`} />
                            <button type="button" className="btn-delete-small" onClick={() => removeArrayItem('executionHighlightsList', idx)}><FiTrash2 /></button>
                          </div>
                        ))}
                        <button type="button" className="btn-add-luxe" onClick={() => addArrayItem('executionHighlightsList', '')}><FiPlus /> Add Bullet Point</button>
                      </div>

                      <div className="form-group-full">
                        <label className="form-label-luxe">Scope Delivered (Service Tags)</label>
                        <input className="input-luxe" type="text" value={selectedProject.services} onChange={(e) => setSelectedProject({...selectedProject, services: e.target.value})} placeholder="e.g. Venue Styling, Hospitality, Entertainment" />
                      </div>
                    </div>
                  )}

                  {activeSection === 'gallery' && (
                    <div className="form-section-active">
                      <h3 className="section-title-modal">Visual Story (Project Gallery)</h3>
                      <div className="gallery-mgmt-box">
                        <div className={`upload-zone-luxe ${isUploading ? 'uploading' : ''}`} onClick={() => !isUploading && galleryInputRef.current.click()}>
                          {isUploading ? (
                             <div className="upload-spinner-luxe"></div>
                          ) : (
                             <FiUploadCloud className="upload-icon-large" />
                          )}
                          <div className="upload-text-content">
                            <p>{isUploading ? 'Uploading Photos...' : 'Upload Gallery Photos'}</p>
                            <span>Luxe visuals for the project carousel</span>
                          </div>
                          <input type="file" ref={galleryInputRef} style={{ display: 'none' }} multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'images', true)} />
                        </div>
                        <div className="gallery-preview-grid-modal mt-24">
                          {selectedProject.images.map((img, idx) => (
                            <div key={idx} className="gallery-thumb-admin">
                              <img src={img} alt="Project Gallery" />
                              <button type="button" onClick={() => removeArrayItem('images', idx)}><FiTrash2 /></button>
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
              <button type="submit" form="project-form" className="btn-primary" disabled={isSaving || isUploading}>
                {isSaving ? <div className="upload-spinner-luxe"></div> : null}
                <span>{isSaving ? 'Saving Case Study...' : 'Save Case Study'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OurWork;
