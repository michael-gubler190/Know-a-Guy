import { Box, Button, TextField, Typography } from "@mui/material"

function BecomeProForm() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Want to register as a professional?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        In order to be eligible, you must have all of the following information filled out.
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          columnGap: 2,
          rowGap: 2.5,
        }}
      >
        {/* Name row */}
        <TextField label="First Name" type="text" variant="outlined" fullWidth required />
        <TextField label="Last Name" type="text" variant="outlined" fullWidth required />

        {/* Account row */}
        <TextField label="Username" type="text" variant="outlined" fullWidth required />
        <TextField label="Email Address" type="email" variant="outlined" fullWidth required />

        {/* Temporary profile picture path until storage bucket is setup */}
        <TextField
          label="Profile Picture"
          type="text"
          variant="outlined"
          fullWidth
          required
          sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }}
        />

        {/* Bio */}
        <TextField
          label="Bio"
          type="text"
          variant="outlined"
          fullWidth
          required
          multiline
          minRows={4}
          maxRows={8}
          sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }}
        />

        {/* Location row */}
        <TextField label="Zip" type="text" variant="outlined" fullWidth required />
        <TextField label="City" type="text" variant="outlined" fullWidth required />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 1, py: 1.5, gridColumn: { xs: 'auto', sm: '1 / -1' } }}
        >
          Register as Professional
        </Button>
      </Box>
    </Box>
  )
}

export default BecomeProForm