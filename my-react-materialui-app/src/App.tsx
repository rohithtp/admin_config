import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Box, Typography, Button, Container, Paper, Divider } from '@mui/material';
import theme from './theme/theme';
import ExampleComponent from './components/ExampleComponent';
import TreeTablePage from './components/TreeTablePage';
import { ThemeProvider } from '@mui/material/styles';

const LandingPage: React.FC = () => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Welcome to My React Material UI App
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box mb={3}>
        <ExampleComponent />
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/tree-table"
        sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
      >
        Go to Tree Table Page
      </Button>
    </Paper>
  </Container>
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