import React from 'react';
import Guestbook from './components/Guestbook';
import EmbedSpotify from './components/EmbedSpotify';
import EmbedYouTube from './components/EmbedYouTube';
import {createTheme, ThemeProvider, Grid} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#808080',
        },
        background: {
            default: 'transparent',
        },
    },
    typography: {
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        fontSize: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    textTransform: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    marginBottom: '1em',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    marginBottom: '1em',
                    padding: '1em',
                    borderRadius: 0,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main style={{
                width: '100%',
                margin: '0',
                padding: '0',
                minHeight: '100vh', // Use full viewport height
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Grid container spacing={0} style={{ minHeight: 'calc(100vh - 1.5em)', overflow: 'hidden' }}>
                    <Grid item xs={12} md={3} style={{
                        padding: '1em',
                        display: 'flex',  // Make the grid item a flex container
                        flexDirection: 'column',  // Stack children vertically
                        justifyContent: 'center',  // Center children vertically
                        alignItems: 'center',  // Center children horizontally
                        height: '100%'  // Ensure the grid item takes up full height
                    }}>
                        <div style={{ maxWidth: '560px', width: '100%' }}>
                            <EmbedSpotify albumUrl="5VmKMLTrpNTaCjR8qxavz9" />
                            <EmbedYouTube videoUrl="dQw4w9WgXcQ" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={9} style={{ padding: '1em' }}>
                        <Guestbook />
                    </Grid>
                </Grid>
            </main>

        </ThemeProvider>
    )
        ;
}

export default App;
