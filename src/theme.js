import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#e5df00',
        },
        background: {
            default: '#33CAFF'
        },
    },
    typography: {
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        fontSize: 16,
    }
});

export default theme;
