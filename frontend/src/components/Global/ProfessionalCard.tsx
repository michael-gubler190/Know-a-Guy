import { Avatar, Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Professional } from "../../models/users/Professional";
import { useNavigate } from "react-router";
import { colorFromId } from "../../utils";

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
  const navigate = useNavigate();

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
          cursor: "pointer"
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/professional/${proId}`)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
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
      </CardActionArea>
    </Card>
  );
}