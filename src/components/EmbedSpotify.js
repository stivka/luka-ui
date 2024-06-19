import React from 'react';
import { Box } from '@mui/material';

const EmbedSpotify = ({ albumUrl }) => {
    return (
        <Box sx={{ my: 4 }}>
            <iframe
                src={`https://open.spotify.com/embed/album/${albumUrl}`}
                width="300"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
                title="Spotify"
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            ></iframe>
        </Box>
    );
};

export default EmbedSpotify;
