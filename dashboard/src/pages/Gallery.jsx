import { useState } from 'react';
import { FiTrash2, FiX, FiUploadCloud, FiEdit } from 'react-icons/fi';
import '../styles/Gallery.css';

// Dummy data for projects
const initialProjects = [
  {
    id: 1,
    title: 'The Royal Heritage Wedding',
    category: 'Wedding',
    year: '2025',
    location: 'Taj Lake Palace, Udaipur',
    summary: 'A breathtaking three-day celebration blending traditional Rajasthani culture with modern luxury.',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    innerImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500'
    ]
  },
  {
    id: 2,
    title: 'Global Tech Summit 2024',
    category: 'Corporate',
    year: '2024',
    location: 'Jio World Centre, Mumbai',
    summary: 'An immersive corporate experience for 2000+ delegates with cutting-edge stage design.',
    coverImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800',
    innerImages: []
  }
];

function Gallery() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project = null) => {
    setSelectedProject(project || {
      id: Date.now(),
      title: '',
      category: 'Wedding',
      year: new Date().getFullYear().toString(),
      location: '',
      summary: '',
      coverImage: '',
      innerImages: []
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (projects.find(p => p.id === selectedProject.id)) {
      setProjects(projects.map(p => p.id === selectedProject.id ? selectedProject : p));
    } else {
      setProjects([...projects, selectedProject]);
    }
    handleCloseModal();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="gallery-management-container">
      <div className="page-header">
        <h1 className="page-title">Our Work (Projects) Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>+ Add New Project</button>
      </div>

      <div className="gallery-grid">
        {projects.map((project) => (
          <div key={project.id} className="gallery-card" onClick={() => handleOpenModal(project)}>
            <img src={project.coverImage || 'https://placehold.co/800x400?text=No+Cover'} alt={project.title} className="gallery-img" />
            <div className="gallery-info">
              <div>
                <div className="gallery-category">{project.category}</div>
                <div className="gallery-title">{project.title || 'Untitled Project'}</div>
                <div className="gallery-meta">{project.year} • {project.innerImages.length} Photos</div>
              </div>
              <button 
                className="btn-icon" 
                title="Delete Project" 
                onClick={(e) => handleDelete(e, project.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.title ? 'Edit Project' : 'New Project'}</h2>
              <button className="btn-close" onClick={handleCloseModal}><FiX /></button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Project Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required
                      value={selectedProject.title}
                      onChange={(e) => setSelectedProject({...selectedProject, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-select"
                      value={selectedProject.category}
                      onChange={(e) => setSelectedProject({...selectedProject, category: e.target.value})}
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Social Events">Social Events</option>
                      <option value="Destination">Destination</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={selectedProject.year}
                      onChange={(e) => setSelectedProject({...selectedProject, year: e.target.value})}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={selectedProject.location}
                      onChange={(e) => setSelectedProject({...selectedProject, location: e.target.value})}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Summary</label>
                    <textarea 
                      className="form-control form-textarea" 
                      value={selectedProject.summary}
                      onChange={(e) => setSelectedProject({...selectedProject, summary: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Cover Image URL</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      value={selectedProject.coverImage}
                      onChange={(e) => setSelectedProject({...selectedProject, coverImage: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="project-images-section">
                  <div className="project-images-header">
                    <h3>Project Gallery Images</h3>
                    <span className="gallery-meta">{selectedProject.innerImages.length} images</span>
                  </div>
                  
                  <div className="image-upload-area" onClick={() => {
                    const url = prompt("Enter image URL to add to this project's gallery:");
                    if (url) {
                      setSelectedProject({
                        ...selectedProject, 
                        innerImages: [...selectedProject.innerImages, url]
                      });
                    }
                  }}>
                    <div className="image-upload-icon"><FiUploadCloud /></div>
                    <p>Click to upload photos to this specific project</p>
                  </div>

                  <div className="project-images-grid">
                    {selectedProject.innerImages.map((imgUrl, idx) => (
                      <div key={idx} className="project-image-item">
                        <img src={imgUrl} alt="Project Inner" />
                        <button 
                          type="button"
                          className="project-image-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject({
                              ...selectedProject,
                              innerImages: selectedProject.innerImages.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn-primary">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
