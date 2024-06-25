import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const VisitorCounter = () => {
    const [count, setCount] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log("Fetching visitor count from:", `${apiUrl}/visitor-count`);

        fetch(`${apiUrl}/visitor-count`)
            .then(response => response.text())
            .then(data => {
                setCount(Number(data));
            })
            .catch(error => {
            });

        fetch(`${apiUrl}/visitor-count/increment`, {
            method: 'POST',
        })
            .then(response => response.text())
            .then(data => {
                setCount(Number(data));
            })
            .catch(error => {
            });
    }, [apiUrl]);

    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: theme.palette.spotifyLightGrey.main,
            color: 'white',
            borderRadius: 0,
            boxShadow: 0,
            textAlign: 'center'
        }}>
            <Typography variant="h5">Visitor Count: {count}</Typography>
        </Box>
    );
};

export default VisitorCounter;
