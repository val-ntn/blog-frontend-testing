
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Dashboard from './pages/Dashboard';

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
          </Routes>
        </div>
        <footer>
          <p>&copy; 2025 My Blog Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

