import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2'; // Grid2 import

const Item = styled(Paper)(({ color }) => ({
    padding: '16px',
    textAlign: 'center',
    backgroundColor: color,
    // height: '100%', // Ensure the item takes up full height of its container
}));

export default function Scratch() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Column 1 */}
                <Grid xs={12} sm={6} md={3}>
                    <Grid container spacing={2} direction="column">
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
                </Grid>

                {/* Column 2 */}
                <Grid xs={12} sm={6} md={4}>
                    <Item color="lightcyan">Guestbook</Item>
                </Grid>

                {/* Column 3 */}
                <Grid xs={12} md={5}>
                    <Grid container spacing={2}>
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
            </Grid>
        </Box>
    );
}
