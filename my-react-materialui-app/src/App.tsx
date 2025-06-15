import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import ExampleComponent from './components/ExampleComponent';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <h1>Welcome to My React Material UI App</h1>
                <ExampleComponent />
            </div>
        </ThemeProvider>
    );
};

export default App;