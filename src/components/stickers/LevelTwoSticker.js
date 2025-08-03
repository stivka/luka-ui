import { Box, Tooltip } from "@mui/material";

export default function LevelTwoSticker() {
  return (
    <Tooltip title="Level 2 unlocked" placement="top">
      <Box
        id="doomguy-shotgun-sticker"
        sx={{
          position: "absolute",
          top: "67%",
          left: "1.5%",
          height: "15%",
          width: "12%",
          cursor: "unset",
          backgroundImage: "url(images/doom/lvl2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Tooltip>
  )
}