import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './theme';
import { useLocalSync } from './hooks/useLocalSync';
import Navbar from './components/Navbar';
import ProfileForm from './pages/ProfileForm';
import ProfileView from './pages/ProfileView';
import NotFound404 from './pages/NotFound404';

// Component that uses the hook
const AppContent: React.FC = () => {
  useLocalSync();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile-form" element={<ProfileForm />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;