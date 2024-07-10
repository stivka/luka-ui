import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid2 import
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CutoutEyes from "../components/CutoutEyes";
import Guestbook from "../components/Guestbook";
import VisitorCounter from "../components/VisitorCounter";
import useSession from '../hooks/useSession';
import { paths } from '../paths';

export default function MainApp() {
    const navigate = useNavigate();
    const { isAuthenticated } = useSession();

    if (!isAuthenticated) {
        navigate(paths.login);
    }

    return (
        <Box sx={{flexGrow: 1, height: '100vh'}}>
            {/*Every child should say that they take up the max of the height their parent allows?*/}
            <Grid container spacing={2} sx={{height: '100%'}}>

                {/* Column 1 */}
                <Grid container xs={12} sm={6} md={3} sx={{height: '100%', overflow: 'hidden'}}>
                    <Grid xs={12}>
                        <VisitorCounter />
                    </Grid>
                    <Grid xs={12}>
                        <iframe
                            title="Spotify"
                            src={"https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9"}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            allow="encrypted-media"
                        />
                    </Grid>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/gummibears.svg" alt="Magic Ball"
                             style={{width: '100%', height: 'auto', flexShrink: 0, padding: 8}}/>/>
                    </Grid>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/magicball_200x200.gif" alt="Magic Ball"/>
                    </Grid>
                </Grid>

                {/* Column 2 */}
                {/*this height: 100% should give fixed height, how?*/}
                <Grid xs={12} sm={6} md={4} sx={{height: '100%', overflowY: 'auto'}}>
                    <Guestbook />
                </Grid>

                {/* Column 3 */}
                <Grid container xs={12} md={5} sx={{height: '100%', overflow: 'hidden'}}>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CutoutEyes />
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={12}>
                        <iframe
                            title="YouTube"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            width="100%"
                            height="100%"
                            style={{ border: "none", maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                        />
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/instagram_button.svg" alt="Eyes"
                             style={{maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/smoking_greek_godess_500x500.gif" alt="Eyes"
                             style={{maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/email_button_svg.svg" alt="Eyes"
                             style={{maxWidth: '100%', maxHeight: '100%', width: '100%', height: 'auto'}}/>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}
