import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiImage, FiSettings, FiStar, FiLayout, FiX, FiLogOut, FiUsers, FiGlobe } from 'react-icons/fi';
import '../styles/Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { path: '/dashboard/enquiries', label: 'Enquiries & Leads', icon: <FiMessageSquare /> },
  { path: '/dashboard/home-content', label: 'Home Page Content', icon: <FiLayout /> },
  { path: '/dashboard/our-work', label: 'Our Work Management', icon: <FiImage /> },
  { path: '/dashboard/services', label: 'Services Management', icon: <FiSettings /> },
  { path: '/dashboard/testimonials', label: 'Testimonials Management', icon: <FiStar /> },
  { path: '/dashboard/team', label: 'Team Management', icon: <FiUsers /> },
  { path: '/dashboard/settings', label: 'Global Settings', icon: <FiGlobe /> },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isAdminAuthenticated');
      navigate('/');
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">Admin Panel</div>
        <button className="sidebar-mobile-close" onClick={onClose} aria-label="Close menu">
          <FiX />
        </button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 1024) onClose();
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}

        <button className="nav-item logout-btn" onClick={handleLogout} style={{ marginTop: 'auto', border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
