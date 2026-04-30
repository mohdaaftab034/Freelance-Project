import { useState, useEffect } from 'react';
import { FiSave, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiPhone, FiMail, FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
import '../styles/GlobalSettings.css';

function GlobalSettings() {
  const [settings, setSettings] = useState({
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      whatsapp: ''
    },
    contactDetails: {
      phonePrimary: '',
      phoneSecondary: '',
      email: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`);
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update settings.' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="loading-state-luxe">Loading settings...</div>;

  return (
    <div className="global-settings-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Global Settings</h1>
          <p className="page-subtitle">Manage your brand presence and contact accessibility</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="settings-form-luxe">
        <div className="settings-grid">
          {/* Social Links Section */}
          <div className="settings-card luxe-card">
            <h3 className="card-title-luxe"><FiMessageCircle /> Social Media Presence</h3>
            <div className="form-stack">
              <div className="input-with-icon">
                <FiFacebook className="input-icon" />
                <input 
                  type="url" 
                  className="input-luxe" 
                  placeholder="Facebook URL" 
                  value={settings.socialLinks.facebook}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: e.target.value}})}
                />
              </div>
              <div className="input-with-icon">
                <FiInstagram className="input-icon" />
                <input 
                  type="url" 
                  className="input-luxe" 
                  placeholder="Instagram URL" 
                  value={settings.socialLinks.instagram}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                />
              </div>
              <div className="input-with-icon">
                <FiTwitter className="input-icon" />
                <input 
                  type="url" 
                  className="input-luxe" 
                  placeholder="Twitter URL" 
                  value={settings.socialLinks.twitter}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: e.target.value}})}
                />
              </div>
              <div className="input-with-icon">
                <FiLinkedin className="input-icon" />
                <input 
                  type="url" 
                  className="input-luxe" 
                  placeholder="LinkedIn URL" 
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, linkedin: e.target.value}})}
                />
              </div>
              <div className="input-with-icon">
                <FiYoutube className="input-icon" />
                <input 
                  type="url" 
                  className="input-luxe" 
                  placeholder="YouTube URL" 
                  value={settings.socialLinks.youtube}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, youtube: e.target.value}})}
                />
              </div>
              <div className="input-with-icon">
                <FiMessageCircle className="input-icon" />
                <input 
                  type="text" 
                  className="input-luxe" 
                  placeholder="WhatsApp Number (with country code)" 
                  value={settings.socialLinks.whatsapp}
                  onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, whatsapp: e.target.value}})}
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="settings-card luxe-card">
            <h3 className="card-title-luxe"><FiPhone /> Business Contact Details</h3>
            <div className="form-stack">
              <div className="form-group">
                <label className="label-luxe">Primary Phone</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input 
                    type="text" 
                    className="input-luxe" 
                    value={settings.contactDetails.phonePrimary}
                    onChange={(e) => setSettings({...settings, contactDetails: {...settings.contactDetails, phonePrimary: e.target.value}})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label-luxe">Secondary Phone</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input 
                    type="text" 
                    className="input-luxe" 
                    value={settings.contactDetails.phoneSecondary}
                    onChange={(e) => setSettings({...settings, contactDetails: {...settings.contactDetails, phoneSecondary: e.target.value}})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label-luxe">Business Email</label>
                <div className="input-with-icon">
                  <FiMail className="input-icon" />
                  <input 
                    type="email" 
                    className="input-luxe" 
                    value={settings.contactDetails.email}
                    onChange={(e) => setSettings({...settings, contactDetails: {...settings.contactDetails, email: e.target.value}})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label-luxe">Office Address</label>
                <div className="input-with-icon" style={{ alignItems: 'flex-start' }}>
                  <FiMapPin className="input-icon" style={{ marginTop: '12px' }} />
                  <textarea 
                    className="input-luxe textarea-luxe" 
                    rows="4"
                    value={settings.contactDetails.address}
                    onChange={(e) => setSettings({...settings, contactDetails: {...settings.contactDetails, address: e.target.value}})}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer-luxe">
          <button type="submit" className="btn-primary" disabled={isSaving}>
            <FiSave /> {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GlobalSettings;
