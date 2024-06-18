import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, Card, CardContent } from '@mui/material';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setEntries(data))
            .catch(error => console.error('Failed to fetch entries:', error));
    }, [apiUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            const newEntry = { name, message };  // Construct the new entry object

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry)  // Use JSON.stringify to send newEntry as the request body
            })
                .then(response => response.json())
                .then(data => {
                    setEntries(prevEntries => [data, ...prevEntries]);  // Assume the backend returns the saved entry
                    setName('');
                    setMessage('');
                })
                .catch(error => {
                    console.error('Failed to save the new entry:', error);
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>Guestbook</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
            </Box>
            {entries.length > 0 ? (
                entries.map((entry) => (
                    <Card key={entry.id} sx={{ mb: 2 }}> {/* Assuming each entry has a unique 'id' */}
                        <CardContent>
                            <Typography variant="h6">{entry.name}</Typography>
                            <Typography variant="body1">{entry.message}</Typography>
                            <Typography variant="body2" color="textSecondary">{new Date(entry.date).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography align="center">No entries yet. Be the first to sign the guestbook!</Typography>
            )}
        </Container>
    );
};

export default Guestbook;
