import { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../styles/Login.css';

function Login() {
  useDocumentTitle('Login')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError(data.error || 'Credentials are wrong');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="login-container-luxe">
      <div className="login-visual-panel">
        <div className="visual-overlay" />
        <div className="visual-content">
          <h1>Event Foundation</h1>
          <p>The Planning House of Signature Celebrations</p>
        </div>
      </div>
      <div className="login-form-panel">
        <div className="login-box-luxe">
          <div className="login-header-luxe">
            <h2 className="login-title-luxe">Welcome Back</h2>
            <p className="login-subtitle-luxe">Access your management dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="login-form-luxe">
            {error && <div className="login-error-msg">{error}</div>}
            <div className="form-group-luxe">
              <label className="form-label-luxe">Email Address</label>
              <input 
                type="email" 
                className="input-luxe" 
                placeholder="event@management.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group-luxe">
              <label className="form-label-luxe">Password</label>
              <input 
                type="password" 
                className="input-luxe" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary-luxe" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
            </button>
            <p className="login-footer-luxe">
              © 2026 Event Foundation. All Rights Reserved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

