import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import useDrag from "../hooks/useDrag";

const Application = ({ title, Icon, children, onFocus, onFullScreen, sx }) => {
	const containerRef = useRef(null);
	const { position, startDragging } = useDrag(containerRef);
	const [isRunning, setIsRunning] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleOpen = () => {
		onFocus();
		setIsRunning(true);
	};

	return (
		<>
			<Icon
				onClick={handleOpen}
				style={{
					marginTop: 4,
					marginLeft: 8,
					height: 48,
					width: 48,
					cursor: "pointer",
				}}
			/>
			{isRunning && (
				<Box
					onContextMenu={(event) => event.preventDefault()}
					sx={{
						height: "100%",
						width: "100%",
						position: "absolute",
						cursor: "pointer",
						pointerEvents: "none",
						zIndex: sx.zIndex || 9,
					}}
				>
					<Box
						id={`${title}-application-container`}
						ref={containerRef}
						onContextMenu={(event) => event.preventDefault()}
						sx={{
							height: "100%",
							width: "100%",
							position: "relative",
							display: "flex",
							cursor: "pointer",
							pointerEvents: "none",
						}}
					>
						<Box
							id={`${title}-application`}
							onClick={onFocus}
							onFocus={onFocus}
							sx={{
								position: "absolute",
								top: isFullScreen ? 0 : "auto",
								left: isFullScreen ? 0 : "auto",
								border: "2px solid #C0C0C0",
								boxShadow: "2px 2px #888888",
								backgroundColor: "#C0C0C0",
								pointerEvents: "auto",
								cursor: "pointer",
								resize: "both",
								fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
								transform: isFullScreen
									? "none"
									: `translate(${position.x}px, ${position.y}px)`,
								...sx,
								width: isFullScreen ? "100%" : sx.width ?? 400,
								height: isFullScreen ? "100%" : sx.height ?? 300,
							}}
						>
							<Box
								id={`${title}-application-header`}
								onPointerDown={startDragging}
								onClick={onFocus}
								sx={{
									px: 0.5,
									display: "flex",
									gap: 0.5,
									alignItems: "center",
									background:
										"linear-gradient(to right, rgb(0, 0, 128) 0%, rgb(16, 132, 208) 100%)",
									color: "#fff",
									cursor: "move",
									borderBottom: "2px solid #000",
								}}
							>
								<Box sx={{ fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
									{title}
								</Box>
								<Box sx={{ flex: 1, cursor: "pointer" }} />
								<Box
									id={`${title}-application-maximize-button`}
									onClick={() =>
										onFullScreen
											? onFullScreen()
											: setIsFullScreen(!isFullScreen)
									}
									sx={{
										pt: "2px",
										pl: "1px",
										width: 14,
										height: 14,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										cursor: "pointer",
										color: "#000000",
										backgroundColor: "#C0C0C0",
										boxShadow: "1px 1px #000000, inset 1px 1px  #FFFFFF",
									}}
								>
									<Box
										sx={{
											py: 0.5,
											height: 10,
											width: 12,
											backgroundImage: 'url("/images/control-buttons.png")',
											backgroundPosition: isFullScreen
												? "calc(-2* 13px - 1px) 0"
												: "calc(-1* 13px - 1px) 0",
											backgroundRepeat: "no-repeat",
											backgroundSize: "cover",
											imageRendering: "pixelated",
											pointerEvents: "none",
										}}
									/>
								</Box>
								<Box
									id={`${title}-application-close-button`}
									onClick={() => setIsRunning(false)}
									sx={{
										width: 14,
										height: 14,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										cursor: "pointer",
										color: "#000000",
										backgroundColor: "#C0C0C0",
										boxShadow: "1px 1px #000000, inset 1px 1px  #FFFFFF",
									}}
								>
									<Box
										sx={{
											height: 10,
											width: 12,
											backgroundImage: 'url("/images/control-buttons.png")',
											backgroundPosition: "calc(-3* 13px - 1px) 0",
											backgroundRepeat: "no-repeat",
											backgroundSize: "cover",
											imageRendering: "pixelated",
											pointerEvents: "none",
										}}
									/>
								</Box>
							</Box>
							<Box
								id={`${title}-application-content`}
								onClick={onFocus}
								sx={{ height: "100%", width: "100%", cursor: "pointer" }}
							>
								{children}
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Application;
