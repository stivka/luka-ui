import React from 'react';
import Guestbook from './components/Guestbook';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, ThemeProvider } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} name="MainContentBox">
                        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                            <Box sx={{
                                position: 'relative',
                                width: '100%'
                            }}>
                                <iframe
                                    src={`https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9`}
                                    width="100%"
                                    height="680px" // specific height so that all songs are displayed
                                    allow="encrypted-media"
                                    allowFullScreen
                                    title="Spotify"
                                ></iframe>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={8} xl={6}>
                            <Guestbook />
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                            <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                                    title="YouTube"
                                ></iframe>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ mx: 1 }}>
                        <InstagramIcon sx={{ cursor: 'pointer' }} onClick={() => window.open('https://www.instagram.com', '_blank')} />
                    </Box>
                    <Box sx={{ mx: 1 }}>
                        <EmailIcon sx={{ cursor: 'pointer' }} onClick={() => window.location = 'mailto:your-email@example.com'} />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
