import React from 'react';
import {Box, Paper} from '@mui/material';
import {styled} from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2'; // Grid2 import
import Guestbook from "./Guestbook";

const Item = styled(Paper)(({color}) => ({
    padding: '16px',
    textAlign: 'center',
    backgroundColor: color,
}));

export default function Scratch() {
    return (
        <Box sx={{flexGrow: 1, height: '100vh'}}>
            {/*Every child should say that they take up the max of the height their parent allows?*/}
            <Grid container spacing={2} sx={{height: '100%'}}>

                {/* Column 1 */}
                <Grid container xs={12} sm={6} md={3} sx={{height: '100%'}}>
                    <Grid xs={12}>
                        <Item color="lightpink">Counter</Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item color="lightyellow">Spotify</Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item color="lavender">Magic Ball</Item>
                    </Grid>
                </Grid>

                {/* Column 2 */}
                {/*this height: 100% should give fixed height, how?*/}
                <Grid xs={12} sm={6} md={4} sx={{height: '100%', overflowY: 'auto'}}>
                    <Guestbook></Guestbook>
                </Grid>

                {/* Column 3 */}
                <Grid container xs={12} md={5} sx={{height: '100%'}}>
                    <Grid xs={4}>
                        <Item color="lightseagreen">Candle 1</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item color="lightblue">Eyes</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item color="lightcoral">Candle 2</Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item color="lightgray">YouTube Component</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item color="lightgoldenrodyellow">Instagram</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item color="lavenderblush">Statue</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item color="lightskyblue">Email</Item>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
