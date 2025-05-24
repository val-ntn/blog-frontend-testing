// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Home from './pages/user/Home';
import News from './pages/user/News';
import Dashboard from './components/Admin/Dashboard';
import Calendar from './pages/user/Calendar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Footer from './components/Shared/Footer';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* Protected admin dashboard route */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
        <Footer />  
      </div>
    </Router>
  );
}

export default App;


