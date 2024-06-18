import React from 'react';
import Guestbook from './components/Guestbook';
import EmbedSpotify from './components/EmbedSpotify';
import EmbedYouTube from './components/EmbedYouTube';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0078d7',
        },
        background: {
            default: '#e0e0e0',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    textTransform: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    marginBottom: '1em',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    marginBottom: '1em',
                    padding: '1em',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <header style={{ backgroundColor: '#0078d7', color: 'white', textAlign: 'center', padding: '1em', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <h1>Welcome to Luka UI</h1>
            </header>
            <main style={{ backgroundColor: 'white', padding: '2em', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '800px', margin: '2em auto', textAlign: 'center' }}>
                <Guestbook />
                <EmbedSpotify trackUrl="7ouMYWpwJ422jRcDASZB7P" />
                <EmbedYouTube videoUrl="dQw4w9WgXcQ" />
            </main>
            <footer style={{ marginTop: '2em', fontSize: '0.8em', color: '#777', textAlign: 'center' }}>
                <p>&copy; 2024 Stivka. All rights reserved.</p>
            </footer>
        </ThemeProvider>
    );
}

export default App;
