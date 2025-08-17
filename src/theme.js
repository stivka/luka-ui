import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#bfff00",
		},
		spotifyDarkGrey: {
			main: "#000000",
		},
		spotifyLightGrey: {
			main: "#000000",
		},
		background: {
			default: "#ff0f7b",
			minesweeper: "#C0C0C0",
      minesweeperDark: "#808080",
		},
	},
	typography: {
		fontFamily: '"Roboto Mono", "Courier New", monospace',
		fontSize: 16,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					cursor: "url(/images/cursor_64x64.png), pointer",
					"&:hover": {
						cursor: "url(/images/cursor_64x64.png), pointer",
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				"*": {
					cursor: "url(/images/cursor_64x64.png), auto",
				},
				body: {
					cursor: "url(/images/cursor_64x64.png), pointer !important",
					background: "#4a1fcc",
				},
				a: {
					cursor: "url(/images/cursor_64x64.png), pointer !important",
				},
				"*::-webkit-scrollbar": {
					display: "none", // Hides the scrollbar
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: "lime",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: "lime",
					cursor: "url(/images/cursor_64x64.png), pointer",
					"&:hover": {
						cursor: "url(/images/cursor_64x64.png), pointer",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: "lime",
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					cursor: "url(/images/cursor_64x64.png), pointer",
					"&:hover": {
						cursor: "url(/images/cursor_64x64.png), pointer",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"& fieldset": {
						borderColor: "lime",
					},
					"&:hover fieldset": {
						borderColor: "lime",
					},
					"&.Mui-focused fieldset": {
						borderColor: "lime",
					},
				},
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					backgroundColor: "#6e7979",
					color: "lime",
					"&.Mui-selected": {
						backgroundColor: "lime",
						color: "black",
					},
					"&:hover": {
						backgroundColor: "#636d6d",
					},
				},
			},
		},
	},
});

export default theme;
