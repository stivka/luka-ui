import React from 'react';
import {Box} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid2 import
import Guestbook from "./Guestbook";
import VisitorCounter from "./VisitorCounter";
import CutoutEyes from "./CutoutEyes";

export default function MainApp() {
    return (
        <Box sx={{flexGrow: 1, height: '100vh'}}>
            {/*Every child should say that they take up the max of the height their parent allows?*/}
            <Grid container spacing={2} sx={{height: '100%'}}>

                {/* Column 1 */}
                <Grid container xs={12} sm={6} md={3} sx={{height: '100%', overflow: 'hidden'}}>
                    <Grid xs={12}>
                        <VisitorCounter></VisitorCounter>
                    </Grid>
                    <Grid xs={12}>
                        <iframe
                            src={`https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9`}
                            width="100%"
                            height="100%"
                            allow="encrypted-media"
                            frameBorder="0"
                            title="Spotify"
                        ></iframe>
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
                    <Guestbook></Guestbook>
                </Grid>

                {/* Column 3 */}
                <Grid container xs={12} md={5} sx={{height: '100%', overflow: 'hidden'}}>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {/* <img src="/newspaper_cutout_eyes.svg" alt="Eyes"
                             style={{maxWidth: '100%', maxHeight: '100%', width: '100%', height: 'auto'}}/> */}
                        <CutoutEyes />
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={12}>
                        <iframe
                            src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
                            width="100%"
                            height="100%"
                            style={{maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                            frameBorder="0"
                            title="YouTube"
                        ></iframe>
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
