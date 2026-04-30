import { useState, useEffect } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCamera, FiLink } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import '../styles/TeamManagement.css';

function TeamManagement() {
  useDocumentTitle('Team Management')
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    order: 0,
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: uploadData
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Network error during upload');
    } finally {
      setIsUploading(false);
    }
  };


  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/team/admin`);
      const data = await response.json();
      if (data.success) {
        setTeam(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingMember 
      ? `${API_BASE_URL}/team/${editingMember._id}` 
      : `${API_BASE_URL}/team`;
    
    const method = editingMember ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        fetchTeam();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/team/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchTeam();
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio || '',
        order: member.order || 0,
        socialLinks: {
          facebook: member.socialLinks?.facebook || '',
          instagram: member.socialLinks?.instagram || '',
          linkedin: member.socialLinks?.linkedin || ''
        }
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        image: '',
        bio: '',
        order: team.length,
        socialLinks: { facebook: '', instagram: '', linkedin: '' }
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  if (loading) return <div className="loading-state-luxe">Loading team...</div>;

  return (
    <div className="team-management-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Management</h1>
          <p className="page-subtitle">Manage the experts behind Event Foundation</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <FiPlus /> Add New Member
        </button>
      </div>

      <div className="team-grid-admin">
        {team.map((member) => (
          <div key={member._id} className="team-card-admin luxe-card">
            <div className="member-image-admin">
              <img src={member.image} alt={member.name} />
              <div className="member-actions-overlay">
                <button onClick={() => openModal(member)} className="action-btn edit"><FiEdit2 /></button>
                <button onClick={() => handleDelete(member._id)} className="action-btn delete"><FiTrash2 /></button>
              </div>
            </div>
            <div className="member-info-admin">
              <h3>{member.name}</h3>
              <p className="member-role-admin">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay-luxe">
          <div className="modal-content-luxe team-modal-premium">
            <div className="modal-header-luxe">
              <div className="header-text-group">
                <h2>{editingMember ? 'Refine Profile' : 'New Team Member'}</h2>
                <p>Configure the profile details for the About Us page</p>
              </div>
              <button className="close-modal" onClick={closeModal}><FiX /></button>
            </div>
            
            <div className="modal-body-split">
              <form onSubmit={handleSubmit} className="team-form-luxe-new">
                <div className="form-section-luxe">
                  <h4 className="form-section-title">Identity & Role</h4>
                  <div className="form-row-luxe">
                    <div className="form-group-luxe">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        className="input-luxe-new" 
                        required 
                        placeholder="e.g. Julianne Moore"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group-luxe">
                      <label>Designation</label>
                      <input 
                        type="text" 
                        className="input-luxe-new" 
                        required 
                        placeholder="e.g. Lead Planner"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section-luxe">
                  <h4 className="form-section-title">Visual Presence</h4>
                  <div className="form-group-luxe">
                    <label>Member Profile Photo</label>
                    <div className="image-upload-wrapper-new">
                      <input 
                        type="file" 
                        id="member-photo-upload"
                        className="hidden-file-input" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="member-photo-upload" className="upload-trigger-btn-luxe">
                        <FiCamera /> {isUploading ? 'Uploading to Cloudinary...' : 'Upload Local Photo'}
                      </label>
                      {formData.image && <span className="upload-success-tag">✓ Image Linked</span>}
                    </div>
                  </div>
                </div>


                <div className="form-section-luxe">
                  <h4 className="form-section-title">Professional Bio</h4>
                  <div className="form-group-luxe">
                    <textarea 
                      className="input-luxe-new textarea-luxe" 
                      rows="3"
                      placeholder="A short sentence about their expertise..."
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="form-section-luxe">
                  <h4 className="form-section-title">Social Connect</h4>
                  <div className="form-row-luxe">
                    <div className="form-group-luxe">
                      <label>Instagram URL</label>
                      <div className="input-with-icon-new">
                        <FiLink className="input-icon" />
                        <input 
                          type="url" 
                          className="input-luxe-new" 
                          placeholder="https://instagram.com/..."
                          value={formData.socialLinks.instagram}
                          onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})}
                        />
                      </div>
                    </div>
                    <div className="form-group-luxe">
                      <label>LinkedIn URL</label>
                      <div className="input-with-icon-new">
                        <FiLink className="input-icon" />
                        <input 
                          type="url" 
                          className="input-luxe-new" 
                          placeholder="https://linkedin.com/in/..."
                          value={formData.socialLinks.linkedin}
                          onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer-luxe-new">
                  <button type="button" className="btn-ghost" onClick={closeModal}>Discard</button>
                  <button type="submit" className="btn-primary-luxe"><FiSave /> {editingMember ? 'Update Profile' : 'Add to Team'}</button>
                </div>
              </form>

              <div className="modal-preview-side">
                <span className="preview-label">Live Preview</span>
                <div className="preview-card-container">
                  <div className="team-card-admin luxe-card preview-mode">
                    <div className="member-image-admin">
                      <img src={formData.image || 'https://via.placeholder.com/400?text=Profile+Image'} alt="Preview" />
                    </div>
                    <div className="member-info-admin">
                      <h3>{formData.name || 'Member Name'}</h3>
                      <p className="member-role-admin">{formData.role || 'Designation'}</p>
                    </div>
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

export default TeamManagement;
