import React from 'react';
import Guestbook from './components/Guestbook';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, ThemeProvider} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.background.paper
            }}>
                <Box name="" sx={{flexGrow: 1}} mb={'20px'}>
                    <Grid container sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                          name="MainContentBox">
                        <Grid item xs={12} sm={8} lg={3} name="SpotifyPlayer" sx={{
                            maxHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <figure>
                                    <iframe
                                        src={`https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9`}
                                        width="100%"
                                        height="100%"
                                        style={{minHeight: '680px', overflowY: 'auto', borderRadius: 0}}
                                        allow="encrypted-media"
                                        allowFullScreen
                                        frameBorder="0"
                                        title="Spotify"
                                    ></iframe>
                                </figure>
                            </Box>
                            <img src="/magicball_200x200.gif" alt="Magic Ball"
                                 style={{width: '200px', height: '200px', flexShrink: 0, marginBottom: '16px'}}/>

                        </Grid>
                        <Grid item xs={12} sm={12} lg={4} name="GuestbookContainer" sx={{
                            maxHeight: '100vh',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img src="/guestbook_400x100.gif" alt="Guestbook Banner"
                                 style={{width: '440px', height: '120px', flexShrink: 0, marginBottom: '16px'}}/>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Guestbook/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} lg={5} name="YouTubePlayer">
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px'}}>
                                <img src="/kyynal_64x64.gif" alt="Candle"
                                     style={{width: '100px', height: '100px', flexShrink: 0}}/>
                                <img src="/newspaper_cutout_eyes.svg" alt="Eyes"
                                     style={{width: '400px', height: '200px', flexShrink: 0}}/>
                                <img src="/kyynal_64x64.gif" alt="Candle"
                                     style={{width: '100px', height: '100px', flexShrink: 0}}/>
                            </Box>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <figure
                                    style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                                        width="100%"
                                        height="100%"
                                        style={{maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9'}}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                                        frameBorder="0"
                                        title="YouTube"
                                    ></iframe>
                                </figure>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px'}}>
                                <img src="/smoking_greek_godess_500x500.gif" alt="Candle"
                                     style={{width: '500px', height: '500px', flexShrink: 0}}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box component="footer" sx={{
                    background: theme.palette.background,
                    color: 'white',
                    p: 4,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px'
                }} name="Footer">
                    <Box sx={{mx: 2}}>
                        <img
                            src="/instagram_button_svg.svg"
                            alt="Instagram"
                            style={{cursor: 'pointer', width: '200px', height: '200px'}}
                            onClick={() => window.open('https://www.instagram.com', '_blank')}
                        />
                    </Box>
                    <Box sx={{mx: 2}}>
                        <img
                            src="/email_button_svg.svg"
                            alt="Email"
                            style={{cursor: 'pointer', width: '200px', height: '200px'}}
                            onClick={() => window.location = 'mailto:your-email@example.com'}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
