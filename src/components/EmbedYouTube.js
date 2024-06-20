import React from 'react';
import {Box} from '@mui/material';

const EmbedYouTube = ({videoUrl}) => {
    return (
        <Box>
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
