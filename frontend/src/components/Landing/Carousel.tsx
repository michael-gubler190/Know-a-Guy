import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const images = [
  "https://b3355843.assetcdn.net/2.0/3355843/wp-content/uploads/2024/11/plumber-fixing-leak-in-kitchen-sink.jpg?lossy=2&strip=1&webp=1",
  "https://mccoymart.com/post/wp-content/uploads/The-Top-10-Benefits-Of-Hiring-A-Professional-Carpenter.jpg",
  "https://cdn.prod.website-files.com/6425bd7cd9d244e41b0ce939/67c8a027ddc2711c0e6c2bd0_Why%20Trustworthy%20Roofers%20Are%20Hard%20To%20Find%20Graphic.jpg",
  "https://laplanteelectric.com/wp-content/uploads/2025/07/When-Should-You-Call-an-Electrician-Rather-Than-DIY-It.jpg",
  "https://www.junkluggers.com/img/upload/junk-lugging-40_edit2-1.jpg"
];

const INTERVAL_MS = 5000;
const FADE_MS = 1200;
const ZOOM_MS = INTERVAL_MS + FADE_MS;
const ZOOM_SCALE = 1.08;

export default function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const [loaded, setLoaded] = useState(() => images.map(() => false));
  const maxSteps = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;

      const next = [...prev];
      next[index] = true;

      return next;
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'grey.900',
      }}
    >
      {images.map((src, index) => {
        const isActive = index === activeStep;
        const isReady = loaded[index];
        const show = isActive && isReady;

        return (
          <Box
            key={src}
            component="img"
            src={src}
            alt={`Slide ${index + 1}`}
            onLoad={() => handleLoad(index)}
            sx={{
              position: 'absolute',
              inset: 0,
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              opacity: show ? 1 : 0,
              transform: show ? `scale(${ZOOM_SCALE})` : 'scale(1)',
              transformOrigin: 'center center',
              
              transition: show
                ? `opacity ${FADE_MS}ms ease-in-out, transform ${ZOOM_MS}ms linear`
                : `opacity ${FADE_MS}ms ease-in-out, transform 0s linear ${FADE_MS}ms`,

              willChange: 'opacity, transform',
              '@media (prefers-reduced-motion: reduce)': {
                transform: 'none',
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              },
            }}
          />
        );
      })}
    </Box>
  );
}