import type { CSSProperties } from "react";
import { Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import "../styles/loadingScreen.css";

interface LoadingScreenProps {
  label?: string;
  fullScreen?: boolean;
  delayMs?: number;
}

export default function LoadingScreen({label = "Loading", fullScreen = true, delayMs = 0}: LoadingScreenProps) {
  const theme = useTheme();

  // Hand the MUI theme to the stylesheet as CSS variables
  const themeVars = {
    "--ls-primary": theme.palette.primary.main,
    "--ls-primary-soft": alpha(theme.palette.primary.main, 0.14),
    "--ls-primary-track": alpha(theme.palette.primary.main, 0.15),
    "--ls-bg": theme.palette.background.default,
    "--ls-text": theme.palette.text.primary,
    "--ls-font": theme.typography.fontFamily,
    "--ls-delay": `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div
      className={`loading-screen${fullScreen ? " loading-screen--fullscreen" : ""}`}
      style={themeVars}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-screen__signal" aria-hidden="true">
        <span className="loading-screen__ring" />
        <span className="loading-screen__ring" />
        <span className="loading-screen__ring" />
        <span className="loading-screen__core" />
      </div>

      <Typography variant="h6" component="p" className="loading-screen__label">
        {label}
        <span className="loading-screen__dot" aria-hidden="true">.</span>
        <span className="loading-screen__dot" aria-hidden="true">.</span>
        <span className="loading-screen__dot" aria-hidden="true">.</span>
      </Typography>

      <div className="loading-screen__track" aria-hidden="true">
        <div className="loading-screen__bar" />
      </div>
    </div>
  );
}