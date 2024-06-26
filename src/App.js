import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {ThemeProvider, CssBaseline} from '@mui/material';
import Login from './components/Login';
import MainApp from './components/MainApp';
import theme from './theme'; // Ensure you have a theme file

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/app" element={<MainApp/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
