import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#51fff1",
		},
		spotifyDarkGrey: {
			main: "#636d6d",
		},
		spotifyLightGrey: {
			main: "#6e7979",
		},
		background: {
			default: "#000428", // Fallback color
			paper: "linear-gradient(to right, #000428, #004e92)", // Gradient for other background uses
			footer: "linear-gradient(to left, #000428, #004e92)",
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
					cursor: "url(/cursor_128x128_hover.gif), pointer",
					"&:hover": {
						cursor: "url(/cursor_128x128_hover.gif), pointer",
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				"*": {
					cursor: "url(/cursor_128x128_default.png), auto",
				},
				body: {
					cursor: "url(/cursor_128x128_default.png), pointer !important",
				},
				a: {
					cursor: "url(/cursor_128x128_default.png), pointer !important",
				},
				"*::-webkit-scrollbar": {
					display: "none", // Hides the scrollbar
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: "white",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: "white",
					cursor: "url(/cursor_128x128_hover.gif), pointer",
					"&:hover": {
						cursor: "url(/cursor_128x128_hover.gif), pointer",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: "white",
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					cursor: "url(/cursor_128x128_hover.gif), pointer",
					"&:hover": {
						cursor: "url(/cursor_128x128_hover.gif), pointer",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"& fieldset": {
						borderColor: "white",
					},
					"&:hover fieldset": {
						borderColor: "white",
					},
					"&.Mui-focused fieldset": {
						borderColor: "white",
					},
				},
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					backgroundColor: "#6e7979",
					color: "white",
					"&.Mui-selected": {
						backgroundColor: "#51fff1",
						color: "#000428",
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
