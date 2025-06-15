import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import ExampleComponent from './components/ExampleComponent';
import TreeTablePage from './components/TreeTablePage';
import { ThemeProvider } from '@mui/material/styles';

const LandingPage: React.FC = () => (
  <div>
    <h1>Welcome to My React Material UI App</h1>
    <ExampleComponent />
    <Link to="/tree-table">Go to Tree Table Page</Link>
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tree-table" element={<TreeTablePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;