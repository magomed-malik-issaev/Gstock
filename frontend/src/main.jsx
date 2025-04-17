import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'

// Création d'un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu principal
    },
    secondary: {
      main: '#f50057', // Rose/rouge pour les actions secondaires
    },
    background: {
      default: '#f5f5f5', // Fond gris clair
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS pour une apparence cohérente */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
