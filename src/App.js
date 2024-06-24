import React from 'react';
import Guestbook from './components/Guestbook';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, ThemeProvider} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                          name="MainContentBox">
                        <Grid xs={12} sm={8} md={6} lg={4} xl={3}>
                            <Box sx={{
                                position: 'relative',
                                width: '100%'
                            }}>
                                <figure>
                                    <iframe
                                        src={`https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9`}
                                        width="100%"
                                        height="100%"
                                        style={{minHeight: '680px', overflowY: 'auto'}}
                                        allow="encrypted-media"
                                        allowFullScreen
                                        frameBorder="0"
                                        title="Spotify"
                                    ></iframe>
                                </figure>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={8} xl={6}>
                            <Guestbook/>
                        </Grid>
                        <Grid xs={12} sm={8} md={6} lg={4} xl={3}>
                            <Box sx={{position: 'relative', width: '100%'}}>
                                <figure>
                                    <iframe
                                        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                                        width="100%"
                                        style={{aspectRatio: '16/9'}}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                                        frameBorder="0"
                                        title="YouTube"
                                    ></iframe>
                                </figure>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box component="footer" sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 2,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{mx: 1}}>
                        <InstagramIcon sx={{cursor: 'pointer'}}
                                       onClick={() => window.open('https://www.instagram.com', '_blank')}/>
                    </Box>
                    <Box sx={{mx: 1}}>
                        <EmailIcon sx={{cursor: 'pointer'}}
                                   onClick={() => window.location = 'mailto:your-email@example.com'}/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
