import React from 'react';
import { Box } from '@mui/material';

const EmbedYouTube = ({ videoUrl }) => {
    return (
        <Box sx={{
            my: 4,
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '56.25%', // Aspect ratio for 16:9
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoUrl}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                }}
            ></iframe>
        </Box>
    );
};

export default EmbedYouTube;
