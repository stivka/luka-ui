import { Box, Unstable_Grid2 as Grid, useMediaQuery } from '@mui/material';
import CutoutEyes from "../components/CutoutEyes";
import EmailButton from "../components/EmailButton";
import Guestbook from "../components/Guestbook";
import VisitorCounter from "../components/VisitorCounter";
import useEnsureSession from '../hooks/useEnsureSession';

export default function MainApp() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

    useEnsureSession();

    return (
        <Box sx={{ flexGrow: 1, height: { xs: '100%', md: '100vh' }}}>
            {/*Every child should say that they take up the max of the height their parent allows?*/}
            <Grid container spacing={2} sx={{height: '100%'}}>

                {/* Column 1 */}
                <Grid container xs={12} sm={6} md={3} sx={{height: '100%', overflow: 'auto'}}>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'left',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            maxWidth: '260px',
                            maxHeight: '100px',
                            marginTop: '20px'
                        }}>
                            <VisitorCounter/>
                        </Box>
                    </Grid>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '760px' }}>
                        <iframe
                            title="Spotify"
                            src={"https://open.spotify.com/embed/album/5VmKMLTrpNTaCjR8qxavz9"}
                            width="100%"
                            height="100%"
                            style={{ border: "none", margin: '80px', justifyContent: 'center', alignItems: 'center' }}
                            allow="encrypted-media"
                        />
                    </Grid>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/images/gummibears.svg" alt="Magic Ball"
                             style={{width: '100%', height: 'auto', flexShrink: 0, padding: 8, marginLeft: 26}}/>/>
                    </Grid>
                    <Grid xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-20px'}}>
                        <img src="/images/magicball_200x200.gif" alt="Magic Ball"/>
                    </Grid>
                </Grid>

                {/* Column 2 */}
                {/*this height: 100% should give fixed height, how?*/}
                <Grid xs={12} sm={6} md={4} sx={{height: '100%', overflowY: 'auto'}}>
                    <Guestbook />
                </Grid>

                {/* Column 3 */}
                <Grid container xs={12} md={5} sx={{height: '100%', overflow: 'auto'}}>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/images/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CutoutEyes />
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="/images/kyynal_299x500.gif" alt="Candle1"
                             style={{maxWidth: '100px', maxHeight: '100px', width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid xs={12}>
                        <iframe
                            title="YouTube"
                            src="https://www.youtube.com/embed/sCVycaNFAKU?autoplay=1"
                            width="100%"
                            height="100%"
                            style={{ border: "none", maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9'}}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                        />
                    </Grid>
                        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <a href="https://instagram.com/hausvonstarkiller" target="_blank" rel="noopener noreferrer">
                                <img src="/images/instagram_button.svg" alt="Instagram button" style={{ width: '100%', height: 'auto' }}/>
                            </a>
                        </Grid>
                        <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="/images/smoking_greek_godess_500x500.gif" alt="Smoking Greek Goddess" style={{width: '100%', height: 'auto'}}/>

                        </Grid>
                        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <EmailButton/>
                        </Grid>
                </Grid>
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
                <Box sx={{ width: { xs: '60%', md: 160 }, height: 'auto', position: { xs: 'auto', md: 'absolute' }, right: 0, overflowY: 'clip', }}>
                    <img src="/images/megahurtz.svg" alt="MegaHurtz" style={{ marginBottom: isMobile ? -32 : -24, width: '100%', height: 'auto' }}/>
                </Box>
            </Box>
        </Box>
    );
}
