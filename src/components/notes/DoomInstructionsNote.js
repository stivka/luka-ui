import { Box, Typography } from "@mui/material";

export default function DoomInstructionsNote() {
  return (
    <Box
      id="doom-instructions-sticky-note"
      sx={{
        position: "absolute",
        top: "77.9%",
        left: "81.1%",
        height: "14%",
        width: "15%",
        backgroundColor: "#e6db7c",
        color: "#555",
        py: 1,
        px: 2,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        borderRadius: 1,
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        transform: "rotate(-2deg)",
        cursor: "default !important",
      }}
    >
      <Typography
        variant="caption"
        align="center"
        sx={{ cursor: "default !important" }}
      >
        esc/m - menu<br/>
        ctrl/x - fire<br/>
        space - action<br/>
        arrow keys - move<br/>
        alt/opt - strafe
      </Typography>
    </Box>
  )
}