import React from 'react';
import { Box } from '@mui/material';

const EmbedYouTube = ({ videoUrl }) => {
    return (
        <Box sx={{ my: 4 }}>
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoUrl}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube"
                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            ></iframe>
        </Box>
    );
};

export default EmbedYouTube;
