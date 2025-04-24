import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminLayout from './components/AdminLayout';
import './App.css';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

// Composant pour vérifier l'authentification
function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement de l'application
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Page de connexion (accessible uniquement si non connecté) */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Routes protégées avec le layout Admin */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="stocks" element={<div>Page de gestion des stocks (à implémenter)</div>} />
          <Route path="suppliers" element={<div>Page des fournisseurs (à implémenter)</div>} />
          <Route path="users" element={<UsersPage />} />
          <Route path="alerts" element={<div>Page des alertes (à implémenter)</div>} />
          <Route path="reports" element={<div>Page des rapports (à implémenter)</div>} />
          <Route path="settings" element={<div>Page des paramètres (à implémenter)</div>} />
          <Route path="profile" element={<div>Page de profil (à implémenter)</div>} />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
