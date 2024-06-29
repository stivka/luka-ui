import React, { useEffect, useRef, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'

const getEyeAngle = (cx, cy, ex, ey) => {
  const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * (180 / Math.PI);
    return deg;
}

export default function CutoutEyes() {
  const faceRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [angleDeg, setAngleDeg] = useState(0);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  const rekt = faceRef.current?.getBoundingClientRect();
  const faceX = rekt ? rekt.x + rekt.width / 2 : 0;
  const faceY = rekt ? rekt.y + rekt.height / 2 : 0;

    useEffect(() => {
      if (isMobile || !faceRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

      const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const deg = getEyeAngle(faceX, faceY, mouseX, mouseY);
        setAngleDeg(deg);
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile, faceX, faceY]);
  
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minWidth: '100vw', minHeight: '100vh', position: 'relative' }}>
        <img src="/cutout-eyes.png" alt="Eyes" ref={faceRef} />
        {!isMobile && (
        <Box sx={{ position: 'absolute' }}>
          <img
            src="/eye.png"
            alt="Eye" 
            style={{ 
              position: 'absolute', 
              left: -58, 
              top: -5,  
              transform: `rotate(${angleDeg}deg)` 
            }}
            ref={leftEyeRef} 
          />
          <img 
            src="/eye.png"
            alt="Eye" 
            style={{ 
              position: 'absolute', 
              left: 89, 
              top: -7, 
              transform: `rotate(${angleDeg}deg)` 
            }}
            ref={rightEyeRef}
          />
        </Box>
        )}
      </Box>
    );
}
