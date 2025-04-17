import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<div>Page des produits</div>} />
            <Route path="/suppliers" element={<div>Page des fournisseurs</div>} />
            <Route path="/users" element={<div>Page des utilisateurs</div>} />
            <Route path="/reports" element={<div>Page des rapports</div>} />
            <Route path="/profile" element={<div>Page de profil</div>} />
            <Route path="*" element={<div>Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
