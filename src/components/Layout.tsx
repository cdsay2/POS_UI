import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontSize: 11,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '0.775rem',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              fontSize: '0.775rem',
            },
          },
        },
      },

    MuiList:{
        styleOverrides: {
          root: {
            '& .MuiLuis-pading': {
              zIndex:1600,
            },
          },
      },
      },
      
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Topbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
          <main style={{ flexGrow: 1, overflow: 'auto', padding: '20px', position: 'relative' }}>
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;