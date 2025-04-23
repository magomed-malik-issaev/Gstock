import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'

// Création d'un thème personnalisé avec Mantine
const theme = createTheme({
  colors: {
    brand: [
      '#fff0e0', // 0
      '#ffe0c0', // 1
      '#ffd0a0', // 2
      '#ffc080', // 3
      '#ffb060', // 4
      '#ffa040', // 5
      '#ff9000', // 6 - Orange principal
      '#e07000', // 7
      '#c06000', // 8
      '#a05000', // 9
    ],
    secondary: [
      '#ffe0e8', // 0
      '#ffc0d0', // 1
      '#ffa0b8', // 2
      '#ff80a0', // 3
      '#ff6088', // 4
      '#ff4070', // 5
      '#ff2058', // 6 - Rose/rouge pour les actions secondaires
      '#d01040', // 7
      '#b00020', // 8
      '#900008', // 9
    ],
  },
  primaryColor: 'brand',
  fontFamily: 'Roboto, sans-serif',
  defaultRadius: 'md',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
