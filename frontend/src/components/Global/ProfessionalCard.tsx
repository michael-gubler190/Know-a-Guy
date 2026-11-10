import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import {
  blue,
  deepPurple,
  green,
  indigo,
  orange,
  pink,
  red,
  teal,
} from "@mui/material/colors";
import type { Professional } from "../../models/users/Professional";


const HEADER_COLORS: string[] = [
  indigo[600],
  teal[700],
  deepPurple[500],
  pink[600],
  orange[800],
  green[700],
  blue[700],
  red[600],
];

function colorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return HEADER_COLORS[hash % HEADER_COLORS.length];
}

export default function ProfessionalCard({
  proId,
  firstName,
  lastName,
  profilePicturePath,
  bio,
  username,
  city,
  zip,
}: Professional) {
  const fullName = `${firstName} ${lastName}`;
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: 8,
          zIndex: 1,
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          bgcolor: colorFromId(String(proId)),
        }}
      >
        <Avatar
          src={profilePicturePath || undefined}
          alt={fullName}
          sx={{
            width: 72,
            height: 72,
            flexShrink: 0,
            fontSize: "1.5rem",
            border: "2px solid",
            borderColor: "common.white",
            bgcolor: "rgba(255, 255, 255, 0.25)",
            color: "common.white",
          }}
        >
          {initials}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" component="h3" noWrap sx={{ color: "common.white" }}>
            {fullName}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: "rgba(255, 255, 255, 0.85)" }}>
            @{username}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }} gutterBottom>
          {city}, {zip}
        </Typography>

        {bio && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}