import { useState } from 'react';
import { Box, Button, Chip, Container, InputBase, Stack, Typography } from '@mui/material';
import { LocationPin, SearchOutlined } from '@mui/icons-material';

const popularServices = ['Plumbing', 'Carpentry', 'Roofing', 'Electrical', 'Painting'];

interface HeroProps {
  onSearch?: (query: string, zip: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearch?.(query.trim(), zip.trim());
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.65) 100%)',
        color: '#fff',
        pt: { xs: 9, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
            textShadow: '0 2px 16px rgba(0,0,0,0.35)',
            maxWidth: 720,
          }}
        >
          Have a problem? We know a guy!
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: '1.05rem', md: '1.25rem' },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 560,
          }}
        >
          Compare plumbers, carpenters, roofers and more near you, then hire the one you trust.
        </Typography>

        {/* Search bar */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          role="search"
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            bgcolor: '#fff',
            color: 'text.primary',
            borderRadius: { xs: 3, sm: 2 },
            p: 0.75,
            gap: { xs: 0.5, sm: 0 },
            maxWidth: 760,
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: 'center', flex: 1, px: 1.75, py: 1 }}
          >
            <Box sx={{ display: 'flex', color: 'text.secondary' }}>
              <SearchOutlined />
            </Box>
            <InputBase
              fullWidth
              placeholder="What do you need help with?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'Service' }}
              sx={{ fontSize: '1.05rem' }}
            />
          </Stack>

          <Box
            sx={{
              width: { xs: 'auto', sm: '1px' },
              height: { xs: '1px', sm: 32 },
              bgcolor: 'divider',
              mx: { xs: 1.75, sm: 0 },
            }}
          />

          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: 'center', width: { xs: 'auto', sm: 190 }, px: 1.75, py: 1 }}
          >
            <Box sx={{ display: 'flex', color: 'text.secondary' }}>
              <LocationPin />
            </Box>
            <InputBase
              fullWidth
              placeholder="Zip code"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputProps={{ 'aria-label': 'Zip code', inputMode: 'numeric' }}
              sx={{ fontSize: '1.05rem' }}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            sx={{
              px: 4,
              py: 1.5,
              ml: { sm: 0.5 },
              borderRadius: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1.05rem',
            }}
          >
            Search
          </Button>
        </Box>

        {/* Popular services */}
        <Stack direction="row" useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mt: 2.5 }}>
          {popularServices.map((service) => (
            <Chip
              key={service}
              label={service}
              clickable
              onClick={() => setQuery(service)}
              sx={{
                color: '#fff',
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.28)' },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}