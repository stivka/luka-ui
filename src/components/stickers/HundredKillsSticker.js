import { Box, Tooltip } from "@mui/material";

export default function HundredKillsSticker() {
  return (
    <Tooltip title="Hundred demons slain" placement="top">
      <Box
        id="doomguy-rip-and-tear-sticker"
        sx={{
          position: "absolute",
          top: "-2%",
          left: "0%",
          height: "14%",
          width: "15%",
          cursor: "unset",
          backgroundImage: "url(images/doom/100kills.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Tooltip>
  )
}