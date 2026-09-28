import type { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const iconProps = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const features: Feature[] = [
  {
    title: 'Pros you can trust',
    description:
      'Every pro on Know-a-Guy is background-checked, and you can read honest reviews from your neighbors before you hire anyone.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Know the price upfront',
    description:
      'Describe your project and get quotes from local pros, so you can compare costs and skip the surprises.',
    icon: (
      <svg {...iconProps}>
        <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
        <circle cx="7.5" cy="7.5" r="1.25" />
      </svg>
    ),
  },
  {
    title: 'Get it done your way',
    description:
      'Message pros, ask questions, and book the one who fits your schedule and budget, all in one place.',
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
        <path d="M9.5 15l2 2 3.5-3.5" />
      </svg>
    ),
  },
];

export default function WhyCustomersLove() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          component="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            fontSize: { xs: '1.9rem', md: '2.5rem' },
            textAlign: 'center',
            mb: { xs: 5, md: 8 },
          }}
        >
          Why customers love Know-a-Guy
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {features.map(({ title, description, icon }) => (
            <Box
              key={title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
                textAlign: { xs: 'left', md: 'center' },
              }}
            >
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  mb: 3,
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                })}
              >
                {icon}
              </Box>

              <Typography
                component="h3"
                sx={{ fontWeight: 700, fontSize: '1.35rem', lineHeight: 1.3, mb: 1.25 }}
              >
                {title}
              </Typography>

              <Typography
                sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 340 }}
              >
                {description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}