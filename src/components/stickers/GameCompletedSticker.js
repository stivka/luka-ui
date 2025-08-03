import { Box, Tooltip } from "@mui/material";

export default function GameCompletedSticker() {
  return (
    <Tooltip title="Game completed" placement="top">
      <Box
        id="cyberdemon-sticker"
        sx={{
          position: "absolute",
          top: "69%",
          left: "31%",
          height: "15%",
          width: "12%",
          cursor: "unset",
          backgroundImage: "url(images/doom/gamefinished.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Tooltip>
  )
}