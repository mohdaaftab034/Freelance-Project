import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/Topbar.css';

function Topbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          <FiMenu />
        </button>
      </div>
      <div className="topbar-right">
        <div className="topbar-user">
          <FiUser />
          <span className="user-name">Admin User</span>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <FiLogOut />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;

