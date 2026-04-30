import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Enquiries from './pages/Enquiries';
import OurWork from './pages/OurWork';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import HomeManagement from './pages/HomeManagement';
import GlobalSettings from './pages/GlobalSettings';
import TeamManagement from './pages/TeamManagement';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="our-work" element={<OurWork />} />
          <Route path="services" element={<Services />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="home-content" element={<HomeManagement />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="settings" element={<GlobalSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;
